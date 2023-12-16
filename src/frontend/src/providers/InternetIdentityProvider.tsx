/* eslint-disable @typescript-eslint/no-explicit-any */
import { createActor } from '@utils/createActor'
import { createCanisterActor } from '@utils/createCanisterActor'
import { AuthClient } from '@dfinity/auth-client'
import { Principal } from '@dfinity/principal'
import { HttpAgent } from '@dfinity/agent'
import { FC, PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react'

export const InternetIdentityContext = createContext<{
  client: null | AuthClient
  login: null | (() => Promise<void>)
  principal: null | Principal
  actor: any
  twypeTokenActor: any
}>({
  client: null,
  login: null,
  principal: null,
  actor: null,
  twypeTokenActor: null,
})

export const InternetIdentityProvider: FC<PropsWithChildren> = ({ children }) => {
  const [client, setClient] = useState<null | AuthClient>(null)
  const [principal, setPrincipal] = useState<null | Principal>(null)
  const [actor, setActor] = useState<null | any>(null)
  const [twypeTokenActor, setTwypeTokenActor] = useState<null | any>(null)

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

      const twypeTokenActor = createCanisterActor(agent, 'bd3sg-teaaa-aaaaa-qaaba-cai')

      setTwypeTokenActor(twypeTokenActor)

      console.log(identity, principal, actor, twypeTokenActor)
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
        identityProvider: 'http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:8000/#authorize',
      })

      handleAuth()
    }
  }, [client, handleAuth])

  useEffect(() => {
    if (twypeTokenActor) {
      twypeTokenActor
        .getBalances()
        .then((balances: any) => console.log(balances, 'balances'))
        .catch((err: any) => console.log(err, 'balances'))
    }
  }, [twypeTokenActor])

  return (
    <InternetIdentityContext.Provider value={{ client, login, principal, actor, twypeTokenActor }}>
      {children}
    </InternetIdentityContext.Provider>
  )
}
