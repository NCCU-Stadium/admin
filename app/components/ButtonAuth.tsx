'use client'
import React from 'react'
import { Ripple, initTWE } from 'tw-elements'

initTWE({ Ripple })
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
  const combinedClassName = `${defaultClassName} ${className}`
  return (
    <button
      data-twe-ripple-init
      data-twe-ripple-color="light"
      className={combinedClassName}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default ButtonAuth
