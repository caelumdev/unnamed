//const Utils = require('../../lib/utils.js');
let logger;
let config = {};
var fs = require('fs');

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.caelumfoundation.com'));



// Init
const init = function (configuration, log) {
	return new Promise((resolve, reject) => {
		logger = log;
		config = configuration;
		console.log("Info", "Interface", "[init] - Successfully initialized interface: " + config[0].network);
		return resolve();
	});
}

async function getBlock() {
    let result = await web3.eth.getBlockNumber;
    return result
}

// GetStatus
//arguments = {
//}
const getStatus = function (arguments) {
	return new Promise(async (resolve, reject) => {
		const result = {
			Version: "",
			Balance: await web3.eth.getBalance(arguments[0].exchangeAccount.address),
			Height: await web3.eth.getBlockNumber(),
			Peers: await web3.eth.net.getPeerCount(),
			Error: "or error"
		};
		return resolve(result);
	});
}


// GetAddress
//arguments = {
//	UserId: 123
//}
const createAddress = function (arguments) {
	return new Promise(async (resolve, reject) => {
		const result = {
			Address: "abc",
			BaseAddress: "xyz",
			Error: "or error"
		};
		resolve(result);
	});
}


// GetTransactions
//arguments = {
//	Type: "All|Deposit|Withdraw",
//	LastCheckBlock: "The last block to check from"
//}
const getTransactions = function (arguments) {
	return new Promise(async (resolve, reject) => {
		const result = {
			Balance: "current balance",
			CurrentBlock: "current block hash",
			Transactions: [{
				Address: "abc-xyz",
				Type: "Deposit|Withdraw|Unknown",
				Amount: 0.00000000,
				Confirmations: 6,
				BlockHash: "xzy",
				BlockNum: 0,
				Output: 0,
				Fee: 0.00000000,
				TxId: "abc-xyz",
				Timestamp: 15465855858
			}],
			Error: "or error"
		};
		return resolve(result);
	});
}


// SendTransaction
//arguments = {
//	Address: "abc-xyz",
//	BaseAddress: "abc-xyz(optional)",
//	Amount: 0.00000000
//}


// Better solution below
const send = function (obj) {

  const privateKey = new Buffer(privatekey, 'hex')

    return new Promise((resolve, reject) => {
        const rawTx = {
          nonce: obj.nonce,
          from: obj.from,
          to: obj.to,
          value: obj.value,
          gasLimit: obj.gasLimit,
          gasPrice: obj.gasPrice
        }
        const tx = new Tx(rawTx);
        tx.sign(privateKey);

        const serializedTx = tx.serialize();

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
            if (err) {
                console.error('Send error 1', obj.to, 'nonce', obj.nonce)
                console.error(String(err))
                console.error('Sleep 2 seconds and resend until done')
                return sleep(2000).then(() => {
                    return resolve(send(obj))
                })
            } else {
                try {
                    console.log('Done', obj.to)
                } catch (e) {
                    console.error('Save db error', obj.to)
                }
                return resolve()
            }
        }).catch(e => { })
    })
}

async function sendTransaction (coinbase, account, amount) {

  let item = {
      nonce: parseInt(nonce),
      from: coinbase,
      to: account,
      value: web3.utils.numberToHex(amount),
      gasLimit: 41000,
      gasPrice: 500000
  }
  await send(item)
  nonce = parseInt(nonce) + 1
}

module.exports = {
	init: init,
	getStatus: getStatus,
	createAddress: createAddress,
	getTransactions: getTransactions,
	sendTransaction: sendTransaction,
};
