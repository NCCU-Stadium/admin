'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import ButtonAuth from './components/ButtonAuth'

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
        <ButtonAuth onClick={() => signOut()}>登出</ButtonAuth>
      </main>
    )
  }

  return (
    <main className=" h-screen w-screen bg-opacity-85 bg-black">
      <div className="absolute zIndex-1 h-[100vh] w-[100vw] bg-[url('/logo.svg')] bg-[length:360px_290px] blur" />
      <div className="w-1/3 h-fit relative top-[35%] mx-auto flex flex-col bg-[#fff] border-4">
        <h1 className="my-3 text-center text-2xl font-semibold text-gray-600">
          Login
        </h1>
        <hr />
        <div className="flex flex-col text-black  p-4 border-t-3">
          <input
            type="account"
            placeholder="Account"
            className="p-3 box-border border-2 mb-4"
            onChange={(e) => setCred({ ...cred, account: e.target.value })}
            onKeyDownCapture={(e) => {
              if (e.key === 'Enter' && cred.account && cred.password) {
                credentials(cred)
              }
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 box-border border-2 mb-4"
            onChange={(e) => setCred({ ...cred, password: e.target.value })}
            onKeyDownCapture={(e) => {
              if (e.key === 'Enter' && cred.account && cred.password) {
                credentials(cred)
              }
            }}
          />
          <ButtonAuth
            className="mt-4 w-1/2 self-center"
            onClick={() => credentials(cred)}
            disabled={!cred.account || !cred.password}
          >
            登入
          </ButtonAuth>
        </div>
      </div>
    </main>
  )
}
