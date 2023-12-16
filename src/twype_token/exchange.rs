use std::collections::HashMap;

use candid::{Nat, Principal};
use ic_cdk::caller;
use num_bigint::BigUint;
use rust_decimal::prelude::*;
use rust_decimal_macros::dec;

use crate::types::*;
use crate::{utils, OrderId};

#[derive(Default)]
pub struct Balances(pub HashMap<Principal, HashMap<Principal, Nat>>); // owner -> token_canister_id -> amount
#[derive(Default)]
pub struct RTBalances(pub HashMap<Principal, HashMap<Nat, Nat>>); // owner -> room id -> amount
#[derive(Default)]
pub struct RTSupply(pub HashMap<Nat, Nat>); // room id -> total supply
type Orders = HashMap<OrderId, Order>;

#[derive(Default)]
pub struct Exchange {
    pub next_id: OrderId,
    pub balances: Balances,
    pub rt_balances: RTBalances,
    pub rt_supply: RTSupply,
    pub orders: Orders,
}

pub fn get_price_decimal(supply: Decimal, amount: Decimal) -> Decimal {
    let sum1 = if supply == Decimal::ZERO {
        Decimal::ZERO
    } else {
        (supply.to_owned() - Decimal::ONE)
            * (supply.to_owned())
            * (dec!(2) * (supply.to_owned() - Decimal::ONE) + Decimal::ONE)
            / dec!(6)
    };
    let sum2 = if supply == Decimal::ZERO && amount == Decimal::ZERO {
        Decimal::ZERO
    } else {
        (supply.to_owned() - Decimal::ONE + amount.to_owned())
            * (supply.to_owned() + amount.to_owned())
            * (dec!(2) * (supply - Decimal::ONE + amount) + Decimal::ONE)
            / dec!(6)
    };
    sum2 - sum1
}

pub fn get_price_u128(supply: u128, amount: u128) -> u128 {
    let sum1 = if supply == 0 {
        0
    } else {
        (supply - 1) * (supply) * (2 * (supply - 1) + 1) / 6
    };
    let sum2 = if supply == 0 && amount == 0 {
        0
    } else {
        (supply - 1 + amount) * (supply + amount) * (2 * (supply - 1 + amount) + 1) / 6
    };
    sum2 - sum1
}

pub fn dec_to_nat(v: Decimal, d: u32) -> Nat {
    let amount_decimal_normalized = v * Decimal::TEN.powu(d as u64);
    let amount_out_128 = (amount_decimal_normalized).to_u128().unwrap();
    Nat(BigUint::from_u128(amount_out_128).unwrap())
}

impl RTSupply {
    pub fn increase_supply(&mut self, room: Nat, delta: Nat) {
        if let Some(x) = self.0.get_mut(&room) {
            *x += delta;
        } else {
            self.0.insert(room, delta);
        }
    }
    pub fn decrease_supply(&mut self, room: Nat, delta: Nat) -> bool {
        if let Some(x) = self.0.get_mut(&room) {
            if *x >= delta {
                *x -= delta;
                // no need to keep an empty token record
                if *x == utils::zero() {
                    self.0.remove(&room);
                }
                true
            } else {
                false
            }
        } else {
            self.0.insert(room, delta);
            false
        }
    }
}

impl RTBalances {
    pub fn add_balance(&mut self, owner: &Principal, room: Nat, delta: Nat) {
        let balances = self.0.entry(*owner).or_insert_with(HashMap::new);

        if let Some(x) = balances.get_mut(&room) {
            *x += delta;
        } else {
            balances.insert(room, delta);
        }
    }

    pub fn subtract_balance(&mut self, owner: &Principal, room: &Nat, delta: Nat) -> bool {
        if let Some(balances) = self.0.get_mut(owner) {
            if let Some(x) = balances.get_mut(&room) {
                if *x >= delta {
                    *x -= delta;
                    // no need to keep an empty token record
                    if *x == utils::zero() {
                        balances.remove(room);
                    }
                    return true;
                } else {
                    return false;
                }
            }
        }

        false
    }
}

impl Balances {
    pub fn add_balance(&mut self, owner: &Principal, token_canister_id: &Principal, delta: Nat) {
        let balances = self.0.entry(*owner).or_insert_with(HashMap::new);

        if let Some(x) = balances.get_mut(token_canister_id) {
            *x += delta;
        } else {
            balances.insert(*token_canister_id, delta);
        }
    }

    // Tries to substract balance from user account. Checks for overflows
    pub fn subtract_balance(
        &mut self,
        owner: &Principal,
        token_canister_id: &Principal,
        delta: Nat,
    ) -> bool {
        if let Some(balances) = self.0.get_mut(owner) {
            if let Some(x) = balances.get_mut(token_canister_id) {
                if *x >= delta {
                    *x -= delta;
                    // no need to keep an empty token record
                    if *x == utils::zero() {
                        balances.remove(token_canister_id);
                    }
                    return true;
                } else {
                    return false;
                }
            }
        }

        false
    }
}

