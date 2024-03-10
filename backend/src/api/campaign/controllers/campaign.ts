
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::campaign.campaign", ({ strapi }) => ({
  async findOne(ctx) {
    const { campaignURL } = ctx.params;

    const query = {
      filters: { campaignURL },
      ...ctx.query, 
    };

    const campaign = await strapi.entityService.findMany("api::campaign.campaign", query);

    const sanitizedEntity = await this.sanitizeOutput(campaign);

    return this.transformResponse(sanitizedEntity[0]);
  },
}));