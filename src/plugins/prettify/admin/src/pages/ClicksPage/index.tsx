/*
 *
 * ClicksPage
 *
 */

import React from "react";
import { Plus } from "@strapi/icons";
import pluginId from "../../pluginId";
import {
  LinkButton,
  Layout,
  ContentLayout,
  Tag,
  ActionLayout,
  Box,
  HeaderLayout,
} from "@strapi/design-system";
import Nav from "../../components/Nav";
import ClicksTable from "../../components/Table";
import { NavLink } from "react-router-dom";

const ClicksPage = () => {
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
    <Box>
      <HeaderLayout title="Clicks" as="h2" />

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
          btnText="Download CSV (All Links)"
          headers={[
            { ip: "IP" },
            { createdAt: "Timestamp" },
            { url: "URI" },
            { referrer: "Referrer" },
            { link: "Link" },
          ]}
          contents={[
            {
              ip: "https://avatars.githubusercontent.com/u/3874873?v=4",
              createdAt:
                "Grow your technical writing career from one place. | Contentre",
              url: "French cuisine",
              referrer: "Leon Lafrite",
              link: "-",
            },
            {
              ip: "https://avatars.githubusercontent.com/u/3874873?v=4",
              createdAt:
                "Grow your technical writing career from one place. | Contentre",
              url: "French cuisine",
              referrer: "Leon Lafrite",
              link: "-",
            },
            {
              ip: "https://avatars.githubusercontent.com/u/3874873?v=4",
              createdAt:
                "Grow your technical writing career from one place. | Contentre",
              url: "French cuisine",
              referrer: "Leon Lafrite",
              link: "-",
            },
            {
              ip: "https://avatars.githubusercontent.com/u/3874873?v=4",
              createdAt:
                "Grow your technical writing career from one place. | Contentre",
              url: "French cuisine",
              referrer: "Leon Lafrite",
              link: "-",
            },
            {
              ip: "https://avatars.githubusercontent.com/u/3874873?v=4",
              createdAt:
                "Grow your technical writing career from one place. | Contentre",
              url: "French cuisine",
              referrer: "Leon Lafrite",
              link: "-",
            },
            {
              ip: "https://avatars.githubusercontent.com/u/3874873?v=4",
              createdAt:
                "Grow your technical writing career from one place. | Contentre",
              url: "French cuisine",
              referrer: "Leon Lafrite",
              link: "-",
            },
          ]}
        />
      </ContentLayout>
    </Box>
  );
};

export default ClicksPage;
