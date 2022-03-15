/**
 * https://github.com/vercel/next.js/discussions/13356
 */
 import { useState, useEffect } from 'react'
 import { useMediaQuery } from 'react-responsive'
 
 function useResponsive() {
   const [isClient, setIsClient] = useState(false)
 
   const isMobile = useMediaQuery({
     maxWidth: '640px',
   })
 
   const isNotMobile = useMediaQuery({
     minWidth: '641px',
   })
 
   const isTabletPotrait = useMediaQuery({
     maxWidth: '770px',
   })
 
   const isTablet = useMediaQuery({
     maxWidth: '1024px',
   })
 
   const isDesktop = useMediaQuery({
     minWidth: '1024px',
   })
 
   useEffect(() => {
     if (typeof window !== 'undefined') setIsClient(true)
   }, [])
 
   return {
     isDesktop: isClient ? isDesktop : true,
     isTablet: isClient ? isTablet : false,
     isTabletPotrait: isClient ? isTabletPotrait : false,
     isMobile: isClient ? isMobile : false,
     isNotMobile: isClient ? isNotMobile : false,
   }
 }
 
 export default useResponsive
 