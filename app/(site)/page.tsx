import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import RegistrationForm from "@/components/registration/registrationForm"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {siteConfig.name}
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          {siteConfig.description}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <RegistrationForm />
      </div>
    </section>
  )
}
