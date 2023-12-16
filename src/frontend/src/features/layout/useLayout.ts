import { createBreakpoint, useMedia } from 'react-use'
import bp from '@/styles/_breakpoints.module.scss'

export function useLayout() {
  const useBreakpoint = createBreakpoint({
    desktop: Number(bp.bpDesktop),
    tablet: Number(bp.bpTablet),
    mobile: Number(bp.bpMobile),
  })
  const breakpoint = useBreakpoint()

  const isSmallMobile = useMedia(`(max-width: ${bp.bpMobilePx})`)

  return {
    breakpoint,
    isSmallMobile,
  }
}
