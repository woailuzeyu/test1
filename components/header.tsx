"use client"

import { signInWithGoogle, signOut } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { useMemo, useState } from "react"

type HeaderProps = {
  user?: {
    email?: string | null
    user_metadata?: {
      full_name?: string
      avatar_url?: string
    }
  } | null
}

export default function Header({ user }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const displayName = useMemo(() => {
    if (!user) return null
    return user.user_metadata?.full_name || user.email || "Account"
  }, [user])

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍌</span>
          <span className="font-bold text-xl bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            NanoBanana
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground/70 hover:text-foreground transition">
            Features
          </a>
          <a href="#showcase" className="text-foreground/70 hover:text-foreground transition">
            Showcase
          </a>
          <a href="#reviews" className="text-foreground/70 hover:text-foreground transition">
            Reviews
          </a>
          <a href="#faq" className="text-foreground/70 hover:text-foreground transition">
            FAQ
          </a>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:inline-flex text-sm text-foreground/70">
                Hi, {displayName}
              </span>
              <form action={signOut} className="hidden sm:block">
                <Button
                  type="submit"
                  className="bg-white text-foreground border border-border hover:bg-accent/20 font-semibold"
                >
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <form action={signInWithGoogle} className="hidden sm:block">
              <Button
                type="submit"
                className="bg-white text-foreground border border-border hover:bg-accent/20 font-semibold"
              >
                Sign in with Google
              </Button>
            </form>
          )}
          <Button className="hidden sm:inline-flex bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold">
            Start Editing
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-3">
            <a href="#features" className="block text-foreground/70 hover:text-foreground py-2">
              Features
            </a>
            <a href="#showcase" className="block text-foreground/70 hover:text-foreground py-2">
              Showcase
            </a>
            <a href="#reviews" className="block text-foreground/70 hover:text-foreground py-2">
              Reviews
            </a>
            <a href="#faq" className="block text-foreground/70 hover:text-foreground py-2">
              FAQ
            </a>
            {user ? (
              <>
                <div className="text-sm text-foreground/70">Signed in as {displayName}</div>
                <form action={signOut}>
                  <Button type="submit" className="w-full bg-white text-foreground border border-border">
                    Sign out
                  </Button>
                </form>
              </>
            ) : (
              <form action={signInWithGoogle}>
                <Button type="submit" className="w-full bg-white text-foreground border border-border">
                  Sign in with Google
                </Button>
              </form>
            )}
            <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black">
              Start Editing
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
