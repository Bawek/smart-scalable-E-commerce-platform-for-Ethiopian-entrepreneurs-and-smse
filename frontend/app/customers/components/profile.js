'use client'
import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { profileLinks } from '../data/nav-links';
import { useDispatch, useSelector } from 'react-redux';
import { imageViewer } from '@/app/system-admin/lib/imageViewer';
import { useLogout } from '@/util/userLogout';
import { logOut } from '@/lib/features/auth/accountSlice';

const ProfileMenu = () => {
  const [openDialog, setOpenDialog] = useState(null);
  const account = useSelector((state) => state.account)
  const dispatch = useDispatch()
  const logout = useLogout()
  console.log(account?.profileUrl,'url')
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            alt="User Profile"
            className="w-10 h-10 rounded-full border-none shadow-lg"
            src={imageViewer(account?.profileUrl) || '/img/team-1-800x800.jpg'}
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
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              return dispatch(logOut())
            }}>
            logout
          </DropdownMenuItem>
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
