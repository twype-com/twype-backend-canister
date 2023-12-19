import { Buffer } from 'buffer'
import crc from 'crc'

// 4 bytes
export const calculateCrc32 = (bytes: Uint8Array) => {
  const checksumArrayBuf = new ArrayBuffer(4)
  const view = new DataView(checksumArrayBuf)
  view.setUint32(0, crc.crc32(Buffer.from(bytes)), false)
  return Buffer.from(checksumArrayBuf)
}
