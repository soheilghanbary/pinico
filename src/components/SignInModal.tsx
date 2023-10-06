"use client"

import { Icons } from "@components/icons"
import { supabase } from "@lib/supabase"
import { Button } from "@ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog"

export const SignInModal = () => (
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
        <Button
          onClick={() => supabase.auth.signInWithOAuth({ provider: "github" })}
        >
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
