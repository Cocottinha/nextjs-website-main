import { NextResponse } from "next/server"

export const GET = async (request) =>{
    try {
        return NextResponse.json("vrau")
    } catch (error) {
        console.log(error)
    }
}