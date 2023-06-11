/*
 *
 * UpgradePage
 *
 */

import React from "react";

import {
  ContentLayout,
  TextInput,
  Box,
  Button,
  LinkButton,
  Typography,
  HeaderLayout,
} from "@strapi/design-system";

const UpgradePage = () => {
  return (
    <Box>
      <HeaderLayout title="Activate Linkr Pro" as="Typography" />

      <ContentLayout>
        <Box
          paddingLeft="8"
          paddingRight="8"
          paddingBottom="8"
          shadow="filterShadow"
          background="neutral0"
        >
          <Box paddingTop="4" paddingBottom="4">
            <Typography variant="beta">Linkr Pro License</Typography>
          </Box>

          <Box paddingTop="4" paddingBottom="4">
            <Typography className="text-white py-5 text-xl">
              You must have a License Key to enable automatic updates for Linkr
              Pro. If you don't have a License please go to linkr.com to get
              one. If you do have a license you can login at linkr.com/login to
              manage your licenses and site activations.
            </Typography>
          </Box>
          <Box paddingTop="5" paddingBottom="8">
            <TextInput
              placeholder=""
              label="Title"
              name="content"
              onChange={() => {}}
              required
            />
          </Box>
          <Button> Activate license on [Site name]</Button>
        </Box>

        <Box
          paddingLeft="8"
          marginTop="8"
          paddingRight="8"
          paddingBottom="8"
          shadow="filterShadow"
          background="neutral0"
        >
          <Box paddingTop="4" paddingBottom="4">
            <Typography variant="beta">Upgrade to Pro</Typography>
          </Box>

          <Box paddingTop="4" paddingBottom="4">
            <Typography variant="omega">
              It looks like you haven't upgraded to Pretty Links Pro yet. Here
              are just a few things you could be doing with pro:
            </Typography>
          </Box>

          <Box padding="5">
            <Typography variant="omega">
              <ul className="list-disc">
                <li className="py-1">
                  Auto-replace keywords throughout your site with Pretty Links
                </li>
                <li className="py-1">
                  Protect your affiliate links by using Cloaked Redirects
                </li>
                <li className="py-1">Redirect based on a visitor's location</li>
                <li className="py-1">Auto-prettylink your Pages & Posts</li>
                <li className="py-1">
                  Find out what works and what doesn't by split testing your
                  links
                </li>
                <li className="py-1">And much, much more!</li>
              </ul>
            </Typography>
          </Box>

          <Box paddingTop="4" paddingBottom="4">
            <Typography variant="omega">
              Plus, upgrading is fast, easy and won't disrupt any of your
              existing links or data. And there's even a 14 day money back
              guarantee.
            </Typography>
          </Box>

          <Box paddingTop="4" paddingBottom="4">
            <Typography variant="omega">We think you'll love it!</Typography>
          </Box>
          <LinkButton href="#"> Upgrate to Pro today!</LinkButton>
        </Box>
      </ContentLayout>
    </Box>
  );
};

export default UpgradePage;
