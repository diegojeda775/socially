"use client"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "./ModeToggle"
import { BellIcon, HomeIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react"
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs"
import { Button } from "./ui/button"
import Link from "next/link"
import { useCallback, useState } from "react"

function MobileNavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn, sessionId, userId } = useAuth();

  const closeMenu = useCallback(() => {
    setShowMobileMenu(false)
  }, [])
  return (
    <div className="md:hidden items-center space-x-2">
      <ModeToggle />
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5"/>
          </Button>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-[300px]" aria-describedby={undefined}>
        <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button variant="ghost" className="flex items-center gap-3 justify-start" onClick={closeMenu} asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>
            {isSignedIn ? (
              <>
                <Button variant="ghost" className="flex items-center gap-3 justify-start" onClick={closeMenu} asChild>
                  <Link href="/notifications">
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                </Button>
                <Button variant="ghost" className="flex items-center gap-3 justify-start" onClick={closeMenu} asChild>
                  <Link href="/profile">
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <SignOutButton>
                  <Button variant="ghost" className="flex items-center gap-3 justify-start w-full" onClick={closeMenu}>
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" className="w-full" onClick={closeMenu}>
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>

    </div>
  )
}

export default MobileNavBar