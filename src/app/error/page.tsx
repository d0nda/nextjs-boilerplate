import Link from 'next/link'
import React from 'react'

export default function ErrorPage() {
    return (
      
      <main className="flex mt-40 flex-col items-center justify-between p-24">
        <p className='text-lg'>Sorry, something went wrong..</p>
        <Link className='mt-10' href='/'> Go back home</Link>
      </main>
    )
  }