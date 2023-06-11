import React, { useEffect, useState } from "react";
import { Pencil, Plus, Refresh } from "@strapi/icons";
import { nanoid } from "nanoid";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Field,
  Box,
  TextInput,
  Textarea,
  Checkbox,
  Select,
  Option,
  ActionLayout,
  Flex,
  Button,
  IconButton,
} from "@strapi/design-system";
import { ILink } from "../../pages/HomePage";
import { useIntl, IntlShape } from "react-intl";
import getTrad from "../../utils/getTrad";
import { redirectionTypeOptions } from "../../utils/redirection-type";

export interface IRedirectFormValues
  extends Omit<ILink, "id" | "createdAt" | "updatedAt"> {}

interface IProps {
  initialValues?: IRedirectFormValues;
  handleSubmit: (values?: IRedirectFormValues, submitMore?: boolean) => void;
  isNew: boolean;
  resetCount: number;
}

const Form = (props?: IProps) => {
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [submitMore, setSubmitMore] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      link: props?.initialValues?.link || "",
      target: props?.initialValues?.target || "",
      title: props?.initialValues?.title ?? "",
      isNoFollow: props?.initialValues?.isNoFollow ?? false,
      isSponsored: props?.initialValues?.isSponsored ?? false,
      shouldEnableTracking: props?.initialValues?.shouldEnableTracking ?? true,
      notes: props?.initialValues?.notes ?? "",
      paramenterForwarding: props?.initialValues?.paramentForwarding ?? false,
      redirection:
        props?.initialValues?.redirection || redirectionTypeOptions[0],
    },
    validationSchema: FormSchema(formatMessage),
    onSubmit: (e: any) => {
      props?.handleSubmit(e, submitMore);
      setSubmitMore(false);
    },
  });

  useEffect(() => {
    formik.setFieldValue("link", generateUniqueCode());
  }, []);

  const handleSelectChange = (e: any, fieldId: string) => {
    formik.handleChange(e);
    formik.setFieldValue(fieldId, e);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ActionLayout
          endActions={
            <>
              <Button variant="secondary" startIcon={<Refresh />} size="L">
                Reset
              </Button>
              <Button startIcon={<Plus />} size="L" type="submit">
                Save
              </Button>
            </>
          }
        />

        <Box padding="8" shadow="filterShadow" background="neutral0">
          <TextInput
            placeholder=""
            label="Title"
            name="title"
            required
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // label={formatMessage({ id: getTrad('detail.form.from.label') })}
            // error={formik.errors.from}
          />
          <Box paddingTop="8" paddingBottom="8">
            <TextInput
              paddingTop="8"
              placeholder=""
              name="target"
              type="url"
              value={formik.values.target}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Target URL"
              required
            />
          </Box>
          <Box background="neutral100" padding={8}>
            <Flex direction="" alignItems="center" gap={1}>
              <div className="w-full">
                <TextInput
                  paddingTop="8"
                  placeholder=""
                  name="link"
                  onInput={formik.handleChange}
                  label="Pretty Link"
                  value={formik.values.link}
                  onBlur={formik.handleBlur}
                  required
                />
              </div>
              <div className="pt-5">
                <IconButton
                  onClick={() => console.log("edit")}
                  aria-label="Edit"
                  icon={<Pencil />}
                />
              </div>
            </Flex>
          </Box>
          <Box paddingTop={8}>
            <Field name="Title" required={true}>
              <Flex direction="row" alignItems="center" gap={5}>
                <div className="w-full">
                  <Select
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleSelectChange(e, "redirection")
                    }
                    onBlur={formik.handleBlur}
                    //   error={formik.errors.type}
                    label="Redirection"
                    value={formik.values.redirection}
                    required
                    name="redirection"
                    id="redirection"
                    hint="Get cloaked redirects, Javascript redirects and more when you Upgrade to PRO"
                    placeholder=""
                  >
                    {redirectionTypeOptions.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="w-full">
                  <Flex direction="row" alignItems="flex-start" gap={5}>
                    <Checkbox
                      value={formik.values.isNoFollow}
                      name="isNoFollow"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      No Follow
                    </Checkbox>
                    <Checkbox
                      value={formik.values.isSponsored}
                      onChange={formik.handleChange}
                      name="isSponsored"
                      onBlur={formik.handleBlur}
                    >
                      Sponsored
                    </Checkbox>
                    <Checkbox
                      value={formik.values.paramenterForwarding}
                      onChange={formik.handleChange}
                      name="paramenterForwarding"
                      onBlur={formik.handleBlur}
                    >
                      Parameter Forwarding
                    </Checkbox>
                  </Flex>
                </div>
              </Flex>
            </Field>
          </Box>

          <Box paddingTop={8}>
            <Checkbox
              value={formik.values.shouldEnableTracking}
              name="shouldEnableTracking"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              Enable Tracking
            </Checkbox>
          </Box>

          <Box paddingTop={8}>
            <Textarea
              value={formik.values.notes}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleSelectChange(e.target.value, "notes")
              }
              onBlur={formik.handleBlur}
              label="Notes"
              name="notes"
              hint="This is a field where you can enter notes about a particular link. This notes field is mainly for your own link management needs. It isn't currently used anywhere on the front end."
            >
              {formik.values.notes}
            </Textarea>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default Form;

const FormSchema = (formatMessage: IntlShape["formatMessage"]) => {
  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(:|\.)[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&\/=]*)$/;
  const fm = (id: string, values?: Record<string, any>) =>
    formatMessage({ id: getTrad(id) }, values);

  return Yup.object().shape({
    link: Yup.string()
      //   .matches(urlRegex, "Must be a url") //fm("general.form.errors.url"))
      .required("This field is required"), //fm("general.form.errors.required")),
    target: Yup.string()
      .matches(urlRegex, "Must be a url") //fm("general.form.errors.url"))
      .required("This field is required"), //fm("general.form.errors.required")),
    redirection: Yup.string()
      .required("This field is required") //fm("general.form.errors.required"))
      .oneOf(redirectionTypeOptions as any, "Must be one of"), //fm("general.form.errors.oneOf")),
  });
};

function generateUniqueCode(): string {
  return nanoid(5);
}
