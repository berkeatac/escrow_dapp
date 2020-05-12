import React, { Component } from "react";
import MarketplaceContract from "./contracts/Marketplace.json";
import getWeb3 from "./getWeb3";
import styled from "styled-components";

import PostAd from "./components/PostAd";
import Ad from "./components/Ad";
import AdList from "./components/AdList";
import NavBar from "./components/NavBar";

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

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <AppDiv className="App">
        <NavBar account={this.state.accounts[0]} />
        <Container>
          <PostAd createItem={this.createItem}></PostAd>
          <AdList
            items={this.state.items}
            purchaseItem={this.purchaseItem}
            verifyPurchase={this.verifyPurchase}
            cancelPurchase={this.cancelPurchase}
            account={this.state.accounts[0]}
          ></AdList>
        </Container>
      </AppDiv>
    );
  }
}

export default App;
