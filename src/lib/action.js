"use server"
import { signIn, signOut } from "./auth"

export const handleLogout = async () => {
  await signOut({redirectTo: "/"})
}

export const login = async (formData) => {
  const email = formData.get('email')
  const password = formData.get('password')

  try {
    const formData = {email, password}
    const url = await signIn("credentials", formData)
    // return NextResponse.redirect(new URL("http://localhost:3000/"))
    // return redirect('/')
    // const { next } = router.query;
    // await router.push(next || '/');
  }
  catch (err) {
    console.log(err)
    if (err.message.includes("CredentialsSignin")) {
      return { error: "Username or Password invalid!" }
    }
  }
}