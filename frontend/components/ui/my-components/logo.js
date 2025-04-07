import React from 'react';
import Image from 'next/image';
import logo from '../../../public/logos/projectlogo.png';

const Logo = () => {
    return (
        <Image
            src={logo || "/logos/projectlogo.png"}
            alt="logo seen"
            width={100} // Adjust width as needed
            height={50} // Adjust height as needed
            quality={100} // Optional: Set image quality for optimization
        />
    );
};

export default Logo;
