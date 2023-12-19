import { useContext } from 'react'
import { InternetIdentityContext } from '@/providers/InternetIdentityProvider'

export const useInternetIdentity = () => useContext(InternetIdentityContext)
