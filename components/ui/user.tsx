"use client"
import Link from "next/link"
import { UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function ProfileToggle() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      toast.success("Signed out successfully")
      router.refresh() // Force refresh to update UI immediately
    } catch {
      toast.error("Failed to sign out. Please try again.")
    }
  }

  if (isPending) {
    return (
      <Button variant="outline" size="icon" disabled>
        <UserRound className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading...</span>
      </Button>
    )
  }

  console.log(session)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <UserRound className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">User Profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {session ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/account">Account Settings</Link>
            </DropdownMenuItem>
            {session.user.isAdmin && (
              <DropdownMenuItem asChild>
                <Link href="/admin">Admin Dashboard</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleSignOut} aria-label="Sign out">
              Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login">Log In</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/signup">Sign Up</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
