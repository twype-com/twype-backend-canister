export const canLink = (url: string) => {
  const localCanisterId = localStorage.getItem('canisterId')
  if (import.meta.env.VITE_DFX_NETWORK === 'local' && localCanisterId) {
    return `${url}?canisterId=${localCanisterId}`
  }
  return url
}
