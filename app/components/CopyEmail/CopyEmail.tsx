'use client'

import { useState } from 'react'
import Image from "next/image"
import styles from './CopyEmail.module.scss'

export default function CopyEmail({ email }: { email: string }) {

  const [isCopied, setIsCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setIsCopied(true)
      
      // Reset back to icon after 2 seconds
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)

    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <div className={styles.emailCardContent} onClick={handleCopyEmail}>
      <div className={styles.iconContainer}>
        <Image
          src='/email_glass.svg'
          width={65}
          height={52}
          alt="Glass Contact Icon"
        />
      </div>

      <p className={styles.emailText}>{email}</p>

      {isCopied ? (
        <p className={styles.copiedText}>Copied to clipboard!</p>
      ) : (
        <Image
          src='/copy_glass.svg'
          width={42}
          height={42}
          alt="Copy to clipboard"
        />
      )}
    </div>
  )
}