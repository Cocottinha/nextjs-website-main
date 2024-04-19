import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config";
import { Connection } from "./connection";
import { User } from "./modelsSQL";

const login = async (credentials) => {
    try {
        const user = await User.findOne({ 
            where:{
                username:credentials.username
            }
        })
        
        if (!user) {
            throw new Error("Usuário não existe!")
        }
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordCorrect) {
            throw new Error("Senha Errada!")
        }

        const blocked = user.isBlocked;

        if (blocked) {
            throw new Error("Usuário Bloqueado!")
        }

        if(user){
            await User.update({ 
                lastLogin: new Date()
            },{
                where:{username:credentials.username}
            }
        )
        }    
        return user
    }
    catch (err) {
        throw new Error(err)
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
                async authorize(credentials) {
                    return await login(credentials)
                }
            })
        ],
        callbacks: {
            async signIn({ user, account, profile }) {
                console.log(user, account, profile)
                return true
            },
            ...authConfig.callbacks,
        }
    });