/*
 *
 * ReportsPage
 *
 */

import React from "react";

import {
  Layout,
  ContentLayout,
  Box,
  HeaderLayout,
} from "@strapi/design-system";
import Nav from "../../components/Nav";

const ReportsPage = () => {
  return (
    <Box>
      <HeaderLayout title="Reports" as="h2" />

      <ContentLayout></ContentLayout>
    </Box>
  );
};

export default ReportsPage;
