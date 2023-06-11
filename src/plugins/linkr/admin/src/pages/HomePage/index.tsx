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

enum Redirection {
  temporary_redirect_307,
  found_302,
  moved_permanently_301,
}

export interface ILink {
  link: string;
  title: string;
  target: string;
  isNoFollow?: Boolean;
  shouldEnableTracking?: Boolean;
  paramentForwarding?: Boolean;
  isSponsored?: Boolean;
  notes?: string;
  redirection?: Redirection;
  createdAt: string;
  updatedAt: string;
}

interface ILinkResult {
  id: number;
  attributes: ILink;
}

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
