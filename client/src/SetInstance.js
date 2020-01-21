import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";

import getWeb3 from "./getWeb3";

class SetInstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  sender: '',
                  receiver: '',
                  accounts: {},
                  contract: {}};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    });
    console.log(this.state);
  }

  set = async (contract, accounts, value) => {
    await contract.methods.set(value).send({from: accounts[0]});
    const response = await contract.methods.get().call();
    this.setState({ storageValue: response });
  }

  sent = async (sender, receiver, contract, value, accounts, web3) => {
    console.log(sender)
    console.log(web3)
    await contract.methods.send(receiver, value).send({from: sender});
    const balance = await web3.eth.getBalance(sender);
    this.setState({ storageValue: balance });
    console.log("here")
    console.log(balance);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { accounts, contract, web3 } = this.props;
    const value = this.state.value;
    const sender = this.state.sender;
    const receiver = this.state.receiver;
    this.sent(sender, receiver, contract, value, accounts, web3);

    // console.log("sender: " + sender);
    // console.log("receiver: " + receiver);
    // console.log("amount: " + value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Sender:
            <input type="text" name="sender" value={this.state.sender} onChange={this.handleChange} />
            Receiver:
            <input type="text" name="receiver" value={this.state.receiver} onChange={this.handleChange} />
            Amount:
            <input type="text" name="value" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Send" />
        </form>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}
export default SetInstance;
