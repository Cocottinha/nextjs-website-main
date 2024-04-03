export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.isAdmin = token.isAdmin
      }
      return session
    },
    async authorized({ auth, request }) {
      const user = auth?.user
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin")
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog")
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login")
      const isOnRegisterPage = request.nextUrl?.pathname.startsWith("/register")

      if (isOnAdminPanel && !user?.isAdmin) {
        return false
      }
      if (isOnBlogPage && !user) {
        return false
      }
      if (isOnRegisterPage && !user?.isAdmin) {
        return false
      }
      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }
      return true
    },
  }
}