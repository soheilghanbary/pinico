import { PropsWithChildren } from "react"

import { SiteHeader } from "./SiteHeader"

export const SiteLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="container mx-auto space-y-4 p-4">
      <SiteHeader />
      {children}
    </section>
  )
}
