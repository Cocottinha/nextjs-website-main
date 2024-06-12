import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers";

const login = async (credentials) => {
  try {
    const response = await fetch(process.env.APILOGIN, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      cache:'no-cache',
      method: "POST",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })

    const data = await response.json()

    if (data.Dados.token) {
      cookies().set("access-token", data.Dados.token)
      return { token: data.Dados.token };
    }
    else {
      throw new Error('Token not found in the response');
    }
  }
  catch (error) {
    throw new Error(error.message || 'Login failed');
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await login(credentials);
        if (user) {
          return user;
        }
        return false
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      const isAllowed = user != null
      if (isAllowed) {
        return true
      } else {
        return false
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.authToken = user.token;
      }
      return token;
    },
    async session({ session, token}) {
      session.authToken = token.authToken;
      return session;
    },
    async authorized({ request, auth }) {
      const user = auth?.authToken
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin")
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog")
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login")
      const isOnRegisterPage = request.nextUrl?.pathname.startsWith("/register")

      if (isOnAdminPanel && !user?.isAdmin) {
        console.log("#1")
        return false       
      }
      if (isOnBlogPage && !user) {
        console.log("#2")
        return false
      }
      if (isOnRegisterPage && !user?.isAdmin) {
        console.log("#3")
        return false
      }
      if (isOnLoginPage && user) {
        console.log("#4")
        var url = new URL('/', request.url)
        console.log("Nova URL: " + url)
        return Response.redirect(url)
      }
      return true
    },
  }
}