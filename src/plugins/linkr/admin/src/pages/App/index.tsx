/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { AnErrorOccurred } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import HomePage from "../HomePage";
import AddPage from "../AddPage";
import ClicksPage from "../ClicksPage";
import TagPage from "../TagPage";
import CategoriesPage from "../CategoriesPage";
import UpgradePage from "../UpgradePage";
import ImportExportPage from "../ImportExportPage";
import OptionsPage from "../OptionsPage";
import ToolsPage from "../ToolsPage";
import ReportsPage from "../ReportsPage";

import { Layout, Box } from "@strapi/design-system";
import Nav from "../../components/Nav";

const App = () => {
  return (
    <div>
      <Box>
        <Layout sideNav={<Nav />}>
          <Switch>
            <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
            <Route path={`/plugins/${pluginId}/add`} component={AddPage} />
            <Route
              path={`/plugins/${pluginId}/clicks`}
              component={ClicksPage}
            />
            <Route path={`/plugins/${pluginId}/tags`} component={TagPage} />
            <Route
              path={`/plugins/${pluginId}/categories`}
              component={CategoriesPage}
            />
            <Route
              path={`/plugins/${pluginId}/reports`}
              component={ReportsPage}
            />

            <Route
              path={`/plugins/${pluginId}/options`}
              component={OptionsPage}
            />
            <Route path={`/plugins/${pluginId}/tools`} component={ToolsPage} />
            <Route
              path={`/plugins/${pluginId}/upgrade`}
              component={UpgradePage}
            />
            <Route
              path={`/plugins/${pluginId}/import`}
              component={ImportExportPage}
            />
            <Route component={AnErrorOccurred} />
          </Switch>
        </Layout>
      </Box>
    </div>
  );
};

export default App;
