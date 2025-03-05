import React from 'react'
import { ModeToggle } from './ModeToggle'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import Link from 'next/link'
import DesktopNavBar from './DesktopNavBar'
import MobileNavBar from './MobileNavBar'
import { onUserLogin } from '@/app/actions/user.action'

function NavBar() {
  const signedUser = onUserLogin();
  return (
    <nav className="sticky top-0 w-full borde-b bg-background/95 backdrop-blur 
      supports-[backdrop-filter] :bg-background/60 z-50" 
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h16">
          <div className="flex items-center">
            <Link href={"/"} className="text-xl font-bold text-primary font-mono
              tracking-wider"
            >
              Socially
            </Link>
          </div>

          <DesktopNavBar />
          <MobileNavBar />
        </div>
      </div>
    </nav>
  )
}

export default NavBar