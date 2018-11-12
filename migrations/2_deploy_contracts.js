var HelloBlockchain = artifacts.require('HelloBlockchain');

module.exports = (deployer,network,accounts) => {
    deployer.deploy(HelloBlockchain, "hello", {from: accounts[0]});
};