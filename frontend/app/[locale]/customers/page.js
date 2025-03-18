import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BarChart, Briefcase, Sparkle } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full">
        <div className="absolute -top-6 inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTNX9Ue8J76ewDvizaMlsgIqNuW8Ko9K3WQ&s')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white lg:text-6xl">
              Empower Your Online Business Journey
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-white">
              Discover a vibrant marketplace where diverse businesses flourish together,
              offering a rich array of products and services.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button className="hover:opacity-90 hover:bg-orange-800 bg-orange-700" size="lg">Explore Shops</Button>
              <Button className="hover:opacity-90 hover:bg-orange-800 bg-orange-700" size="lg">Create Your Shop</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-bold text-foreground">
            What Makes Us Different
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <Sparkle className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Grow Your Business</h3>
                <p className="mt-2 text-muted-foreground">
                  Get immediate exposure with your first upload. Reach thousands of customers
                  from day one with our powerful platform.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <Briefcase className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Build Your Brand</h3>
                <p className="mt-2 text-muted-foreground">
                  Present yourself professionally with customizable templates and
                  powerful store management tools.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <BarChart className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Track Performance</h3>
                <p className="mt-2 text-muted-foreground">
                  Advanced statistics and insights help you understand your business
                  growth and customer engagement.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative flex items-center justify-center h-[600px] w-full ">
        <div className="absolute -top-6 inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxUWn5FZZw3cv7if0WqY7RcpS-k9LwyY0uFg&s')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white">
              Start Your E-Commerce Journey Today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white">
              Join hundreds of Ethiopian businesses already growing their sales online
            </p>
            <div className="mt-8">
              <Button className="hover:opacity-90 px-10 hover:bg-orange-800 bg-orange-700" size="lg">Get Started</Button>
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}

