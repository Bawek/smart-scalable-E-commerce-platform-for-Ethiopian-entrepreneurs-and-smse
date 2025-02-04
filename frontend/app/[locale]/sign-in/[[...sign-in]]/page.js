import { SignIn } from '@clerk/nextjs'
import Auth from '../../layouts/Auth'

export default function Page() {
    return (
        <Auth>
            <div className='flex justify-center items-center'>
                <SignIn />
            </div>
        </Auth>
    )
}