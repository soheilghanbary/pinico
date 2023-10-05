import Link from "next/link"
import { Icons } from "@components/icons"
import { Logo } from "@components/Logo"
import { CreatePinModal } from "@components/pin/CreatePinModal"
import { ThemeToggle } from "@components/ThemeToggle"
import { Button } from "@ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog"

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
    <header className="flex items-center justify-between">
      <Logo />
      <ul className="flex flex-1 items-center justify-center">
        <SiteLink href={"/"} label={"Home"} />
        <SiteLink href={"/search"} label={"Browse"} />
        <SiteLink href={"/blog"} label={"Blog"} />
        <SiteLink href={"/about"} label={"About"} />
      </ul>
      <nav className="flex items-center space-x-4">
        <ThemeToggle />
        {/* <SignIn /> */}
        <CreatePinModal />
      </nav>
    </header>
  )
}

const SignIn = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button rounded>
        <Icons.login className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-sm">
      <DialogHeader>
        <DialogTitle className="text-center">Welcome Back</DialogTitle>
        <DialogDescription className="text-center">
          Sign in your account
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4">
        <Button>
          <Icons.github className="mr-2 h-4 w-4" />
          Github
        </Button>
        <Button variant={"outline"}>
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
    </DialogContent>
  </Dialog>
)
