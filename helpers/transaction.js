var Tx = require('ethereumjs-tx');
var Web3 = require('web3');
var web3 = new Web3();
const NETWORKS = require('../helpers/networks.js')

let CurrentNetwork = NETWORKS.defaultInterface;

let sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

function wait(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout)
    })
}

function init(config) {

    CurrentNetwork = new NETWORKS.defaultInterface(config);
    web3 = new Web3(new Web3.providers.HttpProvider(CurrentNetwork[0].rpcUrl));
    return {web3}
}

const send = function(obj) {

    const privateKey = new Buffer.from(CurrentNetwork[0].exchangeAccount.privateKey, 'hex')

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

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
            if (err) {
                console.error('Send error 1', obj.from, " - ", obj.to, 'nonce', obj.nonce)
                console.error(String(err))
                console.error('Sleep 2 seconds and resend until done')
                return sleep(2000).then(() => {
                    return resolve(send(obj))
                })
            } else {
                try {
                    console.log('Transaction made with hash', JSON.stringify(hash), " \nPlease wait until we get a receipt...")
                    return resolve(hash)
                } catch (e) {
                    console.error('Save db error', obj.to)
                }
                return resolve()
            }
        }).catch(e => {})
    })
}

const getTransactionReceipt = async (hash) => {
    let receipt = null;
    while (receipt === null) {
        // we are going to check every second if transation is mined or not, once it is mined we'll leave the loop
        receipt = await getTransactionReceiptPromise(hash);
        await wait(1000);
    }
    return receipt;
};

async function getTransactionReceiptPromise(hash) {
    // here we just promisify getTransactionReceipt function for convenience
    let receipt = await web3.eth.getTransactionReceipt(hash)
    return receipt
}

/** Transaction receipt example, parse as pleased.
> {
  "status": true,
  "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
  "transactionIndex": 0,
  "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
  "blockNumber": 3,
  "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
  "cumulativeGasUsed": 314159,
  "gasUsed": 30234,
  "logs": [{
         // logs as returned by getPastLogs, etc.
     }, ...]
}
**/

module.exports = {
    init: init,
    send: send,
    getTransactionReceipt: getTransactionReceipt,
    getTransactionReceiptPromise: getTransactionReceiptPromise
};
