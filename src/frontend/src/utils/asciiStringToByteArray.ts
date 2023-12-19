export const asciiStringToByteArray = (text: string) => {
  return Array.from(text).map(c => c.charCodeAt(0))
}
