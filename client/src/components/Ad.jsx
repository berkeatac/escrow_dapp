import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
}) => {
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
      </CardContent>
      <CardActions>
        {item.purchased || item.owner === account ? null : (
          <Button size="small" onClick={() => purchaseItem(item)}>
            Send Escrow
          </Button>
        )}
      </CardActions>
      <CardActions>
        {console.log(item.id, item.purchased, item.buyer, account)}
        {item.purchased && item.buyer === account ? (
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
    </StyledCard>
  );
};

export default Ad;
