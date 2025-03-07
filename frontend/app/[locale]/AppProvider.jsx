'use client'

import { makeStore } from '@/lib/store'
import { useRef, useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '@/lib/store' // Import the persistor from your store configuration

export default function AppProvider({ children }) {
  const storeRef = useRef()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Once the component is mounted, set the state to indicate hydration
    setIsHydrated(true)
  }, [])

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  if (!isHydrated) {
    // Render nothing until Redux persist is ready
    return null
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
