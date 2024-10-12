'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CiMail } from "react-icons/ci"
import { FiGithub } from "react-icons/fi"
import { FaGoogle } from "react-icons/fa"
import { Loader2 } from "lucide-react"

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('')

  const resendAction = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await signIn("resend", { 
        email, 
        redirect: false,
        callbackUrl: '/dashboard'
      })
      if (result?.error) {
        console.error(result.error)
        // Handle error (e.g., show error message to user)
      } else {
        setEmailSent(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Choose your preferred sign in method</CardDescription>
        </CardHeader>
        <CardContent>
          {emailSent ? (
            <div className="text-center">
              <p className="mb-4">Check your email</p>
              <p>We&apos;ve sent a sign-in link to {email}</p>
            </div>
          ) : (
            <form onSubmit={resendAction}>
              <Input
                type="email"
                id="email-resend"
                name="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>
                    <CiMail className="mr-2 h-4 w-4" />
                    Sign in with Email
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
        {!emailSent && (
          <CardFooter className="flex flex-col gap-2">
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
        )}
      </Card>
    </div>
  )
}