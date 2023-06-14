export default {
  type: "admin",
  routes: [
    // {
    //   method: "GET",
    //   path: "/content-types",
    //   handler: "content-type.find",
    //   config: { policies: [], auth: false },
    // },
    // {
    //   method: "POST",
    //   path: "/content-types/search",
    //   handler: "content-type.search",
    // },
    {
      method: "GET",
      path: "/",
      handler: "link.find",
      config: { policies: [], auth: false },
    },
    {
      method: "POST",
      path: "/",
      handler: "link.create",
    },
    {
      method: "GET",
      path: "/:id",
      handler: "link.findOne",
    },
    {
      method: "PUT",
      path: "/:id",
      handler: "link.update",
    },
    {
      method: "DELETE",
      path: "/:id",
      handler: "link.delete",
    },
  ],
};
