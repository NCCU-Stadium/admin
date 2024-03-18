'use clinet'
import React from 'react'
import Link from 'next/link'

interface ButtonNewProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  className?: string
  href: string
}

const ButtonNew: React.FC<ButtonNewProps> = ({
  href,
  children,
  className,
  ...props
}) => {
  const [showChildren, setShowChildren] = React.useState(false)

  const defaultClassName =
    'absolute self-end bottom-[5%] right-[3%] flex p-2 items-center justify-center bg-[#F25A66BF] rounded-[40px] shadow-md font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
  const combinedClassName = `${defaultClassName} ${className}`

  let timer: ReturnType<typeof setTimeout>

  const handleMouseEnter = () => {
    timer = setTimeout(() => {
      setShowChildren(true)
    }, 0) // delay time
  }

  const handleMouseLeave = () => {
    clearTimeout(timer)
    setShowChildren(false)
  }
  return (
    <button
      data-twe-ripple-init
      data-twe-ripple-color="light"
      className={combinedClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <Link
        href={href}
        className="flex flex-row items-center justify-evenly text-[#fff] "
      >
        <img src="/add-circle.svg" alt="new item" />
        <div style={{ display: showChildren ? 'inline' : 'none' }}>
          <p className="mx-3">{children}</p>
        </div>
      </Link>
    </button>
  )
}

export default ButtonNew
