"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { selectNotifications } from "@/lib/features/notification/notificationSlice"
import { useSelector } from "react-redux"
import { imageViewer } from "@/app/system-admin/lib/imageViewer"

export function NavUser({
  user,
  logout
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const notifications = useSelector(selectNotifications)
  return (
    <SidebarMenu className="m-0 p-0">
      <SidebarMenuItem>
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.firestName}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={imageViewer(user?.profileUrl)} alt={user.firestName} />
                <AvatarFallback className="rounded-lg">{user.firestName ? user?.firestName.slice(0, 2).toUpperCase() || 'UR' : 'UR'}</AvatarFallback>
              </Avatar>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-lg"
            side={isMobile ? "bottom" : "bottom"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={imageViewer(user?.profileUrl)} alt={user.firestName} />
                  <AvatarFallback className="rounded-lg">{user.firestName ? user?.firestName.slice(0, 2).toUpperCase() : 'UR'}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.firestName}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => router.push('/merchant/manage-account')}
              >
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/merchant/notification")}
                className="cursor-pointer flex items-center justify-between px-3 py-2 hover:bg-amber-50 dark:hover:bg-neutral-800 transition-colors rounded-md">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-medium">Notifications</span>
                </div>
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-amber-600 rounded-full">
                  {notifications?.length || 0}
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
