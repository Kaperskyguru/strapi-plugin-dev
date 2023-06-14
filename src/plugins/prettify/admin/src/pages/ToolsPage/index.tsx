/*
 *
 * ToolsPage
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

const ToolsPage = () => {
  return (
    <Box>
      <HeaderLayout title="Tools" as="h2" />

      <ContentLayout></ContentLayout>
    </Box>
  );
};

export default ToolsPage;
