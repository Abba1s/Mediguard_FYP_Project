const SupplyChain = artifacts.require("../build/contracts/SupplyChain");

module.exports = function (deployer) {
    deployer.deploy(SupplyChain);
};
