import React from "react";
import Paper from "@material-ui/core/Paper";

import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const Container = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding-bottom: 10px;
`;

const CouriersList = ({ couriers }) => {
  return (
    <TableContainer component={Container} style={{ width: "auto" }}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Courier Address</TableCell>
            <TableCell>Reputation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {couriers.map((courier) => (
            <TableRow key={courier.adr}>
              <TableCell scope="row">{courier.adr}</TableCell>
              <TableCell>{courier.reputation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CouriersList;
