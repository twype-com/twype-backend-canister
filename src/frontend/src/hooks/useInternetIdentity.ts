import { InternetIdentityContext } from '@/providers/InternetIdentityProvider'
import { useContext } from 'react'

export const useInternetIdentity = () => useContext(InternetIdentityContext)
