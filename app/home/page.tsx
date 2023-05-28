'use client';
import { useSession } from "next-auth/react"

export default function HomePage() {
  const session = useSession();

  console.log(session);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          logged in
        </h1>
      </div>
    </section>
  )
}