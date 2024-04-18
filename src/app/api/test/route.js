import { Connection } from "@/lib/connection";
import { User } from "@/lib/modelsSQL";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    // Connection();
    try{
        const user = await User.findAll({attributes:['username']});
        return NextResponse.json(user);
    }catch(err){
        return err;
    }
    
    // try {
    //     const users = await query({
    //         query: "SELECT * FROM teste.users;",
    //         values: []
    //     });

    //     const emails = users.map(user => user.email);

    //     return NextResponse.json(emails);
    // } catch (error) {
    //     console.log(error);
    //     return NextResponse.error(error.message);
    // }
}

// export const GET = async (request) => {
//     try {
//         const users = await query({
//             query: "SELECT username FROM teste.users;",
//             values: []
//         });

//         const names = users.map(user => user.username);

//         return NextResponse.json(names);
//     } catch (error) {
//         console.log(error);
//         return NextResponse.error(error.message);
//     }
// }

// export const GETUSER = async (request) => {
//     try {
//         const user = await query({
//             query: "SELECT * FROM teste.users;",
//             values: []
//         })
//         return NextResponse.json(user)
//     }
//     catch (error)
//     {
//         console.log(error)
//         return NextResponse.error(error.message)
//     }
// }