import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { routes } from '@/lib/routes'
import logo from '@/assets/logo.png'
const linkClass = ({ isActive }) =>
  `transition-colors hover:text-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'}`

// Desktop dropdown for a route group: opens on click, closes on outside click, Escape or navigation.
function NavDropdown({ label, items }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const buttonRef = useRef(null)
  const menuId = useId()
  const { pathname } = useLocation()
  const isActive = items.some((item) => pathname.startsWith(item.path))

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Close when keyboard focus leaves the dropdown
  const handleBlur = (e) => {
    if (!ref.current?.contains(e.relatedTarget)) setOpen(false)
  }

  return (
    <div ref={ref} className="relative" onBlur={handleBlur}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 ${linkClass({ isActive: isActive || open })}`}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={menuId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-full mt-3 flex min-w-48 -translate-x-1/2 flex-col rounded-xl border border-border bg-background p-2 shadow-lg"
          >
            {items.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 transition-colors hover:bg-muted hover:text-foreground ${
                      isActive ? 'bg-muted text-foreground' : 'text-muted-foreground'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  const mobileLink = (item) => (
    <NavLink
      to={item.path}
      className={(s) => `block py-3 ${linkClass(s)}`}
      onClick={() => setOpen(false)}
    >
      {item.label}
    </NavLink>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          {/* <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-md bg-primary font-display text-sm font-semibold text-primary-foreground"
          >
            FA
          </span> */}
          {/* <img src={logo} alt="Feras Al-Tarifi" width={794} height={564} className="h-12 w-auto mix-blend-multiply" /> */}
          <img src={logo} alt="Feras Al-Tarifi" width={794} height={564} className="h-28 w-auto mix-blend-multiply" />

          {/* <span className="font-display text-base font-medium tracking-tight">Feras Al-Tarifi</span> */}
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-5 text-sm">
            {routes.map((item) => (
              <li key={item.path ?? item.label}>
                {item.children ? (
                  <NavDropdown label={item.label} items={item.children} />
                ) : (
                  <NavLink to={item.path} className={linkClass}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-md xl:hidden"
          aria-expanded={open}
          aria-controls="v2-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <motion.div aria-hidden="true" style={{ scaleX }} className="h-0.5 origin-left bg-primary" />

      {open ? (
        <nav id="v2-mobile-nav" aria-label="Mobile" className="border-t border-border xl:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            <li>
              <NavLink to="/" end className={(s) => `block py-3 ${linkClass(s)}`} onClick={() => setOpen(false)}>
                Home
              </NavLink>
            </li>
            {routes.map((item) => (
              <li key={item.path ?? item.label}>
                {item.children ? (
                  <>
                    <span className="block pt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
                      {item.label}
                    </span>
                    <ul className="border-l border-border pl-4">
                      {item.children.map((child) => (
                        <li key={child.path}>{mobileLink(child)}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  mobileLink(item)
                )}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
