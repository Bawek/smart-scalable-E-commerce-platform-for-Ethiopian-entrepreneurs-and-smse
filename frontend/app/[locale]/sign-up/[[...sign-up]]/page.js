import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='w-full min-h-screen flex justify-center items-center'>
            <div className='py-5'>
            <SignUp redirectUrl='/en' />
            </div>
        </div>
    )
}