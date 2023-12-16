import crc from "crc";
import { Buffer } from "buffer";

// 4 bytes
export const calculateCrc32 = (bytes: Uint8Array) => {
  const checksumArrayBuf = new ArrayBuffer(4);
  const view = new DataView(checksumArrayBuf);
  view.setUint32(0, crc.crc32(Buffer.from(bytes)), false);
  return Buffer.from(checksumArrayBuf);
};