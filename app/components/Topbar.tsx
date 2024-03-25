'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { cn } from '@/lib/utils'

export default function Topbar({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const { data: session } = useSession()
  if (!session || !session.user) {
    return null
  }

  return (
    <div
      className={cn(
        'flex h-[83px] sticky top-0 bg-[#F9F9F9] items-center justify-end p-9',
        className
      )}
    >
      {children}
    </div>
  )
}
