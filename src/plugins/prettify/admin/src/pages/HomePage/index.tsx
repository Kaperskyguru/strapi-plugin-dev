/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState } from "react";
import { Plus } from "@strapi/icons";
import pluginId from "../../pluginId";
import {
  LinkButton,
  ContentLayout,
  Tag,
  ActionLayout,
  Box,
  HeaderLayout,
} from "@strapi/design-system";
import LinkTable from "../../components/Table";
import { NavLink } from "react-router-dom";
import { request } from "@strapi/helper-plugin";
import { ILink, ILinkResult } from "../../types/link";

const HomePage = () => {
  let [links, setLinks] = useState<ILink[]>([]);

  const getLinks = async (newPage?: number) => {
    const results = await request(`/${pluginId}`);

    setLinks(
      results.map((result: ILinkResult) => ({
        ...result,
      }))
    );
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <Box>
      <HeaderLayout
        primaryAction={
          <LinkButton
            as={NavLink}
            to={`/plugins/${pluginId}/add`}
            startIcon={<Plus />}
          >
            Add New
          </LinkButton>
        }
        title="Overview"
        as="h2"
      />

      <ActionLayout
        startActions={
          <>
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <Box paddingTop={2} key={index}>
                  <Tag key={index} icon={<Plus aria-hidden />}>
                    Filter
                  </Tag>
                </Box>
              ))}
          </>
        }
      />

      <ContentLayout>
        <LinkTable
          headers={[
            { title: "Link Title" },
            { clicks: "Clicks" },
            { createdAt: "Date" },
            { link: "Linkr" },
          ]}
          contents={links}
        />
      </ContentLayout>
    </Box>
  );
};

export default memo(HomePage);