impl Exchange {
    pub fn get_rt_supply(&self, room: Nat) -> Nat {
        self.rt_supply
            .0
            .get(&room)
            .map_or(utils::one(), |v| v.to_owned())
    }

    pub fn get_rt_price(&self, room: Nat, amount: Nat) -> Nat {
        let supply = self.get_rt_supply(room.to_owned());
        self.get_rt_price_for_supply(room, supply, amount)
    }

    pub fn get_rt_price_for_supply(&self, room: Nat, supply: Nat, amount: Nat) -> Nat {
        ic_cdk::println!("RT supply {supply}");
        ic_cdk::println!("RT room {room}");
        ic_cdk::println!("RT amount {amount}");

        let price = get_price_u128(supply.0.to_u128().unwrap(), amount.0.to_u128().unwrap());
        ic_cdk::println!("RT price {price}");

        Nat(BigUint::from_u128(price).unwrap())
    }

    pub fn get_rt_balance(&self, room: Nat) -> Nat {
        self.rt_balances
            .0
            .get(&caller())
            .and_then(|v| v.get(&room))
            .map_or(utils::zero(), |v| v.to_owned())
    }

    pub fn get_balance(&self, token_canister_id: Principal) -> Nat {
        self.balances
            .0
            .get(&caller())
            .and_then(|v| v.get(&token_canister_id))
            .map_or(utils::zero(), |v| v.to_owned())
    }

    pub fn get_balances(&self) -> Vec<Balance> {
        match self.balances.0.get(&caller()) {
            None => Vec::new(),
            Some(v) => v
                .iter()
                .map(|(token_canister_id, amount)| Balance {
                    owner: caller(),
                    token: *token_canister_id,
                    amount: amount.to_owned(),
                })
                .collect(),
        }
    }

    pub fn get_all_balances(&self) -> Vec<Balance> {
        self.balances
            .0
            .iter()
            .flat_map(|(owner, balances)| {
                balances.iter().map(move |(token, amount)| Balance {
                    owner: *owner,
                    token: *token,
                    amount: amount.to_owned(),
                })
            })
            .collect()
    }

    pub fn get_order(&self, order: OrderId) -> Option<Order> {
        self.orders.get(&order).cloned()
    }

    pub fn get_all_orders(&self) -> Vec<Order> {
        self.orders.iter().map(|(_, o)| o.clone()).collect()
    }

    pub fn place_order(
        &mut self,
        from_token_canister_id: Principal,
        from_amount: Nat,
        to_token_canister_id: Principal,
        to_amount: Nat,
    ) -> OrderPlacementReceipt {
        ic_cdk::println!("place order");
        if from_amount <= utils::zero() || to_amount <= utils::zero() {
            return OrderPlacementReceipt::Err(OrderPlacementErr::InvalidOrder);
        }

        if self.check_for_sell_orders(from_token_canister_id) {
            return OrderPlacementReceipt::Err(OrderPlacementErr::InvalidOrder);
        }

        let balance = self.get_balance(from_token_canister_id);
        if balance < from_amount {
            return OrderPlacementReceipt::Err(OrderPlacementErr::InvalidOrder);
        }
        let id = self.next_id();
        self.orders.insert(
            id,
            Order {
                id,
                owner: caller(),
                from: from_token_canister_id,
                fromAmount: from_amount,
                to: to_token_canister_id,
                toAmount: to_amount,
            },
        );
        self.resolve_order(id)?;

        if let Some(o) = self.orders.get(&id) {
            OrderPlacementReceipt::Ok(Some(o.clone()))
        } else {
            OrderPlacementReceipt::Ok(None)
        }
    }

    pub fn check_for_sell_orders(&self, from_token_canister_id: Principal) -> bool {
        self.orders
            .values()
            .any(|v| (v.from == from_token_canister_id) && (v.owner == caller()))
    }

    pub fn cancel_order(&mut self, order: OrderId) -> CancelOrderReceipt {
        if let Some(o) = self.orders.get(&order) {
            if o.owner == caller() {
                self.orders.remove(&order);
                CancelOrderReceipt::Ok(order)
            } else {
                CancelOrderReceipt::Err(CancelOrderErr::NotAllowed)
            }
        } else {
            CancelOrderReceipt::Err(CancelOrderErr::NotExistingOrder)
        }
    }

