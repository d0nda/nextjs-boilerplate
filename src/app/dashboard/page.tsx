import React from 'react'
import { auth } from "../../../auth"
import { redirect } from 'next/navigation'
import SignedIn from '@/components/signedin'


export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/signin')
  }

  return (
    <div className="p-4">
      <SignedIn />
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {session?.user?.name || 'User'}</p>
      <p>Your email: {session?.user?.email}</p>
      {/* Add your dashboard content here */}
    </div>
  )
}