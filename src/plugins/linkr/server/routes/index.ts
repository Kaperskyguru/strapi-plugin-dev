import adminApi from "./admin";
export default [
  {
    method: "GET",
    path: "/",
    handler: "link.index",
    config: {
      policies: [],
    },
  },

  {
    method: "POST",
    path: "/",
    handler: "link.create",
    config: {
      policies: [],
    },
  },
];
// export default {
//   // 'content-api': contentApi,
//   admin: adminApi,
// };
