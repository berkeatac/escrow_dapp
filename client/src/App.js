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
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
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
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  // UNCOMMENT THIS PART TO SEND A SET FUNCTION TO CONTRACT AT EACH PAGE RELOAD
  runExample = async () => {
    // const { accounts, contract } = this.state;
    // // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    // // Update state with the result.
    // this.setState({ storageValue: response });
  };

  createItem = async (title, price) => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.createItem(title, price).send({ from: accounts[0]});
    console.log(response)
  }

  getItems = async () => {
    const { accounts, contract } = this.state;
    this.createItem("berke1", 100);
    const resp = await contract.methods.getItems().call();
    console.log(resp);
    
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <AppDiv className="App">
        <NavBar account={this.state.accounts[0]} />\
        <Container>
          <PostAd></PostAd>
          <AdList></AdList>
        </Container>
      </AppDiv>
    );
  }
}

export default App;
