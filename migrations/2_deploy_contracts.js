const PatientClaim = artifacts.require("PatientClaim");

module.exports = function (deployer) {
  deployer.deploy(PatientClaim);
};
