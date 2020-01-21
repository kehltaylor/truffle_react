import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Send from "./contracts/Send.json";
import getWeb3 from "./getWeb3";
import SetInstance from './SetInstance';

import "./App.css";

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
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const deployedNetwork2 = Send.networks[networkId];
      const instance2 = new web3.eth.Contract(
        Send.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, payment_contract: instance2 }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };



  runExample = async () => {
    const { accounts, contract, payment_contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(10).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    // Update state with the result.
    this.setState({storageValue: response});
    this.setState({accounts: accounts});
    this.setState({contract: contract });
    this.setState({contract2: payment_contract});
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    var accounts = this.state.accounts;
    var contract = this.state.contract;
    var contract2= this.state.contract2;
    var web3 = this.state.web3;
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <h2>Smart Contract Example</h2>
        <SetInstance accounts={accounts} contract={contract2} web3={web3}/>

      </div>
    );
  }
}

export default App;
