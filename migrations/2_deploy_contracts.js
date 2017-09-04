'use strict';

const _owners = [111, 222, 333];

const STQToken = artifacts.require("./STQToken.sol");
const FundsRegistry = artifacts.require("./crowdsale/FundsRegistry.sol");

const FixedTimeBonuses = artifacts.require("./crowdsale/FixedTimeBonuses.sol");
const STQCrowdsale = artifacts.require("./STQCrowdsale.sol");

module.exports = function(deployer) {
  deployer.deploy(STQToken, _owners).then(function() {
    return deployer.deploy(FundsRegistry, _owners, 2, 0);
  }).then(function() {
    return deployer.deploy(FixedTimeBonuses);
  }).then(function() {
    deployer.link(FixedTimeBonuses, STQCrowdsale);
    return deployer.deploy(STQCrowdsale, _owners, STQToken.address, FundsRegistry.address);
  });

  // owners have to manually perform
  // STQToken.setController(address of STQCrowdsale);
  // and
  // FundsRegistry.setController(address of STQCrowdsale);
};
