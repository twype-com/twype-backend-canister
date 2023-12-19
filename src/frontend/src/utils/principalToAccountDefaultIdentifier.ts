/* eslint-disable @typescript-eslint/no-explicit-any */
import { Principal } from '@dfinity/principal'
import { sha224 } from 'js-sha256'
import { asciiStringToByteArray } from './asciiStringToByteArray'
import { calculateCrc32 } from './calculateCrc32'
import { toHexString } from './toHexString'

export const principalToAccountDefaultIdentifier = (principal: Principal) => {
  // Hash (sha224) the principal, the subAccount and some padding
  const padding = asciiStringToByteArray('\x0Aaccount-id')

  const shaObj = sha224.create()
  shaObj.update([...padding, ...principal.toUint8Array(), ...Array(32).fill(0)])
  const hash = new Uint8Array(shaObj.array())

  // Prepend the checksum of the hash and convert to a hex string
  const checksum = calculateCrc32(hash)
  const bytes = new Uint8Array([...checksum, ...hash])

  return toHexString(bytes)
}
