'use client'

import { useLogoutMutation } from "@/lib/features/auth/accountApi"
import { logOut } from "@/lib/features/auth/accountSlice"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
export const useLogout = async (id) => {
    const dispatch = useDispatch()
    const [logout, { error, isError }] = useLogoutMutation()
    const customeLogout = async () => {
        try {
            await logout().unwrap()
            if (isError) {
                return toast.error('Sorry Please try again.')
            }
            dispatch(logOut())
        } catch (error) {
            console.log(error, 'logout error')
            toast.error('Sorry Please try again.')

        }
    }
return customeLogout
}


