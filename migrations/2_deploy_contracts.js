var HelloBlockchain = artifacts.require('HelloBlockchain');

module.exports = (deployer) => {
    deployer.deploy(HelloBlockchain, "hello");
};