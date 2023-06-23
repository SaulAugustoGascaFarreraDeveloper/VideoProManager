import { useEffect, useState } from 'react';
import {useUser} from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router';
import UploadVideoForm from "./uploadVideoForm"
import Link from 'next/link';

export default function Home() {
 
  const {user} = useUser()
  const router = useRouter()

  //console.log("USER INDEX --> ",user)

  return (
    <>
      <div>VP Manager</div>

      {!!user ? (
        <>
          <UploadVideoForm />
        </>
      ) : (
        <>
          <Link href="/api/auth/login">Login</Link>
        </>
      )}
      
    </>
  );
}
