import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const StyledCard = styled(Card)`
  width: 40vw;
`;

const Ad = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="h2">
          Ad Title
        </Typography>
        <Typography variant="body2" component="p">
          Ad Description
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Send Escrow</Button>
      </CardActions>
    </StyledCard>
  );
};

export default Ad;
