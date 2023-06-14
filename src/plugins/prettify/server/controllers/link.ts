import { Strapi } from "@strapi/strapi";
import utils from "@strapi/utils";
const { ApplicationError } = utils.errors;

export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    ctx.body = await strapi.plugin("prettify").service("link").all();
  },

  async find(ctx) {
    let params = ctx?.params ?? {};
    const link = await strapi.plugin("prettify").service("link").find(params);

    if (!link) throw new ApplicationError("link_not_found");

    ctx.body = link;
  },

  async create(ctx) {
    let link = ctx?.request?.body?.data ?? {};

    if (!link.target) throw new ApplicationError("target_not_found");
    if (!link.title) throw new ApplicationError("title_not_found");

    ctx.body = await strapi.plugin("prettify").service("link").create(link);
  },
});
