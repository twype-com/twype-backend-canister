set -x
set -e
trap 'catch' ERR
catch() {
  dfx identity use default
  echo "FAIL"
  exit 1
}
dfx identity use default
export PRINCIPAL=$(dfx identity get-principal)
dfx canister call twype_token clear
# set allowance on DIP20 tokens
export DEX_ID=$(dfx canister id twype_token)
dfx canister call AkitaDIP20 approve  '(principal '\"$DEX_ID\"',10000000)'
dfx canister call GoldenDIP20 approve  '(principal '\"$DEX_ID\"',10000000)'
# get ICP deposit address (removes unnesessary comma at the end)
export ICP_DEPOSIT_ADDR=$(dfx canister call twype_token getDepositAddress | tr -d '\n' | sed 's/,)/)/')
# deposit some ICP in DEX
dfx canister call ledger transfer "(record { amount = record { e8s = 1000000 }; to = $ICP_DEPOSIT_ADDR; fee = record { e8s = 10000}; memo = 1;})"
# get token canister IDs
export AKITA_ID=$(dfx canister id AkitaDIP20)
export GOLDEN_ID=$(dfx canister id GoldenDIP20)
export LEDGER_ID=$(dfx canister id ledger)

# deposit DIP. The amount that was approved

dfx canister call twype_token deposit '(principal '\"$AKITA_ID\"')'
dfx canister call twype_token deposit '(principal '\"$GOLDEN_ID\"')'
# transfer ICP to DEX
dfx canister call twype_token deposit '(principal '\"$LEDGER_ID\"')'

# withdraw ICP
dfx canister call twype_token withdraw '(principal '\"$LEDGER_ID\"', 100000, principal '\"$PRINCIPAL\"')'

# withdraw DIP 
# user balance
dfx canister call GoldenDIP20 balanceOf '(principal '\"$PRINCIPAL\"')'
#user balance on DEX
dfx canister call twype_token getBalance '(principal '\"$GOLDEN_ID\"')'
dfx canister call twype_token withdraw '(principal '\"$GOLDEN_ID\"', 100000, principal '\"$PRINCIPAL\"')'
# user balance
dfx canister call GoldenDIP20 balanceOf '(principal '\"$PRINCIPAL\"')'
#user balance on DEX
dfx canister call twype_token  getBalance '(principal '\"$GOLDEN_ID\"')'
# get balances
dfx canister call twype_token getBalances
dfx canister call twype_token getBalances | grep "amount = 9_899_580"
echo "PASS"
