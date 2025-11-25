'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.scss';



const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]


export default function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/"; // Home uses light theme


  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  // refs to detect outside click
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!mobileNavRef.current) return;

      // If click is outside BOTH the nav + toggle button → close
      if (
        !mobileNavRef.current.contains(event.target as Node) &&
        !toggleBtnRef.current?.contains(event.target as Node)
      ) {
        setMobileOpen(false);
      }
    }

    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);



  return (
    <header className={styles.headerContainer}>
      <div
        className={`${styles.header} ${isHome ? styles["header--light"] : styles["header--dark"]}`}
      >
        <Link href="/">
          <Image
            src={isHome ? '/sp_logo_light.svg' : '/sp_logo_dark.svg'}
            width={115}
            height={45}
            alt="Stevano Peters Logo"
          />
        </Link>
        

        <nav className={styles.nav}>
          {navItems.map(({ name, path }) => {
            const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path) 

            return (
              <Link
                key={path}
                href={path}
                className={isActive ? styles.navLinkActive: styles.navLink}
              >
                {name}
              </Link>
            )
          })}

          <button>My Resume</button>
        </nav>

        <button
          ref={toggleBtnRef}
          className={styles.mobileMenuToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <Image
            src={isHome ? 
              (mobileOpen ? '/close_light.svg' :'/hamburger_light.svg') 
              : 
              (mobileOpen ? '/close_dark.svg' :'/hamburger_dark.svg')
            }
            width={24}
            height={24}
            alt="Toggle Menu"
          />
        </button>

      </div>

      <nav 
        ref={mobileNavRef}
        className={`${styles.mobileNav} ${mobileOpen ? styles.open : ""}`}
      >
        {navItems.map(({ name, path }) => {
          const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path) 

          return (
            <Link
              key={path}
              href={path}
              className={isActive ? styles.navLinkActive: styles.navLink}
              onClick={() => setMobileOpen(false)} // close when link clicked
            >
              {name}
            </Link>
          )
        })}

        <div className={styles.mobileNavCta}>
          <button>My Resume</button>
        </div>
          
      </nav>
    </header>
  )
}