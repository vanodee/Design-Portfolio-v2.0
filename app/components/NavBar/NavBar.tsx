'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.scss';


export const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects', defaultCategory: 'web-apps' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export const myResume = "https://drive.google.com/file/d/1BWGzFkHhIhSlI-BYySXd3o1inPUDCeAS/view?usp=sharing";


export default function NavBar() {
  const pathname = usePathname();
  const path = pathname.replace(/\/$/, "");
  const segments = path.split("/").filter(Boolean); 


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
    <header className={`${styles.headerContainer} ${segments.length==3 && styles["headerContainer--projectPage"]}`}>
      <div
        className={styles.header}
      >
        <Link href="/">
          <Image
            src='/sp_logo_light.svg'
            width={115}
            height={45}
            alt="Stevano Peters Logo"
          />
        </Link>
        

        <nav className={styles.nav}>
          {navItems.map(({ name, path, defaultCategory }) => {
            const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path) 

            return (
              <Link
                key={path}
                href={path === "/projects" ? `${path}/${defaultCategory}` : path}
                className={isActive ? styles.navLinkActive: styles.navLink}
              >
                {name}
              </Link>
            )
          })}
        </nav>

        <a
          href={myResume}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.resumeButton}
        >
          <button>My Resume</button>
        </a>

        <button
          ref={toggleBtnRef}
          className={styles.mobileMenuToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <Image
            src={mobileOpen ? '/close_light.svg' :'/hamburger_light.svg'}
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
        {navItems.map(({ name, path, defaultCategory }) => {
          const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path) 

          return (
            <Link
              key={path}
              href={path === "/projects" ? `${path}/${defaultCategory}` : path}
              className={isActive ? styles.navLinkActive: styles.navLink}
              onClick={() => setMobileOpen(false)} // close when link clicked
            >
              {name}
            </Link>
          )
        })}

        <a
          href={myResume}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileNavCta}
        >
          <button>My Resume</button>
        </a>
          
      </nav>
    </header>
  )
}