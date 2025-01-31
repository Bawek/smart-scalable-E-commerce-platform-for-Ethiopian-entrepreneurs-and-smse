"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // If using Next.js
// import { useNavigate } from 'react-router-dom'; // If using React Router
import { toast } from 'react-hot-toast';

const useCheckUnauthorized = (error) => {
  const router = useRouter(); 

  useEffect(() => {
    if (error?.status === 401) {
      toast.error('Unauthorized access. Redirecting to login...');
      router.push('/auth/login'); 
    }
  }, [error, router]);
};

export default useCheckUnauthorized;