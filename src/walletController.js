var fs = require('fs');
var Tx = require('ethereumjs-tx');
var MODELS = require('../helpers/models.js')
var TRANSACTION = require('../helpers/transaction.js')

var Web3 = require('web3');
var web3 = new Web3();

let logger;
let config = {};


module.exports = {

    async init(configuration, log) {
        logger = log;
        config = configuration;

        web3 = new Web3(new Web3.providers.HttpProvider(config[0].rpcUrl));

        // Why ???
        return new Promise((resolve, reject) => {
            console.log("Info", "Interface", "[init] - Successfully initialized interface: " + config[0].network);
            return resolve();
        });
    },
    async getStatus(arguments) {
        const result = new MODELS.WalletReturnType();
        try {
            (
                result.Version = "You can't get the client geth version",
                result.Balance = await web3.eth.getBalance(arguments[0].exchangeAccount.address),
                result.Height = await web3.eth.getBlockNumber(),
                result.Peers = await web3.eth.net.getPeerCount(),
                result.Error = "",
                result.Status = 200
            )
        } catch (err) {
            result.Error = "ERROR HERE " + err,
            result.Status = 404
        }
        return (result);
    },
    async getTransactions(arguments) {
        /** I'm pretty unsure what you try to accomplish here?
        ** Geth blockchains work on a different level.
        ** There is no historical data, except for a block number or a transaction hash.
        **
        ** Are you trying to fetch a complete report of transactions? A detail for a user? For a specific address?
        ** What is the intention on using this?
        */
        const TX = new MODELS.TransactionsType();
        return TX;
    },

    async sendTransaction(network, account, amount) {
        amount = web3.utils.toWei(amount.toString(), 'ether')

        let transaction = {
            nonce: await web3.eth.getTransactionCount(network[0].exchangeAccount.address, "pending"),
            from: network[0].exchangeAccount.address,
            to: account,
            value: web3.utils.numberToHex(amount),
            gasLimit: 41000,
            gasPrice: 500000
        }

        // Init the transaction class
        TRANSACTION.init(network)
        // Send our transaction
        let result = await TRANSACTION.send(transaction)
        // Wait for a receipt to detect the status
        const receipt = await TRANSACTION.getTransactionReceipt(result)

        console.log(" \n Transaction Success! \n " + JSON.stringify(receipt))
    }
}
