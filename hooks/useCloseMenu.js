import { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import useResponsive from './useResponsive'

export default function useCloseMenu() {
  const { showNavbarMenu } = useStoreState((state) => state)
  const { toggleShowNavbarMenu } = useStoreActions((action) => action)
  const { isTablet } = useResponsive()
  useEffect(() => {
    if (showNavbarMenu) {
      toggleShowNavbarMenu(false)
      if (isTablet) {
        document.querySelector('.triangle-menu').style.opacity = 0
      }
    }
  }, [])
}
