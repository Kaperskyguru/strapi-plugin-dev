import React, { useEffect, useState } from "react";
import pluginId from "../../pluginId";
import { useIntl } from "react-intl";
import AddForm from "../../components/AddForm";
import { ContentLayout, Box, Link, HeaderLayout } from "@strapi/design-system";
import { request, useNotification } from "@strapi/helper-plugin";
import { ArrowLeft } from "@strapi/icons";
import getTrad from "../../utils/getTrad";
import { useHistory, useParams } from "react-router-dom";
import { ILink, IRedirectFormValues, ParamTypes } from "../../types/link";

const AddPage = () => {
  const [resetCount, setResetCount] = useState(0);
  const { id: selectedLinkId } = useParams<ParamTypes>();
  const [link, setLink] = useState<ILink | undefined>(undefined);
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const history = useHistory();

  const isNewLink = window.location.href.endsWith("add");

  useEffect(() => {
    if (selectedLinkId) {
      getLink();
    } else setLink(undefined);
  }, [selectedLinkId]);

  const handleSubmit = async (
    values?: IRedirectFormValues,
    submitMore?: boolean
  ) => {
    try {
      if (!values?.target) {
        throw new Error("No values");
      }

      if (isNewLink) {
        const link = await createLink(values);

        console.log(link);

        if (link?.id) {
          if (submitMore) {
            setResetCount(resetCount + 1);
          } else {
            history.push(`/plugins/${pluginId}/${link.id}`);
          }
        }
      } else {
        await updateLink(values);

        if (submitMore && link) {
          history.push(`/plugins/${pluginId}/add`);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getLink = async () => {
    try {
      const result = await request(`/${pluginId}/${selectedLinkId}`);

      if (!result?.id) {
        throw new Error("No redirect found");
      }

      setLink(result);
    } catch (error) {
      setLink(undefined);
    }
  };

  const updateLink = async (link: IRedirectFormValues) => {
    try {
      await request(`/${pluginId}/${selectedLinkId}`, {
        method: "PUT",
        body: {
          id: selectedLinkId,
          data: link,
        },
      });
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: getTrad("detail.form.save.notify.success.message"),
        }),
      });
    } catch (error) {
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
        title={isNewLink ? "Add New Link" : "Update Link"}
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
  return payload?.details.type ?? payload?.message ?? "general";
};
