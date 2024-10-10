'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CiMail } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signIn('email', { email, callbackUrl: '/dashboard' })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Choose your preferred sign in method</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <CiMail className="mr-2 h-4 w-4" />
              Sign in with Email
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full"
            variant="outline"
          >
            <FaGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
          <Button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="w-full"
            variant="outline"
          >
            <FiGithub className="mr-2 h-4 w-4" />
            Sign in with GitHub
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}