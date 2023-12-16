/* eslint-disable @typescript-eslint/no-explicit-any */
import { Actor, HttpAgent } from '@dfinity/agent'
import * as twypeTokenDid from '../../../declarations/twype_token/twype_token.did.js'

const { idlFactory } = twypeTokenDid as any

export const createCanisterActor = (agent: HttpAgent, canisterId: string) => {
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  })
}
