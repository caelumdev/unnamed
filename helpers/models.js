/**
 *
 * Define some constructor classes
 *
**/

function WalletReturnType() {
    this.Version = "";
    this.Balance = "";
    this.Height = "";
    this.Peers = "";
    this.Error = "";
    this.Status = "";

    return {WalletReturnType}
}

function TransactionsType() {
    this.Balance = "current balance";
    this.CurrentBlock = "current block hash";
    this.Transactions = [new TransactionDetail()],
    this.Error = "or error"
}

function TransactionDetail() {
    this.Address = "abc-xyz",
    this.Type = "Deposit|Withdraw|Unknown",
    this.Amount = 0.00000000,
    this.Confirmations = 6,
    this.BlockHash = "xzy",
    this.BlockNum = 0,
    this.Output = 0,
    this.Fee = 0.00000000,
    this.TxId = "abc-xyz",
    this.Timestamp = 15465855858
}

module.exports = {
    WalletReturnType: WalletReturnType,
    TransactionsType: TransactionsType,
    TransactionDetail: TransactionDetail
};
