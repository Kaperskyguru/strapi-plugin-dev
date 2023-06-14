import links from "./prettify/links.json";
import tags from "./prettify/tags.json";
import categories from "./prettify/categories.json";
import settings from "./prettify/settings.json";
import clicks from "./prettify/clicks.json";

export default {
  "prettify-click": {
    schema: clicks,
  },
  "prettify-link": {
    schema: links,
  },
  "prettify-tag": {
    schema: tags,
  },
  "prettify-category": {
    schema: categories,
  },
  "prettify-setting": {
    schema: settings,
  },
};
