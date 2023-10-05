import Link from "next/link"

import { Icons } from "./icons"

export const Logo = () => {
  return (
    <Link
      href={"/"}
      className="flex items-center justify-center gap-2 text-primary"
    >
      <Icons.logo size={20} />
      <h3 className="font-semibold">Pintraxer</h3>
    </Link>
  )
}
