import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./auth.config";
import { cookies } from "next/headers";

export const login = async (credentials) => {
    try {
        const response = await fetch("http://192.168.0.11:8000/api/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: "POST",
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        })

        const data = await response.json()

        if (data.Dados.token) {         
            cookies().set("access-token",data.Dados.token)
            console.log(data.Dados.token)
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

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut, }
    = NextAuth({
        ...authConfig,
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
                    } else {
                        return null;
                    }
                }
            })
        ],
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    token.authToken = user.token;
                }
                return token;
            },
            async session({ session, token }) {
                session.authToken = token.authToken;
                return session;
            }
        }
    });