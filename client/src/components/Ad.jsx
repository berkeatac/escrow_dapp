import React, { Fragment, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const StyledCard = styled(Card)`
  width: 40vw;
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
  const [fee, setFee] = useState(0);
  const isCourier = () => {
    for (let i = 0; i < couriers.length; i++) {
      if (couriers[i].adr === account) {
        return true;
      }
    }
    return false;
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="h2">
          {item.name}
        </Typography>
        <Typography variant="body2" component="p">
          {item.description}
        </Typography>
        <Typography variant="body2" component="p">
          {`Seller: ${item.owner}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`${item.price / 10 ** 18} ETH`}
        </Typography>
        {item.verified && item.buyer === account ? (
          <Typography variant="body2" component="p">
            You bought and verified the purchase of this item
          </Typography>
        ) : null}
        {item.transit && item.purchased && !item.verified ? (
          <Typography variant="overline" component="p">
            {`IN TRANSIT BY ${item.courier}`}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions>
        {!item.purchased && item.owner !== account && !isCourier() ? (
          <Button size="small" onClick={() => purchaseItem(item)}>
            Send Escrow
          </Button>
        ) : null}
      </CardActions>
      <CardActions>
        {item.purchased &&
        item.buyer === account &&
        !item.verified &&
        item.transit ? (
          <>
            <Button size="small" onClick={() => verifyPurchase(item)}>
              Verify Escrow
            </Button>
            <Button size="small" onClick={() => cancelPurchase(item)}>
              Cancel Escrow
            </Button>
          </>
        ) : null}
      </CardActions>
      <CardActions>
        {isCourier() && !item.transit && item.purchased && !item.verified ? (
          <>
            <TextField
              type="number"
              inputProps={{ min: "0", max: "10", step: "1", maxLength: "2" }}
              value={fee}
              onChange={(e) => setFee(e.target.value)}
            ></TextField>
            <Button size="small" onClick={() => setPurchaseFee(item.id, fee)}>
              % Deliver
            </Button>
          </>
        ) : null}
      </CardActions>
    </StyledCard>
  );
};

export default Ad;
