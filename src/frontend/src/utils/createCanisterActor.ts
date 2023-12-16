/* eslint-disable @typescript-eslint/no-explicit-any */
import { Actor, HttpAgent } from '@dfinity/agent'

export const createCanisterActor = (agent: HttpAgent, idl: any, canisterId: string) => {
  return Actor.createActor(idl, {
    agent,
    canisterId,
  })
}
