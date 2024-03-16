import CredentialsProvider from 'next-auth/providers/credentials'

import type { NextAuthOptions } from 'next-auth'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        account: { label: 'Account', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.account == 'admin' &&
          credentials?.password == 'admin'
        ) {
          const user = {
            name: 'admin',
          }
          return user
        } else return null
      },
    }),
  ],
}
