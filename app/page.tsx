'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

async function credentials(data: { account: string; password: string }) {
  const result = await signIn('credentials', {
    account: data.account,
    password: data.password,
    redirect: false,
  })
  if (result?.error) {
    if (result?.error === 'Request failed with status code 401') {
      return window.alert('Please check your email and password')
    }
  }
}

export default function Home() {
  const { data: session } = useSession()
  const [cred, setCred] = React.useState({ account: '', password: '' })

  if (session && session.user) {
    return (
      <main>
        <h1>Next.js + TypeScript + Tailwind CSS</h1>
        <button onClick={() => signOut()}>Signout</button>
      </main>
    )
  }

  return (
    <main>
      <div className="flex flex-col text-black">
        <input
          type="account"
          placeholder="Account"
          onChange={(e) => setCred({ ...cred, account: e.target.value })}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setCred({ ...cred, password: e.target.value })}
        />
        <button onClick={() => credentials(cred)}>
          Sign in with Credentials
        </button>
      </div>
    </main>
  )
}
