import { Strapi } from "@strapi/strapi";
import utils from "@strapi/utils";
const { ApplicationError } = utils.errors;

export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    ctx.body = await strapi.plugin("linkr").service("link").all();
  },

  async create(ctx) {
    let link = ctx?.request?.body?.data ?? {};

    if (!link.target) throw new ApplicationError("target_not_found");
    if (!link.title) throw new ApplicationError("title_not_found");

    ctx.body = await strapi.plugin("linkr").service("link").create(link);
  },
});
