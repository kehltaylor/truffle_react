var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Send = artifacts.require("./Send.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Send);
};