    fn resolve_order(&mut self, id: OrderId) -> Result<(), OrderPlacementErr> {
        ic_cdk::println!("resolve order");
        let mut matches = Vec::new();
        let a = self.orders.get(&id).unwrap();
        for (order, b) in self.orders.iter() {
            if *order == id {
                continue;
            }

            if a.from == b.to && a.to == b.from {
                // Simplified to use multiplication from
                // (a.fromAmount / a.toAmount) * (b.fromAmount / b.toAmount) >= 1
                // which checks that this pair of trades is profitable.
                if a.fromAmount.to_owned() * b.fromAmount.to_owned()
                    >= a.toAmount.to_owned() * b.toAmount.to_owned()
                {
                    ic_cdk::println!(
                        "match {}: {} -> {}, {}: {} -> {}",
                        id,
                        a.fromAmount,
                        a.toAmount,
                        *order,
                        b.fromAmount,
                        b.toAmount
                    );
                    matches.push((a.to_owned(), b.to_owned()));
                }
            }
        }
        for m in matches {
            let mut a_to_amount: Nat = utils::zero();
            let mut b_to_amount: Nat = utils::zero();
            let (a, b) = m;
            // Check if some orders can be completed in their entirety.
            if b.fromAmount >= a.toAmount {
                a_to_amount = a.toAmount.to_owned();
            }
            if a.fromAmount >= b.toAmount {
                b_to_amount = b.toAmount.to_owned();
            }
            // Check if some orders can be completed partially.
            if check_orders(
                a.to_owned(),
                b.to_owned(),
                &mut a_to_amount,
                b_to_amount.to_owned(),
            ) {
                continue;
            }
            if check_orders(
                b.to_owned(),
                a.to_owned(),
                &mut b_to_amount,
                a_to_amount.to_owned(),
            ) {
                continue;
            }

            if a_to_amount > utils::zero() && b_to_amount > utils::zero() {
                self.process_trade(a.id, b.id, a_to_amount, b_to_amount)?;
            }
        }

        Ok(())
    }

    fn process_trade(
        &mut self,
        a: OrderId,
        b: OrderId,
        a_to_amount: Nat,
        b_to_amount: Nat,
    ) -> Result<(), OrderPlacementErr> {
        ic_cdk::println!("process trade {} {} {} {}", a, b, a_to_amount, b_to_amount);

        let Exchange {
            orders, balances, ..
        } = self;

        let mut order_a = orders.remove(&a).unwrap();
        let mut order_b = orders.remove(&b).unwrap();

        // Calculate "cost" to each
        let a_from_amount =
            (a_to_amount.to_owned() * order_a.fromAmount.to_owned()) / order_a.toAmount.to_owned();
        let b_from_amount =
            (b_to_amount.to_owned() * order_b.fromAmount.to_owned()) / order_b.toAmount.to_owned();

        // Update order with remaining tokens
        order_a.fromAmount -= a_from_amount.to_owned();
        order_a.toAmount -= a_to_amount.to_owned();

        order_b.fromAmount -= b_from_amount.to_owned();
        order_b.toAmount -= b_to_amount.to_owned();

        // Update DEX balances
        balances.subtract_balance(&order_a.owner, &order_a.from, a_from_amount.to_owned());
        balances.add_balance(&order_a.owner, &order_a.to, a_to_amount.to_owned());

        balances.subtract_balance(&order_b.owner, &order_b.from, b_from_amount.to_owned());
        balances.add_balance(&order_b.owner, &order_b.to, b_to_amount.to_owned());

        // The DEX keeps any tokens not required to satisfy the parties.
        let dex_amount_a = a_from_amount - b_to_amount;
        if dex_amount_a > utils::zero() {
            balances.add_balance(&ic_cdk::id(), &order_a.from, dex_amount_a);
        }

        let dex_amount_b = b_from_amount - a_to_amount;
        if dex_amount_b > utils::zero() {
            balances.add_balance(&ic_cdk::id(), &order_b.from, dex_amount_b);
        }

        // Maintain the order only if not empty
        if order_a.fromAmount != utils::zero() {
            orders.insert(order_a.id, order_a);
        }

        if order_b.fromAmount != utils::zero() {
            orders.insert(order_b.id, order_b);
        }

        Ok(())
    }

    fn next_id(&mut self) -> OrderId {
        self.next_id += 1;
        self.next_id
    }
}

fn check_orders(
    first: Order,
    second: Order,
    first_to_amount: &mut Nat,
    second_to_amount: Nat,
) -> bool {
    if *first_to_amount == utils::zero() && second_to_amount > utils::zero() {
        *first_to_amount = second.fromAmount;
        // Verify that we can complete the partial order with natural number tokens remaining.
        if ((first_to_amount.to_owned() * first.fromAmount) % first.toAmount) != utils::zero() {
            return true;
        }
    }

    false
}
