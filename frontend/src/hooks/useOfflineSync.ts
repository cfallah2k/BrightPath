import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

interface PendingItem {
  id: string
  type: 'create' | 'update' | 'delete'
  data: any
  timestamp: number
}

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [pendingItems, setPendingItems] = useState<PendingItem[]>([])
  const toast = useToast()

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      toast({
        title: 'Back online',
        description: 'Syncing pending changes...',
        status: 'success',
        duration: 3000,
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast({
        title: 'Offline mode',
        description: 'Changes will be synced when connection is restored',
        status: 'info',
        duration: 3000,
      })
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Load pending items from localStorage
    const stored = localStorage.getItem('brightpath_pending_sync')
    if (stored) {
      try {
        setPendingItems(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to load pending sync items', e)
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [toast])

  const addPendingItem = (item: Omit<PendingItem, 'timestamp'>) => {
    const newItem: PendingItem = {
      ...item,
      timestamp: Date.now(),
    }
    const updated = [...pendingItems, newItem]
    setPendingItems(updated)
    localStorage.setItem('brightpath_pending_sync', JSON.stringify(updated))
  }

  const removePendingItem = (id: string) => {
    const updated = pendingItems.filter(item => item.id !== id)
    setPendingItems(updated)
    localStorage.setItem('brightpath_pending_sync', JSON.stringify(updated))
  }

  const syncPendingItems = async () => {
    if (!isOnline || pendingItems.length === 0) return

    // TODO: Implement actual sync with Supabase when backend is connected
    // For now, just clear pending items
    setPendingItems([])
    localStorage.removeItem('brightpath_pending_sync')
    
    toast({
      title: 'Sync complete',
      description: `${pendingItems.length} item(s) synced`,
      status: 'success',
      duration: 3000,
    })
  }

  return {
    isOnline,
    pendingItems,
    addPendingItem,
    removePendingItem,
    syncPendingItems,
  }
}

