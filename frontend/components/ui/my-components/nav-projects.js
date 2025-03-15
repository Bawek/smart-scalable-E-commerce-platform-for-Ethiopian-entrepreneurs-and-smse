"use client"

import {
    Edit,
    Folder,
    Forward,
    MoreHorizontal,
    Trash2,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
    
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavProjects({
    projects,
}) {
    const { isMobile } = useSidebar()

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Templates</SidebarGroupLabel>
            <SidebarMenu className="m-0 p-0">
                {projects.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                            <Link className="no-underline text-black" href={item.url}>
                                <item.logo />
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction showOnHover>
                                    <MoreHorizontal />
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-48 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align={isMobile ? "end" : "start"}
                            >
                                <DropdownMenuItem>
                                    <Folder className="text-muted-foreground" />
                                    <Link href={"#"} className="no-underline text-black">View Template</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Forward className="text-muted-foreground" />
                                    <Link href={"#"} className="no-underline text-black">Share Template</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Edit className="text-muted-foreground" />
                                    <Link href={"#"} className="no-underline text-black">edit Template</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                        <MoreHorizontal className="text-sidebar-foreground/70" />
                        <span>More</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}
