import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function Home() {
  const technologies = [
    { name: "Next-Auth", description: "Authentication", logo: "/Next-auth.png?height=80&width=80" },
    { name: "Prisma", description: "ORM", logo: "/prisma.png?height=80&width=80" },
    { name: "Resend", description: "Email", logo: "/Resend.png?height=80&width=80" },
    { name: "PayPal", description: "Payment", logo: "/paypal.png?height=80&width=80" },
    { name: "Tailwind", description: "CSS Framework", logo: "/tailwind.png?height=80&width=80" },
    { name: "Shadcn/ui", description: "UI", logo: "/shadcnui.png?height=80&width=80" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">BOILERPLATE</div>
          
        </nav>
      </header>

      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 leading-tight">
            BOILER<wbr/>PLATE
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
            Jumpstart your project with our comprehensive boilerplate, featuring cutting-edge technologies for a seamless development experience.
          </p>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <Image src={tech.logo} alt={`${tech.name} logo`} width={80} height={80} className="rounded-full" />
                  <CardTitle className="text-2xl font-bold">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold">BOILERPLATE</h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              All company logos and trademarks belong to their respective owners. Used for illustrative purposes only.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}