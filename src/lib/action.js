"use server"
import { redirect } from "next/dist/server/api-utils"
import { signIn, signOut } from "./auth"

export const handleLogout = async () => {
  await signOut({redirectTo: "/"})
}

export const login = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    const url = await signIn("credentials", {email,password} )
    if(url){
      redirect(url)
    }
  }
  catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return { error: "Username or Password invalid!" }
    }
  }
}