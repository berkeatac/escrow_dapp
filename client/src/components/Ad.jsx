import React, { Fragment, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import styled from "styled-components";

const StyledCard = styled(Card)`
  width: 90%;
  text-align: left;
`;

const Ad = ({
  item,
  purchaseItem,
  account,
  verifyPurchase,
  cancelPurchase,
  couriers,
  setPurchaseFee,
}) => {
  const [fee, setFee] = useState(2);
  const isCourier = () => {
    for (let i = 0; i < couriers.length; i++) {
      if (couriers[i].adr === account) {
        return true;
      }
    }
    return false;
  };

  return (
    <StyledCard
      style={{
        backgroundColor: `${
          item.verified && item.buyer === account ? "#b6e48b" : "white"
        }`,
      }}
    >
      <CardContent>
        <TableContainer component={Card}>
          <Table size="medium" aria-label="a dense table">
            <TableBody>
              <TableRow key={item.name}>
                <TableCell scope="row">
                  <b>Title</b>
                </TableCell>
                <TableCell>{item.name}</TableCell>
              </TableRow>
              <TableRow key={item.description}>
                <TableCell scope="row">
                  <b>Description</b>
                </TableCell>
                <TableCell>{item.description}</TableCell>
              </TableRow>
              <TableRow key={item.seller}>
                <TableCell scope="row">
                  <b>Seller</b>
                </TableCell>
                <TableCell>{item.owner}</TableCell>
              </TableRow>
              <TableRow key={item.price}>
                <TableCell scope="row">
                  <b>Price</b>
                </TableCell>
                <TableCell>{`${item.price / 10 ** 18} ETH`}</TableCell>
              </TableRow>
              {item.transit && item.purchased && !item.verified ? (
                <TableRow key={item.courier}>
                  <TableCell scope="row">
                    <b>In Transit By</b>
                  </TableCell>
                  <TableCell>{item.courier}</TableCell>
                </TableRow>
              ) : null}
              {item.purchased && item.verified ? (
                <TableRow key={item.courier}>
                  <TableCell scope="row">
                    <b>Delivered By</b>
                  </TableCell>
                  <TableCell>{`${item.courier}`}</TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {!item.purchased && item.owner !== account && !isCourier() ? (
        <CardActions>
          <Button size="small" onClick={() => purchaseItem(item)}>
            Send Escrow
          </Button>
        </CardActions>
      ) : null}
      {item.purchased &&
      item.buyer === account &&
      !item.verified &&
      item.transit ? (
        <CardActions>
          <Button size="small" onClick={() => verifyPurchase(item)}>
            Verify Escrow
          </Button>
          <Button size="small" onClick={() => cancelPurchase(item)}>
            Cancel Escrow
          </Button>
        </CardActions>
      ) : null}

      {isCourier() && !item.transit && item.purchased && !item.verified ? (
        <CardActions>
          <Select value={fee} onChange={(e) => setFee(e.target.value)}>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
          <Button size="small" onClick={() => setPurchaseFee(item.id, fee)}>
            % Deliver
          </Button>
        </CardActions>
      ) : null}
    </StyledCard>
  );
};

export default Ad;
