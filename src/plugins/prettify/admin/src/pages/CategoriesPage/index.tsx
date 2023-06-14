/*
 *
 * ClickPage
 *
 */

import React from "react";
import { Plus } from "@strapi/icons";
import {
  ContentLayout,
  Tag,
  ActionLayout,
  Box,
  HeaderLayout,
} from "@strapi/design-system";
import ClicksTable from "../../components/Table";

const CategoriesPage = () => {
  const entry = {
    cover: "https://avatars.githubusercontent.com/u/3874873?v=4",
    title: "Grow your technical writing career from one place. | Contentre",
    category: "French cuisine",
    contact: "Leon Lafrite",
  };
  const entries = [];
  for (let i = 0; i < 5; i++) {
    entries.push({
      ...entry,
      id: i,
    });
  }

  return (
    <>
      <HeaderLayout title="Categories" as="h2" />

      <ActionLayout
        startActions={
          <>
            <Box paddingTop={2}>
              <Tag icon={<Plus aria-hidden />}>Filter</Tag>
            </Box>
          </>
        }
      />

      <ContentLayout>
        <ClicksTable
          btnText="Download CSV (All Categories)"
          headers={["IP", "Timestamp", "URI", "Referrer", "Link"]}
          contents={[
            {
              ip: "https://avatars.githubusercontent.com/u/3874873?v=4",
              timestamp:
                "Grow your technical writing career from one place. | Contentre",
              url: "French cuisine",
              referrer: "Leon Lafrite",
              link: "-",
            },
            {
              ip: "https://avatars.githubusercontent.com/u/3874873?v=4",
              timestamp:
                "Grow your technical writing career from one place. | Contentre",
              url: "French cuisine",
              referrer: "Leon Lafrite",
              link: "-",
            },
            {
              ip: "https://avatars.githubusercontent.com/u/3874873?v=4",
              timestamp:
                "Grow your technical writing career from one place. | Contentre",
              url: "French cuisine",
              referrer: "Leon Lafrite",
              link: "-",
            },
            {
              ip: "https://avatars.githubusercontent.com/u/3874873?v=4",
              timestamp:
                "Grow your technical writing career from one place. | Contentre",
              url: "French cuisine",
              referrer: "Leon Lafrite",
              link: "-",
            },
            {
              ip: "https://avatars.githubusercontent.com/u/3874873?v=4",
              timestamp:
                "Grow your technical writing career from one place. | Contentre",
              url: "French cuisine",
              referrer: "Leon Lafrite",
              link: "-",
            },
            {
              ip: "https://avatars.githubusercontent.com/u/3874873?v=4",
              timestamp:
                "Grow your technical writing career from one place. | Contentre",
              url: "French cuisine",
              referrer: "Leon Lafrite",
              link: "-",
            },
          ]}
        />
      </ContentLayout>
    </>
  );
};

export default CategoriesPage;
