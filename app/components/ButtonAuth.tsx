'use client'
import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonAuthProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  className?: string
}

const ButtonAuth: React.FC<ButtonAuthProps> = ({
  onClick,
  children,
  className,
  ...props
}) => {
  const defaultClassName =
    'flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
  return (
    <button
      data-twe-ripple-init
      data-twe-ripple-color="light"
      className={cn(defaultClassName, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default ButtonAuth
