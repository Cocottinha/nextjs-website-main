import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDB } from "./connectToDB";
import bcrypt from "bcryptjs"
import { User } from "./models";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
    try {
        connectToDB()
        const user = await User.findOne({username: credentials.username})

        if(!user){
            throw new Error("Wrong cred!")
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if(!isPasswordCorrect){
            throw new Error("Wrong cred!")
        }

        return user

    } catch (error) {
        console.log(error)
        throw new Error ("Failed to login!")
    }
}


export const {
    handlers:{GET,POST}, 
    auth, 
    signIn, 
    signOut,} 
    = NextAuth({
        ...authConfig,
    providers:[
        GitHub({
            clientId:process.env.GITHUB_ID, 
            clientSecret:process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            async authorize(credentials){
                try {
                    const user = await login(credentials)
                    return user
                } catch (err) {
                    return null;
                }
            }
        })
    ],
    callbacks:{
        async signIn({user, account, profile}){
            console.log(user,account,profile)
            if(account.provider === "github"){
                connectToDB()
                try{
                    const user = await User.findOne({email:profile.email})

                    if(!user){
                        const newUser = new User({
                            name:profile.name,
                            email: profile.email,
                            image: profile.image
                        })

                        await newUser.save()
                    }

                }
                catch(err){
                    return false
                }
            }
            return true
        },
        ...authConfig.callbacks,
    }
});