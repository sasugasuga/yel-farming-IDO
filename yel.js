const { ethers } = require('ethers');
require('log-timestamp');

rpc = 'https://rpc.ftm.tools/';

const pkey = process.env.PEENS; 		// store private key as env var $PEENS

const provider = new ethers.providers.JsonRpcProvider(rpc);
const signer = new ethers.Wallet(pkey, provider);

const myWallet = signer.address;

var options = { gasPrice: 50000000000, gasLimit: 3000000};		// gwei
// YEL LP contract
const YelLpAddress = '0x954b15065e4fa1243cd45a020766511b68ea9b6e';
const YelLpAbi = '[{"inputs":[{"internalType":"contract IERC20","name":"_yel","type":"address"},{"internalType":"uint256","name":"_yelPerSecond","type":"uint256"},{"internalType":"uint32","name":"_startTime","type":"uint32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint16","name":"_allocPoint","type":"uint16"},{"internalType":"contract IERC20","name":"_stakingToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"addSeconds","type":"uint32"}],"name":"changeEndTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endTime","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingYel","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"stakingToken","type":"address"},{"internalType":"uint256","name":"stakingTokenTotalAmount","type":"uint256"},{"internalType":"uint256","name":"accYelPerShare","type":"uint256"},{"internalType":"uint32","name":"lastRewardTime","type":"uint32"},{"internalType":"uint16","name":"allocPoint","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint16","name":"_allocPoint","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_yelPerSecond","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"setYelPerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"},{"internalType":"bool","name":"direct","type":"bool"},{"internalType":"bool","name":"renounce","type":"bool"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"remainingYelTokenReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"yel","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"yelPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]';
const YelLpContract = new ethers.Contract(YelLpAddress, YelLpAbi, signer);
// YEL token
const YelTokenName = 'YEL';
const YelTokenAddress = '0xD3b71117E6C1558c1553305b44988cd944e97300';
const YelTokenAbi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"txhash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogSwapin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"bindaddr","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogSwapout","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"bytes32","name":"txhash","type":"bytes32"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Swapin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"bindaddr","type":"address"}],"name":"Swapout","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]';
const YelTokenContract = new ethers.Contract(YelTokenAddress, YelTokenAbi, provider);

// farm re-invest strat BOO ONLY
// const repeat = 3600000;		// auto-reinvest loop time, msec 
// const tokens = [BooTokenName];
// const LpContracts = [BooLpContract];
// const StakeContracts = [BooSingleContract];
// const TokenContracts = [BooTokenContract];

// farm re-invest strat MULTIPLE
// const repeat = 1800000;		// auto-reinvest loop time, msec 
// const tokens = [BooTokenName, ShadeTokenName];
// const LpContracts = [BooLpContract, ShadeLpContract];
// const StakeContracts = [BooSingleContract, ShadeSingleContract];
// const TokenContracts = [BooTokenContract, ShadeTokenContract];

// farm re-invest strat SHADE ONLY
const repeat = 60000;		// auto-reinvest loop time, msec 
const tokens = [YelTokenName];
const LpContracts = [YelLpContract];
const StakeContracts = [YelLpContract];
const TokenContracts = [YelTokenContract];

// harvest loop (new tokens)
// const repeat = 600000;		// auto-reinvest loop time, msec 
// const tokens = [LqdrTokenName];
// const LpContracts = [LqdrLpContract];
// const StakeContracts = [false];
// const TokenContracts = [LqdrTokenContract];


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function numPools(contract=BooLpContract) {
	return contract.poolLength();
}

function pendingBal(contract=BooLpContract, _pid=0, wallet=myWallet, token=BooTokenName) {
	if (token == 'BOO') {
		// this is amt shown in single stake (value to be compounded)
		return contract.pendingBOO(_pid, wallet);
	} else if (token == 'YEL') {
		return contract.pendingYel(_pid, wallet);
	}
	return;
}

function walletBal(contract=BooTokenContract) {
	return contract.balanceOf(myWallet);
}

async function scanPools(contract=BooLpContract, pools=0, token=BooTokenName) {
	var n; claimablePids = [];
	for (n=0; n<pools; n++) {
		var bal = await pendingBal(contract, n, myWallet, token);
	    if (bal>0) {
	    	claimablePids.push(n);
	    	const tokenBal = ethers.utils.formatUnits(bal,18);
			console.log("pid"+n+": "+tokenBal+" "+token);
	    }
	}
	return claimablePids;
}

async function claimLpReward(contract=BooLpContract, _pid=NaN, _amount=0, token=BooTokenName) {
	if (_pid != NaN & _amount != NaN) {
		var harvestBal = 0;
		// add pending single stake BOO to withdraw amt to be harvested
		if (token == 'BOO' & _pid==0) {
			var harvestBal = await contract.pendingBOO(0, myWallet);
		} else if (token == 'YEL') {
		var harvestBal = await pendingBal(contract,0, myWallet, token)
		}
		const subTotal = await _amount + harvestBal;
		await contract.withdraw(_pid, subTotal, options);
	}
	return;
}

async function depositSingle(contract=BooSingleContract, token='BOO', _amount=0) {
	if (token == 'BOO') {
		var harvestBal = await pendingBal(BooLpContract, 0, myWallet, BooTokenName);
	} else if (token == 'YEL') {
		var harvestBal = await pendingBal(contract,0, myWallet, token)
	}
	const harvestBN = await ethers.BigNumber.from( harvestBal );
	const walBalBN = await ethers.BigNumber.from(_amount);
	const subTotalBN = await harvestBN.add(walBalBN);
	// const subTotal = await harvestBal + _amount;
	await contract.deposit(0, subTotalBN, options);
	// await contract.enter(subTotalBN, options);
	return;
}


// main function
async function main() {

	var poolList = [];
	for (i in LpContracts) {
		const pools = await numPools(LpContracts[i]); 
		poolList.push(pools); 
	}

	while(true) {
		// scan/claim LP pools
		for (idx in tokens) {
			// find LPs with claimable balances
			console.log("scanning "+tokens[idx]+" pools.".padEnd(82,'.') );
			try {
				var claimablePids = await scanPools(LpContracts[idx], poolList[idx], tokens[idx]);

				await sleep(2000);
				// harvest LP rewards
				for (index in claimablePids) {
					await claimLpReward(LpContracts[idx], claimablePids[index], 0, tokens[idx]);		// try withdraw 0 (this is lp token bal)
					await sleep(3000);
				}
			}
			catch (err) {
				console.log(err);
			}
		}
		console.log("");

		// stake single-side
		for (idx in tokens) {
			await sleep(2000);
			try {
				// const tokenBal = await TokenContract.balanceOf(myWallet);
				const tokenBal = await walletBal(TokenContracts[idx]);
				// console.log(tokenBal);

				await sleep(5000);
				const tokenBalStr = await ethers.utils.formatUnits(tokenBal,18);
				console.log("available: " + tokenBalStr +" "+tokens[idx]);

				if (StakeContracts[idx] != false) {
					await depositSingle(StakeContracts[idx], tokens[idx], tokenBal);
					const tokenDeposit = await ethers.utils.formatUnits(tokenBal,18);
					console.log(">> deposited " + tokenDeposit +" "+tokens[idx]);
					await sleep(3000)
				}
			}
			catch (err) {
				console.log(err);
			}
		}
		console.log("\nwaiting "+repeat/60000+" mins...\n");
		await sleep(repeat);
	}
}

main().then(console.log).catch(console.error);