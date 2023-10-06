import Link from "next/link"
import { Logo } from "@components/Logo"
import { CreatePinModal } from "@components/pin/CreatePinModal"
import { SignInModal } from "@components/SignInModal"
import { ThemeToggle } from "@components/ThemeToggle"

interface SiteLinkProps {
  label: string
  href: string
}

const SiteLink = ({ label, href }: SiteLinkProps) => (
  <li>
    <Link
      className="rounded-md p-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
      href={href}
    >
      {label}
    </Link>
  </li>
)

export const SiteHeader = () => {
  return (
    <header className="flex items-center justify-between rounded-lg">
      <Logo />
      <ul className="flex flex-1 items-center justify-center">
        <SiteLink href={"/"} label={"Home"} />
        <SiteLink href={"/search"} label={"Browse"} />
        <SiteLink href={"/blog"} label={"Blog"} />
        <SiteLink href={"/about"} label={"About"} />
      </ul>
      <nav className="flex items-center space-x-4">
        <ThemeToggle />
        <SignInModal />
        <CreatePinModal />
      </nav>
    </header>
  )
}
