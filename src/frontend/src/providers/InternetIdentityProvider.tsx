/* eslint-disable @typescript-eslint/no-explicit-any */
import { createActor } from '@utils/createActor'
import { createCanisterActor } from '@utils/createCanisterActor'
import { AuthClient } from '@dfinity/auth-client'
import { Principal } from '@dfinity/principal'
import { HttpAgent } from '@dfinity/agent'
import { FC, PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react'
import * as twypeTokenDid from '../../../declarations/twype_token/twype_token.did.js'
import * as ledgerDid from '../../../declarations/ledger/ledger.did.js'
import { principalToAccountDefaultIdentifier } from '@/utils/principalToAccountDefaultIdentifier'
import { hexToBytes } from '@/utils/hexToBytes'
import { useQuery } from '@tanstack/react-query'

const { idlFactory: twypeTokenIdlFactory } = twypeTokenDid as any
const { idlFactory: ledgerIdlFactory } = ledgerDid as any

const canister = {
  symbol: "ICP",
  canisterName: "ICP",
  canisterId: import.meta.env.VITE_LEDGER_CANISTER_ID
}

export const InternetIdentityContext = createContext<{
  client: null | AuthClient
  login: null | (() => Promise<void>)
  principal: null | Principal
  actor: any
  twypeTokenActor: any
  ledgerActor: any
  balance: any
  deposit: any
  withdraw: any,
}>({
  client: null,
  login: null,
  principal: null,
  actor: null,
  twypeTokenActor: null,
  ledgerActor: null,
  balance: null,
  deposit: null,
  withdraw: null,
})

export const InternetIdentityProvider: FC<PropsWithChildren> = ({ children }) => {
  const [principal, setPrincipal] = useState<null | Principal>(null)
  const [address, setAddress] = useState<null | string>(null)
  const [actor, setActor] = useState<null | any>(null)
  const [twypeTokenActor, setTwypeTokenActor] = useState<null | any>(null)
  const [ledgerActor, setLedgerActor] = useState<null | any>(null)
  const [balance, setBalance] = useState<null | any>(null)

  const initAuthClient = useCallback(async () => {
    return await AuthClient.create();
  }, [])

  const { data: client } = useQuery({
    queryKey: ['authClient'],
    queryFn: initAuthClient,
    initialData: null
  })
  
  const initializeInternetIdentity = useCallback(async () => {
    if (!client) return;

    const identity = client.getIdentity()
    const principal = identity.getPrincipal()

    setPrincipal(principal)

    const actor = createActor(identity)

    setActor(actor)

    const agent = new HttpAgent({ identity, host: 'http://localhost:8000/' })

    if (import.meta.env.VITE_DFX_NETWORK === "local") agent.fetchRootKey();

    const twypeTokenActor = createCanisterActor(agent, twypeTokenIdlFactory, import.meta.env.VITE_TWYPE_TOKEN_CANISTER_ID)

    const address = await twypeTokenActor.getDepositAddress();

    setAddress(address as string)

    const ledgerActor = createCanisterActor(agent, ledgerIdlFactory, import.meta.env.VITE_LEDGER_CANISTER_ID)

    setTwypeTokenActor(twypeTokenActor)

    setLedgerActor(ledgerActor)
  }, [client])

  useEffect(() => {
    (async () => {
      if (await client?.isAuthenticated()) {
        initializeInternetIdentity()
      }
    })()
  }, [client])

  const login = useCallback(async () => {
    if (client) {
      await client.login({
        identityProvider: `http://${import.meta.env.VITE_INTERNET_IDENTITY_CANISTER_ID}.localhost:8000/#authorize`,
      })

      initializeInternetIdentity()
    }
  }, [client, initializeInternetIdentity])

  const fetchUserBalance = useCallback(async () => {
    if (!twypeTokenActor || !ledgerActor || !principal) return null;

    const allUserBalances = await twypeTokenActor.getBalances();

    const rt1Balance = await twypeTokenActor.getRTBalance(1);

    let ledgerBalance = 0;

    const approved = await ledgerActor.account_balance({
      account: hexToBytes(principalToAccountDefaultIdentifier(principal)),
    });

    if (approved.e8s) {
      ledgerBalance = approved.e8s;
    }

    const canisterPrincipal = Principal.fromText(canister.canisterId);
    let token;

    if (allUserBalances.length) {
      token = allUserBalances.find((bal: any) => {
        return bal.token.toString() === canisterPrincipal.toString();
      });
    }

    const dexBalance = token ? token.amount : 0;

    setBalance({
      name: canister.canisterName,
      symbol: canister.symbol,
      canisterBalance: ledgerBalance,
      dexBalance: dexBalance,
      canisterPrincipal: canisterPrincipal,
      roomBalance: rt1Balance,
    })
  }, [twypeTokenActor, ledgerActor, principal])

  useEffect(() => {
    fetchUserBalance()
  }, [fetchUserBalance])

  console.log(balance)

  const deposit = useCallback(async (amount: number) => {
    if (!ledgerActor || !balance || !address || !twypeTokenActor) return

    // transfer ICP correct subaccount on DEX
    await ledgerActor.transfer({
      memo: BigInt(0x1),
      amount: { e8s: amount },
      fee: { e8s: 10000 },
      to: address,
      from_subaccount: [],
      created_at_time: [],
    });

    const response = await twypeTokenActor.deposit(balance?.canisterPrincipal);

    // queryClient.invalidateQueries({
    //   queryKey: ['balance']
    // })
    await fetchUserBalance()

    return response;
  }, [ledgerActor, address, twypeTokenActor, balance, fetchUserBalance])

  const withdraw = useCallback(async (amount: number) => {
    if (!ledgerActor || !balance || !principal || !address || !twypeTokenActor) return
    
    const response = await twypeTokenActor.withdraw(
      balance.canisterPrincipal,
      amount,
      principal
    );

    await fetchUserBalance()

    return response;
  }, [ledgerActor, balance, principal, address, twypeTokenActor, fetchUserBalance])

  return (
    <InternetIdentityContext.Provider value={{ client, login, principal, actor, twypeTokenActor, ledgerActor, balance, deposit, withdraw }}>
      {children}
    </InternetIdentityContext.Provider>
  )
}
