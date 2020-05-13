import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const NavBar = ({ account, becomeCourier, couriers }) => {
  const getRep = () => {
    for (let i = 0; i < couriers.length; i++) {
      if (couriers[i].adr === account) {
        return couriers[i].reputation;
      }
    }
  };

  const isCourier = () => {
    for (let i = 0; i < couriers.length; i++) {
      if (couriers[i].adr === account) {
        return true;
      }
    }
    return false;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5">Escrow Dapp</Typography>
        <Typography variant="h6" style={{ marginLeft: "100px" }}>
          {account}
        </Typography>
        {isCourier() ? (
          <Typography variant="h6" style={{ marginLeft: "100px" }}>
            {`Reputation: ${getRep()}`}
          </Typography>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "100px" }}
            onClick={() => becomeCourier()}
          >
            Become Courier
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
