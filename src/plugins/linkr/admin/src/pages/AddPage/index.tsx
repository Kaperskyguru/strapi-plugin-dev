import React, { useState } from "react";
import pluginId from "../../pluginId";
import { useIntl } from "react-intl";
import AddForm, { IRedirectFormValues } from "../../components/AddForm";
import { ContentLayout, Box, Link, HeaderLayout } from "@strapi/design-system";
import { request, useNotification } from "@strapi/helper-plugin";
import { ArrowLeft } from "@strapi/icons";
import { ILink } from "../HomePage";
import getTrad from "../../utils/getTrad";

const AddPage = () => {
  const [resetCount, setResetCount] = useState(0);
  const isNewLink = window.location.href.endsWith("new");
  const [link, setLink] = useState<ILink | undefined>(undefined);
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();

  const handleSubmit = async (
    values?: IRedirectFormValues,
    submitMore?: boolean
  ) => {
    try {
      if (!values?.target) {
        throw new Error("No values");
      }

      // if (isNewRedirect) {
      const redirect = await createLink(values);

      // 	if (redirect?.id) {
      // 		if (submitMore) {
      // 			setResetCount(resetCount + 1);
      // 		} else {
      // 			history.push(`/plugins/${pluginId}/${redirect.id}`);
      // 		}
      // 	}
      // } else {
      // 	await updateRedirect(values);

      // 	if (submitMore && redirect) {
      // 		history.push(`/plugins/${pluginId}/new`);
      // 	}
      // }
    } catch (e) {
      console.error(e);
    }
  };

  async function createLink(values: IRedirectFormValues) {
    try {
      const result = await request(
        `/${pluginId}`,
        {
          method: "POST",
          body: {
            data: values,
          },
        },
        true
      );

      toggleNotification({
        type: "success",
        message: formatMessage({
          id: getTrad("detail.form.save.notify.success.new.message"),
        }),
      });

      return result;
    } catch (error) {
      console.log(error);
      toggleNotification({
        type: "warning",
        message: formatMessage({
          id: getTrad(
            `detail.form.save.notify.error.${getSaveRedirectErrorMessage(
              error
            )}.message`
          ),
        }),
      });
    }
  }

  return (
    <Box>
      <HeaderLayout
        navigationAction={
          <Link startIcon={<ArrowLeft />} to="/">
            Back
          </Link>
        }
        title="Add New Link"
        as="h2"
      />

      <ContentLayout background="neutral0">
        <AddForm
          initialValues={link}
          handleSubmit={handleSubmit}
          isNew={isNewLink}
          resetCount={resetCount}
        />
      </ContentLayout>
    </Box>
  );
};

export default AddPage;

const getSaveRedirectErrorMessage = (error?: any): string | undefined => {
  const strError = JSON.stringify(error);
  if (!error || !strError) {
    return undefined;
  }

  const parsedError = JSON.parse(strError);

  const payload = parsedError?.response?.payload?.error;

  console.log(payload?.details.type ?? payload?.message ?? "general");

  return payload?.details.type ?? payload?.message ?? "general";
};
