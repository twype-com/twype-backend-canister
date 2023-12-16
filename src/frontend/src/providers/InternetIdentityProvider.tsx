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

const { idlFactory: twypeTokenIdlFactory } = twypeTokenDid as any
const { idlFactory: ledgerIdlFactory } = ledgerDid as any

const canisters = [{
  symbol: "ICP",
  canisterName: "ICP",
  canisterId: import.meta.env.VITE_LEDGER_CANISTER_ID
}]

export const InternetIdentityContext = createContext<{
  client: null | AuthClient
  login: null | (() => Promise<void>)
  principal: null | Principal
  actor: any
  twypeTokenActor: any
  ledgerActor: any
}>({
  client: null,
  login: null,
  principal: null,
  actor: null,
  twypeTokenActor: null,
  ledgerActor: null,
})

export const InternetIdentityProvider: FC<PropsWithChildren> = ({ children }) => {
  const [client, setClient] = useState<null | AuthClient>(null)
  const [principal, setPrincipal] = useState<null | Principal>(null)
  const [actor, setActor] = useState<null | any>(null)
  const [twypeTokenActor, setTwypeTokenActor] = useState<null | any>(null)
  const [ledgerActor, setLedgerActor] = useState<null | any>(null)

  useEffect(() => {
    AuthClient.create().then((client) => setClient(client))
  }, [])

  const handleAuth = useCallback(async () => {
    if (client) {
      const identity = client.getIdentity()
      const principal = identity.getPrincipal()

      setPrincipal(principal)

      const actor = createActor(identity)

      setActor(actor)

      const agent = new HttpAgent({ identity, host: 'http://localhost:8000/' })

      if (import.meta.env.VITE_DFX_NETWORK === "local") agent.fetchRootKey();

      const twypeTokenActor = createCanisterActor(agent, twypeTokenIdlFactory, import.meta.env.VITE_TWYPE_TOKEN_CANISTER_ID)

      const ledgerActor = createCanisterActor(agent, ledgerIdlFactory, import.meta.env.VITE_LEDGER_CANISTER_ID)

      setTwypeTokenActor(twypeTokenActor)
      setLedgerActor(ledgerActor)

      console.log(identity, principal.toString(), actor, twypeTokenActor)
    }
  }, [client])

  useEffect(() => {
    (async () => {
      if (await client?.isAuthenticated()) {
        handleAuth()
      }
    })()
  }, [client])

  const login = useCallback(async () => {
    if (client) {
      await client.login({
        identityProvider: `http://${import.meta.env.VITE_INTERNET_IDENTITY_CANISTER_ID}.localhost:8000/#authorize`,
      })

      handleAuth()
    }
  }, [client, handleAuth])

  useEffect(() => {
    (async () => {
      if (twypeTokenActor && ledgerActor && principal) {
        // Create a balances array and set the userBalance store object
        const balances = [];
        console.log("Fetching all user balances");
        const allUserBalances = await twypeTokenActor.getBalances();
        console.log("User Balances: ", allUserBalances);

        const rt1Balance = await twypeTokenActor.getRTBalance(1);

        let ledgerBalance = 0;

        const approved = await ledgerActor.account_balance({
          account: hexToBytes(principalToAccountDefaultIdentifier(principal)),
        });

        if (approved.e8s) {
          ledgerBalance = approved.e8s;
        }

        for (let i = 0; i < canisters.length; i++) {
          const principal = Principal.fromText(canisters[i].canisterId);
          let token;
          if (allUserBalances.length) {
            token = allUserBalances.find((bal: any) => {
              return bal.token.toString() === principal.toString();
            });
          }

          const dexBalance = token ? token.amount : 0;

          balances.push({
            name: canisters[i].canisterName,
            symbol: canisters[i].symbol,
            canisterBalance: ledgerBalance,
            dexBalance: dexBalance,
            principal: principal,
            roomBalance: rt1Balance,
          });
        }

        // Update the store values
        console.log("User Balances: ", balances);
      }
    })()
  }, [twypeTokenActor, ledgerActor, principal])

  return (
    <InternetIdentityContext.Provider value={{ client, login, principal, actor, twypeTokenActor, ledgerActor }}>
      {children}
    </InternetIdentityContext.Provider>
  )
}
