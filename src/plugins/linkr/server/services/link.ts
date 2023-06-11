import { Strapi } from "@strapi/strapi";
import utils from "@strapi/utils";
const { ApplicationError } = utils.errors;

enum Redirection {
  temporary_redirect_307,
  found_302,
  moved_permanently_301,
}

interface ILink {
  link: string;
  title: string;
  target: string;
  isNoFollow?: Boolean;
  shouldEnableTracking?: Boolean;
  paramentForwarding?: Boolean;
  isSponsored?: Boolean;
  notes?: string;
  redirection?: Redirection;
}

export default ({ strapi }: { strapi: Strapi }) => ({
  async all() {
    const results =
      (await strapi.query("plugin::linkr.linkr-link").findMany()) || [];
    return results;
  },

  async create(data: ILink) {
    // Get default link or from DB and attach to code
    data.link = await getPrettyLink(data.link);

    const validity = await checkValidity(data);
    if (!validity.ok) {
      throw new ApplicationError(validity.errorMessage, validity.details);
    }
    const results = await strapi
      .query("plugin::linkr.linkr-link")
      .create({ data });

    return results;
  },

  async find() {},
  async update() {},
  async delete() {},

  getWelcomeMessage() {
    return { message: "Welcome to Strapi 🚀" };
  },
});

const checkValidity = async (
  { link, target }: ILink,
  id?: number
): Promise<{
  ok: boolean;
  errorMessage?: string;
  details?: Record<string, any>;
}> => {
  const duplicateFrom = await findDuplicateURLCode(link, id); //replace link with code

  // Complete the URL with Code (Get new URL from settings)
  const loopingUrl = await checkNewUrlIsLooping(link, target, id);
  const ok = [duplicateFrom, loopingUrl].filter(Boolean).length === 0;
  const errors = getErrors(duplicateFrom, loopingUrl);

  return {
    ok,
    errorMessage: errors?.message,
    details: errors?.details,
  };
};

const getPrettyLink = async (code: string) => {
  const setting = await strapi.query("plugin::linkr.linkr-setting").findOne({
    where: { key: "frontendURL" },
  });

  if (!setting || !setting.value) return `http://localhost:8000/${code}`; // Return default

  const urlWithoutParams = setting.value.split("?")[0]; // Remove params

  const hasSlashe = urlWithoutParams.endsWith("/"); // Check for / at the end

  if (!hasSlashe) return `${urlWithoutParams}/${code}`; // No /, fine return

  const realURL = urlWithoutParams.substring(0, urlWithoutParams.length - 1); // Remove /

  return `${realURL}/${code}`;
};

const findDuplicateURLCode = async (
  code: string,
  id?: number
): Promise<boolean> => {
  try {
    const results: ILink[] =
      (await strapi.entityService.findMany("plugin::linkr.linkr-link", {
        filters: {
          link: code,
          // ...omitByFalsy(id, { $not: { id } }),
        },
      })) || [];

    return results.length > 0;
  } catch (e) {
    return false;
  }
};

const checkNewUrlIsLooping = async (
  originalFromUrl: string,
  toUrl: string,
  id?: number
): Promise<boolean> => {
  const results = await findPrettyLinkUrls(toUrl, id);

  if (results.length === 0) {
    return false;
  }

  if (results.length > 1) {
    return true;
  }

  if (results?.[0].target === originalFromUrl) {
    return true;
  }

  return checkNewUrlIsLooping(originalFromUrl, results?.[0].target, id);
};

const findPrettyLinkUrls = async (
  link: string,
  id?: number
): Promise<ILink[]> => {
  try {
    const results: ILink[] =
      (await strapi.entityService.findMany("plugin::linkr.linkr-link", {
        filters: {
          link,
          // ...omitByFalsy(id, { $not: { id } })
        },
      })) || [];

    return results;
  } catch (e) {
    return [];
  }
};

const getErrors = (
  duplicateError?: boolean,
  loopingUrl?: boolean
): { message?: string; details?: { type: string } } | undefined => {
  if (duplicateError) {
    return {
      message:
        "Duplicate redirect. Redirect with the same 'From' field already exists.",
      details: { type: "DUPLICATE" },
    };
  }

  if (loopingUrl) {
    return {
      message:
        "Redirect will cause a loop. The given 'To' field will eventually loop back to the 'From' field.",
      details: { type: "LOOP" },
    };
  }

  return undefined;
};
