/* eslint-disable @typescript-eslint/no-explicit-any */
export const hexToBytes = (hex: string) => {
  const bytes: any[] = []

  for (let c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16))

  return bytes
}
