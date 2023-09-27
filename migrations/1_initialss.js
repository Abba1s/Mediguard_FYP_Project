const Migrations = artifacts.require("../build/contracts/Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
