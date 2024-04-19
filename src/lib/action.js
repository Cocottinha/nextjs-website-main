"use server"
import { revalidatePath } from "next/cache"
import {User} from "./modelsSQL"
import { signIn, signOut } from "./auth"
import bcrypt from "bcryptjs"
import { Connection } from "./connection"

// export const addUser = async (prevState, formData) => {
//   const { username, email, password, img } = Object.fromEntries(formData)

//   try {
//     connectToDB();
//     const newUser = new User({
//       username, email, password, img
//     })
//     await newUser.save()
//     console.log("Saved to DB")
//     revalidatePath("/blog")
//     revalidatePath("/admin")

//   } catch (error) {
//     console.log(error)
//     return {
//       error: "Algo deu errado!"
//     }
//   }
// }

// export const addPost = async (prevState, formData) => {
//   const { title, desc, slug, userId } = Object.fromEntries(formData)

//   try {
//     connectToDB();
//     const newPost = new Post({
//       title,
//       desc,
//       slug,
//       userId
//     })
//     await newPost.save()
//     console.log("Saved to DB")
//     revalidatePath("/blog")
//     revalidatePath("/admin")
//   } catch (error) {
//     console.log(error)
//     return {
//       error: "Algo deu errado!"
//     }
//   }
// }

// export const deletePost = async (formData) => {
//   const { id } = Object.fromEntries(formData)

//   try {
//     connectToDB();
//     await Post.findByIdAndDelete(id)
//     console.log("Deleted from DB")
//     revalidatePath("/blog")
//     revalidatePath("/admin")

//   } catch (error) {
//     console.log(error)
//     return {
//       error: "Algo deu errado!"
//     }
//   }
// }
// export const deleteUser = async (formData) => {
//   const { id } = Object.fromEntries(formData)

//   try {
//     connectToDB();
//     await Post.deleteMany({ userId: id })
//     await User.findByIdAndDelete(id)
//     console.log("Deleted from DB")
//     revalidatePath("/admin")
//   } catch (error) {
//     console.log(error)
//     return {
//       error: "Algo deu errado!"
//     }
//   }
// }

export const handleLogout = async () => {
  "use server"
  await signOut()
}


export const register = async (previousState, formData) => {
  const { username, email, password, passwordRepeat,img } = Object.fromEntries(formData)

  if (password !== passwordRepeat) { return { error: "Password does not match!" } }
  try {
    Connection();

    const user = await User.findOne({ where:{username: username }})
    const mail = await User.findOne({ where:{email: email } })

    console.log(user)

    if (user) {
      return { error: "Username already exists!" }
    }
    if (mail) {
      return { error: "Email already exists!" }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = User.build({
      username,
      email,
      password: hashedPassword,
      img,
    })
    await newUser.save()
    console.log("Conta criada com sucesso!")

    return { success: true, error:"Conta criada com sucesso!" }
  }
  catch (err) {
    console.log(err)
    return { error: "Something wrong" }
  }
}

export const changePassword = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email: email } });

    if (user) {

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      await User.update({ password: hashedPassword, lastPasswordChange: new Date() }, { where: { email: email } });

      console.log("Senha Atualizada!");

      revalidatePath("/blog");
      revalidatePath("/admin");
    } else {
      throw new Error("Não existe usuário com esse email!");
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Não foi possível alterar a senha!"
    };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData)

  try {
    await signIn("credentials", { username, password })
  }
  catch (err) {
    console.log("Error on login: \n" + err)
    if (err.message.includes("CredentialsSignin")) {
      return { error: "Username or Password invalid!" }
    }
    throw err
  }
}