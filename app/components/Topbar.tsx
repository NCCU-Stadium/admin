'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function Topbar() {
  const { data: session } = useSession()
  if (!session || !session.user) {
    return null
  }

  return (
    <div className="flex flex-row justify-between items-center bg-gray-100 p-4">
      <Link href="/">Home</Link>
      <Link href="/product">Product</Link>
      <Link href="/announcement">Announcement</Link>
      <Link href="/activity">Activity</Link>
      <Link href="/reserve">ReserveSystem</Link>
    </div>
  )
}
