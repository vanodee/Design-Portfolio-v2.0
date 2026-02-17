'use client'

import { useState, useEffect } from 'react'
import styles from './DigitalClock.module.scss'

export default function DigitalClock() {
  const [time, setTime] = useState('')
  const [showColon, setShowColon] = useState(true)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const watTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }))
      
      let hours = watTime.getHours()
      const minutes = watTime.getMinutes()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      
      hours = hours % 12
      hours = hours ? hours : 12 // Convert 0 to 12
      
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`
      setTime(formattedTime)
    }

    // Update immediately
    updateTime()
    
    // Update time every second
    const timeInterval = setInterval(updateTime, 1000)
    
    // Blink colon every 500ms
    const blinkInterval = setInterval(() => {
      setShowColon(prev => !prev)
    }, 500)

    return () => {
      clearInterval(timeInterval)
      clearInterval(blinkInterval)
    }
  }, [])


  return (
    <div className={styles.digitalClock}>
        <p>{time.split(':')[0]}</p>
        <span style={{ opacity: showColon ? 1 : 0 }}>:</span>
        <p>{time.split(':')[1]}</p>
        <p className={styles.timeZone}>WAT</p>
    </div>
  )
}