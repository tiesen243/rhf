import type { NextPage } from 'next'

import { SignupForm } from '@/components/signup-form'

const Page: NextPage = () => (
  <main className="container flex min-h-dvh flex-col items-center justify-center gap-4">
    <h1 className="text-4xl font-bold">React Hook Form with Next.js</h1>

    <SignupForm />
  </main>
)

export default Page
