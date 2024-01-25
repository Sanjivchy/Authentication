import React from 'react';
import { auth, signOut } from '@/auth/auth';
import { Button } from '@/components/ui/button';
const page = async () => {
  const session = await auth();
  return (
    <div className='p-6'>
      <pre>
        {
          JSON.stringify(session, null, 2)
        }
      </pre>
      <form action={async (e) => {
        "use server";
        await signOut();
      }}>
        <Button type="submit">Logout</Button>
      </form>
    </div>
  )
}

export default page