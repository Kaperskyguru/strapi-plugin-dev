import React from "react";
import { CarretDown } from "@strapi/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Button,
  IconButton,
  BaseCheckbox,
  Typography,
  Box,
} from "@strapi/design-system";

const LinkTable = ({
  headers,
  contents,
  btnText,
}: {
  headers: Array<any>;
  contents: Array<any>;
  btnText?: String;
}) => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;

  function getHeader(header: any) {
    return Object.keys(header).map((item, i) => (
      <Th key={i}>{header[item]}</Th>
    ));
  }
  const generateHeaders = (headers: Array<any>) => {
    return headers.map((header) => {
      return getHeader(header);
    });
  };

  const generateData = (content: any, headers?: any) => {
    return headers.map((header: any) => {
      return Object.keys(header).map((item, i) => (
        <Td key={i}>{content[item]}</Td>
      ));
    });
  };

  const generateContents = (contents: Array<any>, headers: Array<any>) => {
    return contents.map((content, i) => {
      i++;
      return (
        <Tr key={i}>
          <Td>
            <BaseCheckbox aria-label={`Select ${content.id}`} />
          </Td>
          <Td>
            <Typography textColor="neutral800">{content.id}</Typography>
          </Td>

          {generateData(content, headers)}
        </Tr>
      );
    });
  };

  return (
    <div>
      <Table rowCount={ROW_COUNT} colCount={COL_COUNT} aria-label="table">
        <Thead>
          <Tr>
            <Th>
              <BaseCheckbox aria-label="Select all entries" />
            </Th>
            <Th
              action={
                <IconButton label="Sort on ID" icon={<CarretDown />} noBorder />
              }
            >
              <Typography variant="sigma">ID</Typography>
            </Th>
            {generateHeaders(headers)}
          </Tr>
        </Thead>

        <Tbody>{generateContents(contents, headers)}</Tbody>
      </Table>

      {btnText ? (
        <Box paddingTop={5}>
          <Button>{btnText}</Button>
        </Box>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default LinkTable;
