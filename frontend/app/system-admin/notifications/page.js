'use client'
import React, { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Trash2, Bell } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useNotifications } from '@/hooks/useNotifications'
import NotificationWidget from '@/app/components/systemAdmin/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { selectNotifications } from '@/lib/features/notification/notificationSlice'

const AdminNotificationList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications) || [];
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    loadNotifications()
  }, [])

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Error loading notifications: {error}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mt-0 pt-0 mx-auto bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200">
        <h2 className="text-lg sticky top-1 font-semibold flex items-center justify-center gap-2">
          <Bell className="h-5 w-5 text-blue-600" />
          Notifications
          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {notifications?.admin?.filter(n => !n.read).length} unread
          </span>
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="p-4">
              <Skeleton className="h-4 w-[200px] mb-2" />
              <Skeleton className="h-3 w-[300px] mb-2" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          ))
        ) : notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No notifications available
          </div>
        ) : (
          <div className='w-1/2 mx-auto'>
            <NotificationWidget />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminNotificationList