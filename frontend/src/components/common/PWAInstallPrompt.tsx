import { useEffect, useState } from 'react'
import { usePWAInstall } from '../../hooks/usePWAInstall'
import InstallAppModal from './InstallAppModal'

export default function PWAInstallPrompt() {
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall()
  const [showPrompt, setShowPrompt] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if user has dismissed the prompt before
    const hasDismissed = localStorage.getItem('pwa-install-dismissed')
    if (hasDismissed) {
      setDismissed(true)
      return
    }

    // Show prompt if app is installable and not already installed
    if (isInstallable && !isInstalled && !dismissed) {
      // Delay showing the prompt by 3 seconds after page load
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isInstallable, isInstalled, dismissed])

  const handleInstall = async () => {
    const installed = await promptInstall()
    if (installed) {
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDismissed(true)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  if (!showPrompt || isInstalled) {
    return null
  }

  return (
    <InstallAppModal
      isOpen={showPrompt}
      onClose={handleDismiss}
      onInstall={handleInstall}
    />
  )
}

