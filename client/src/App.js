import React, { Component } from "react";
import MarketplaceContract from "./contracts/Marketplace.json";
import getWeb3 from "./getWeb3";
import styled from "styled-components";

import PostAd from "./components/PostAd";
import Ad from "./components/Ad";
import AdList from "./components/AdList";
import NavBar from "./components/NavBar";
import CouriersList from "./components/CouriersList";
import Grid from "@material-ui/core/Grid";

import "./App.css";

const Container = styled.div`
  width: 55vw;

  & > * {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    items: [],
    couriers: [],
  };

  componentDidMount = async () => {
    const _this = this;
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MarketplaceContract.networks[networkId];
      const instance = new web3.eth.Contract(
        MarketplaceContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.getItems);

      if (window.ethereum) {
        window.ethereum.on("accountsChanged", function () {
          web3.eth.getAccounts(function (error, newAccounts) {
            _this.setState(
              { ..._this.state, accounts: newAccounts },
              _this.getItems
            );
          });
        });
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  createItem = async (title, description, price) => {
    const { accounts, contract } = this.state;
    const resp = await contract.methods
      .createItem(
        title,
        description,
        this.state.web3.utils.toWei(price.toString(), "Ether")
      )
      .send({ from: accounts[0] });
    if (resp) {
      this.getItems();
    }
  };

  getItems = async () => {
    const { accounts, contract } = this.state;
    const resp = await contract.methods.getItems().call();
    this.setState({ ...this.state, items: resp });
    this.getCouriers();
    console.log(resp);
  };

  purchaseItem = async (item) => {
    const { accounts, contract } = this.state;
    const resp = await contract.methods.purchaseItem(item.id).send({
      from: accounts[0],
      value: this.state.web3.utils.toWei(item.price.toString(), "wei"),
    });
    if (resp) {
      this.getItems();
    }
  };

  verifyPurchase = async (item) => {
    const { accounts, contract } = this.state;
    console.log(item.id);
    const resp = await contract.methods.verifyPurchase(item.id).send({
      from: accounts[0],
    });
    if (resp) {
      this.getItems();
    }
  };

  cancelPurchase = async (item) => {
    const { accounts, contract } = this.state;
    const resp = await contract.methods.cancelPurchase(item.id).send({
      from: accounts[0],
    });
    if (resp) {
      this.getItems();
    }
  };

  becomeCourier = async () => {
    const { accounts, contract } = this.state;
    const resp = await contract.methods.becomeCourier().send({
      from: accounts[0],
    });
    if (resp) {
      this.getItems();
    }
  };

  getCouriers = async () => {
    const { accounts, contract } = this.state;
    const resp = await contract.methods.getCouriers().call();
    this.setState({ ...this.state, couriers: resp });
    console.log(resp);
  };

  setPurchaseFee = async (itemId, percentage) => {
    const { accounts, contract } = this.state;
    const resp = await contract.methods
      .setPurchaseFee(itemId, percentage)
      .send({
        from: accounts[0],
      });
    if (resp) {
      this.getItems();
    }
  };

  deleteItem = async (itemId) => {
    const { accounts, contract } = this.state;
    const resp = await contract.methods
      .deleteItem(itemId)
      .send({ from: accounts[0] });
    if (resp) {
      this.getItems();
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <AppDiv className="App">
        <NavBar
          account={this.state.accounts[0]}
          becomeCourier={this.becomeCourier}
          couriers={this.state.couriers}
        />
        <Grid container>
          <Grid item xs={5}>
            <PostAd createItem={this.createItem}></PostAd>
            <CouriersList couriers={this.state.couriers}></CouriersList>
          </Grid>
          <Grid item xs={7}>
            <AdList
              items={this.state.items}
              purchaseItem={this.purchaseItem}
              verifyPurchase={this.verifyPurchase}
              cancelPurchase={this.cancelPurchase}
              account={this.state.accounts[0]}
              couriers={this.state.couriers}
              setPurchaseFee={this.setPurchaseFee}
              deleteItem={this.deleteItem}
            ></AdList>
          </Grid>
        </Grid>
      </AppDiv>
    );
  }
}

export default App;
