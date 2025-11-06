// Mobile-specific utility functions

/**
 * Check if device is mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * Check if device is iOS
 */
export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
}

/**
 * Check if device is Android
 */
export const isAndroid = (): boolean => {
  if (typeof window === 'undefined') return false
  return /Android/.test(navigator.userAgent)
}

/**
 * Get safe area insets for notched devices
 */
export const getSafeAreaInsets = () => {
  if (typeof window === 'undefined') return { top: 0, right: 0, bottom: 0, left: 0 }
  
  const style = getComputedStyle(document.documentElement)
  return {
    top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
    right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0'),
    bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
    left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0'),
  }
}

/**
 * Prevent body scroll (for modals)
 */
export const preventBodyScroll = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
}

/**
 * Allow body scroll
 */
export const allowBodyScroll = () => {
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.width = ''
}

/**
 * Get viewport height (accounting for mobile browser UI)
 */
export const getViewportHeight = (): number => {
  if (typeof window === 'undefined') return 0
  return window.innerHeight || document.documentElement.clientHeight
}

/**
 * Scroll to top smoothly
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/**
 * Vibrate device (if supported)
 */
export const vibrate = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

