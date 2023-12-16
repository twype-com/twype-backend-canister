export const shortenAddress = (str?: string) => {
  if (!str) return ''
  return `${str.slice(0, 5)}...${str.slice(-5)}`
}

export const buildAvatar = (str?: string) => {
  if (!str) return ''
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${str}`
}
