"use server"
import { cookies } from "next/headers";

export const login = async (email, password) => {
  try {
    const response = await fetch(process.env.APILOGIN, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      cache:'no-cache',
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await response.json()

    if (data.Sucesso) {
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
export async function deleteCookies (){
  cookies().delete("access-token")
}