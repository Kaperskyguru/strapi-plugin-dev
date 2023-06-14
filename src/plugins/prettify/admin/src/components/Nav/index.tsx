import React from "react";
import pluginId from "../../pluginId";
import {
  SubNav,
  SubNavHeader,
  SubNavSections,
  SubNavSection,
  SubNavLink,
} from "@strapi/design-system";
const Nav = () => {
  return (
    <SubNav ariaLabel="Side nav">
      <SubNavHeader label="Linkr" />
      <SubNavSections>
        <SubNavSection label="Overview">
          <SubNavLink to={`/plugins/${pluginId}`}>Dashboard</SubNavLink>
          <SubNavLink to={`/plugins/${pluginId}/add`}>Add New</SubNavLink>
        </SubNavSection>

        <SubNavSection label="Analytics">
          <SubNavLink to={`/plugins/${pluginId}/clicks`}>Clicks</SubNavLink>
          <SubNavLink to={`/plugins/${pluginId}/reports`}>Reports</SubNavLink>
        </SubNavSection>

        <SubNavSection label="Groupings">
          <SubNavLink to={`/plugins/${pluginId}/tags`}>Tags</SubNavLink>
          <SubNavLink to={`/plugins/${pluginId}/categories`}>
            Categories
          </SubNavLink>
        </SubNavSection>

        <SubNavSection label="Settings">
          <SubNavLink to={`/plugins/${pluginId}/options`}>Options</SubNavLink>
          <SubNavLink to={`/plugins/${pluginId}/tools`}>Tools</SubNavLink>
          <SubNavLink to={`/plugins/${pluginId}/upgrade`}>Upgrade</SubNavLink>
          <SubNavLink to={`/plugins/${pluginId}/import`}>
            Import / Export
          </SubNavLink>
        </SubNavSection>
      </SubNavSections>
    </SubNav>
  );
};

export default Nav;
