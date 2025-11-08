'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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

  return (
    <header 
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

    </header>
    
  )
}