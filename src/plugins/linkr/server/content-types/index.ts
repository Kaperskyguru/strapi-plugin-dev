import links from "./linkr/links.json";
import tags from "./linkr/tags.json";
import categories from "./linkr/categories.json";
import settings from "./linkr/settings.json";
import clicks from "./linkr/clicks.json";

export default {
  "linkr-click": {
    schema: clicks,
  },
  "linkr-link": {
    schema: links,
  },
  "linkr-tag": {
    schema: tags,
  },

  "linkr-category": {
    schema: categories,
  },

  "linkr-setting": {
    schema: settings,
  },
};
