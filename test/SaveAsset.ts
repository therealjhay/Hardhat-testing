import { ethers } from "hardhat";
import { expect } from "chai";

describe("SaveAsset", function () {
	let erc20Token: any, saveAsset: any, addr1: any, addr2: any, addr3: any;
	
	beforeEach(async function () {
		const ERC20Token = await ethers.getContractFactory("ERC20");
		const SaveAsset = await ethers.getContractFactory("SaveAsset");
		[addr1, addr2, addr3] = await ethers.getSigners();

		erc20Token = await ERC20Token.deploy();
		await erc20Token.waitForDeployment();

		const erc20TokenAddress = await erc20Token.getAddress();

		saveAsset = await SaveAsset.deploy(erc20TokenAddress);
		await saveAsset.waitForDeployment();

		const saveAssetAddress = await saveAsset.getAddress();
	});

	it("should correctly return the name, symbol and decimal for the erc20 token", async function () {
		expect(await erc20Token.name()).to.eq("UnivToken");
		expect(await erc20Token.symbol()).to.eq("Univt");
		expect(await erc20Token.decimals()).to.eq(18);
	});

	it("should be able to deposit ether in save asset contract", async function (){
		const depositAmount = ethers.parseEther("2");

    await erc20Token.mint(addr1.getAddress(), ethers.parseEther("10"));
    await erc20Token.connect(addr1).approve(await saveAsset.getAddress(), depositAmount);

    const allowance = await erc20Token.allowance(addr1.getAddress(), await saveAsset.getAddress());
    expect(allowance).to.eq(depositAmount);
    
    // await saveAsset.connect(addr1).deposit({ value : depositAmount});
		// expect(await saveAsset.connect(addr1).getUserSavings()).to.eq(depositAmount);


});

   
	});
