import React from 'react';
import { auth, signOut } from '@/auth/auth';
const page = async () => {
  const session = await auth();
  return (
    <div>
      {
        JSON.stringify(session)
      }
      <form action={async (e) => {
        "use server";
        await signOut();
      }}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}

export default page