const { expect } = require("chai");
const { ethers }  = require("hardhat");

describe("SC03_TrustScore", function () {
  let contract;

  beforeEach(async function () {
    const Factory = await ethers.getContractFactory("SC03_TrustScore");
    contract = await Factory.deploy();
    await contract.deployed();
    await contract.registerFarmer("FARM-AP-001");
  });

  it("initialises trust score at 50", async function () {
    const score = await contract.getScore("FARM-AP-001");
    expect(score).to.equal(50);
  });

  it("increments by 2 for compliant reading", async function () {
    await contract.updateScore("FARM-AP-001", "COMPLIANT");
    expect(await contract.getScore("FARM-AP-001")).to.equal(52);
  });

  it("decrements by 15 for major violation", async function () {
    await contract.updateScore("FARM-AP-001", "MAJOR");
    expect(await contract.getScore("FARM-AP-001")).to.equal(35);
  });

  it("does not drop below score floor of 20", async function () {
    // Drive score down below 20
    for (let i = 0; i < 10; i++) {
      await contract.updateScore("FARM-AP-001", "MAJOR");
    }
    const score = await contract.getScore("FARM-AP-001");
    expect(score).to.be.gte(20);
  });
});
