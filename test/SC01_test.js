const { expect } = require("chai");
const { ethers }  = require("hardhat");

describe("SC01_Compliance", function () {
  let contract;

  beforeEach(async function () {
    const Factory = await ethers.getContractFactory("SC01_Compliance");
    contract = await Factory.deploy();
    await contract.deployed();
  });

  it("marks compliant reading as COMPLIANT", async function () {
    const result = await contract.evaluateCompliance(
      "FARM-AP-001", 0, 68, 45, Date.now()
    );
    // Status 0 = Compliant
    expect(result).to.equal(0);
  });

  it("marks pesticide reading as NON-COMPLIANT", async function () {
    const result = await contract.evaluateCompliance(
      "FARM-AP-001", 20, 55, 18, Date.now()
    );
    // Status 1 = NonCompliant
    expect(result).to.equal(1);
  });
});
