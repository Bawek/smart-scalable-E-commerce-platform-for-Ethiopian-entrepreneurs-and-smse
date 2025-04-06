import React from 'react'
import logo from '../../../public/logos/projectlogo.png'

const Logo = () => {
    return (
        <img
            src={logo || "projectlogo.png"}
            alt="logo"
        />
    )
}

export default Logo
