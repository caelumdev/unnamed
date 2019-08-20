// Make an object of a single json entry
function fetchSingleInterface(configuration) {
    let fetch = require(configuration);

    var interface = [
        {
            "network": fetch.interface.network,
            "chainId": fetch.interface.chainId,
            "rpcUrl": fetch.interface.rpcUrl,
            "wsUrl": fetch.interface.wsUrl,
            "exchangeAccount": fetch.interface.exchangeAccount
        }
    ];

    return interface;
}

// Make an object of a multiple json entry
function fetchMultipleInterface(configuration, network) {
    let fetch = require(configuration);

    var interface = [
        {
            "network": fetch[network].network,
            "chainId": fetch[network].chainId,
            "rpcUrl": fetch[network].rpcUrl,
            "wsUrl": fetch[network].wsUrl,
            "exchangeAccount": fetch[network].exchangeAccount
        }
    ];

    return interface;
}

function defaultInterface(configuration) {

    var interface = [
        {
            "network": configuration.network,
            "chainId": configuration.chainId,
            "rpcUrl": configuration.rpcUrl,
            "wsUrl": configuration.wsUrl,
            "exchangeAccount": configuration.exchangeAccount
        }
    ];

    return configuration;
}

module.exports = {
    fetchSingleInterface: fetchSingleInterface,
    fetchMultipleInterface: fetchMultipleInterface,
    defaultInterface: defaultInterface
};
