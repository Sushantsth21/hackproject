import { auth ,signOut, signIn } from '@/auth'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const session = await auth();

  return (
    <header className=" px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className='flex justify-between items-center'>
        <Link href="/">
          <h1 className="text-3xl font-bold underline font-work-sans text-blue-800 ">HACKPROJECT</h1>
        </Link>

        <div className='flex items-center gap-5 text-black'>
            {session && session?.user ? (
                <>
                    <Link href="/startup/create">Create Post</Link>
                    <form action={async() => {
                        "use server";
                        await signOut({redirectTo: '/'});
                    }}><button type='submit'>Sign Out</button></form>
                    <Link href={`/users/${session?.id}`}>
                        <span>{session?.user?.name}</span>
                    </Link>

                </>
            ):(
                <form action={async() => {
                    "use server";
                    await signIn('github');
                }}>
                    <button type='submit'>Sign In</button>
                </form>
            )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar