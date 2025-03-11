'use client'
import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle,DialogDescription } from "@/components/ui/dialog";
import { profileLinks } from '../data/nav-links';

const ProfileMenu = () => {
  const [openDialog, setOpenDialog] = useState(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img 
            alt="User Profile" 
            className="min-w-7 max-w-10 min-h-7 max-h-10 rounded-full border-none shadow-lg" 
            src="/img/team-1-800x800.jpg" 
          />
        </DropdownMenuTrigger>
        
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {profileLinks.map((link) => (
            <DropdownMenuItem 
              key={link.title}
              className="cursor-pointer"
              onClick={() => setOpenDialog(link.title)}
            >
              {link.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {profileLinks.map((link) => (
        <Dialog key={link.title} open={openDialog === link.title} onOpenChange={() => setOpenDialog(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{link.title}</DialogTitle>
              <DialogDescription>
                {link.description || "Manage your account settings"}
              </DialogDescription>
            </DialogHeader>
            {link.dialogContent}
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
};

export default ProfileMenu;
