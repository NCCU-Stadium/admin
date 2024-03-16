'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'

export default function Sidebar({ className }: { className?: string }) {
  const { data: session } = useSession()
  const [activeLink, setActiveLink] = useState('')
  const pathname = usePathname()
  useEffect(() => {
    setActiveLink(pathname)
  }, [])

  const handleLinkClick = (href: any) => {
    setActiveLink(href)
  }
  if (!session || !session.user) {
    return null
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <img src="/logo.svg" alt="logo" className="p-5 top-10" />
      <div className="flex flex-col relative top-[15%] justify-evenly h-1/2">
        <Link
          href="/"
          className={`${activeLink === '/' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/')}
        >
          <img src="/home.svg" alt="home" />
          <p>。 首頁</p>
        </Link>
        <Link
          href="/product"
          className={`${activeLink === '/product' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/product')}
        >
          <img src="/product.svg" alt="product" />
          <p>。 商品</p>
        </Link>
        <Link
          href="/announcement"
          className={`${activeLink === '/announcement' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/announcement')}
        >
          <img src="/announcement.svg" alt="announcement" />
          <p>。 通知</p>
        </Link>
        <Link
          href="/activity"
          className={`${activeLink === '/activity' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/activity')}
        >
          <img src="/activity.svg" alt="activity" />
          <p>。 活動</p>
        </Link>
        <Link
          href="/reserve"
          className={`${activeLink === '/reserve' ? 'active' : ''}`}
          onClick={() => handleLinkClick('/reserve')}
        >
          <img src="/reserve.svg" alt="reserve" />
          <p>。 預約</p>
        </Link>
      </div>
    </div>
  )
}
