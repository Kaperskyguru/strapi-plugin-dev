/*
 *
 * ImportExportPage
 *
 */

import React from "react";

import {
  ContentLayout,
  Box,
  Button,
  Flex,
  Divider,
  Typography,
  TextInput,
  HeaderLayout,
} from "@strapi/design-system";

const ImportExportPage = () => {
  return (
    <Box>
      <HeaderLayout title="Import / Export" as="h2" />

      <ContentLayout>
        <Box padding="8" shadow="filterShadow" background="neutral0">
          <Flex gap={5}>
            <Typography className="text-white">Export Linkr Links:</Typography>
            <Button>Export</Button>
          </Flex>

          <Box paddingTop={8} paddingBottom={8}>
            <Divider />
          </Box>

          <Flex gap={5}>
            <Typography className="text-white">Import Linkr Links:</Typography>
            <TextInput type="file" aria-label="file"></TextInput>
            <Button> Import</Button>
          </Flex>
        </Box>
      </ContentLayout>
    </Box>
  );
};

export default ImportExportPage;
