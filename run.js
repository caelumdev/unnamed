var fs = require('fs');
const CONTROLLER = require('./src/controller.js')
const WALLET = require('./src/WalletController.js')
const NETWORKS = require('./helpers/networks.js')


async function boot() {

    // For a single connection:
    //let caelum = fetchSingleInterface("./config/caelum_single.json")

    // OR for a single file with multiple connections:
    let multiple = await NETWORKS.fetchMultipleInterface("../config/multiple_confs.json", "ROPSTEN")

    // init
    let init = await WALLET.init(multiple, './tmp.txt')

    // get status
    let status = await WALLET.getStatus(multiple);

    // get transactions
    let tx = await WALLET.getTransactions(multiple);

    // send transaction (note, needs error handling in helpers/networks.)
    try {
    let send = await WALLET.sendTransaction(multiple, '0x5CEfb7C6637b908F5ce473C259B5707697A065D6', 0.02)
    } catch (err) {
        console.log(err)
    }


}

boot()
