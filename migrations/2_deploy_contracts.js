var kSeedToken = artifacts.require("kSeedToken.sol");
var kKushToken = artifacts.require("kKushToken.sol");

module.exports = async function(deployer) {
    await deployer.deploy(kSeedToken, { gas: 7000000 })
    await deployer.deploy(kKushToken, { gas: 7000000 })
}