"use server"
import { revalidatePath } from "next/cache"
import { connectToDB } from "./connectToDB"
import { Post, User } from "./models"
import { signIn, signOut } from "./auth"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

export const addUser = async (prevState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData)

  try {
    connectToDB();
    const newUser = new User({
      username, email, password, img
    })
    await newUser.save()
    console.log("Saved to DB")
    revalidatePath("/blog")
    revalidatePath("/admin")

  } catch (error) {
    console.log(error)
    return {
      error: "Algo deu errado!"
    }
  }
}


export const addPost = async (dimensao, atividade, descricao, horas, userId, slug) => {
  try {
    connectToDB();
    const newPost = new Post({
      dimensao, atividade, descricao, horas, userId, slug:Date.now(), pendente:true
    })
    await newPost.save()
    console.log("Saved to DB")
    revalidatePath("/blog")
    revalidatePath("/admin")
    return{
      message:"Adicionado com sucesso!"
    }
  } catch (error) {
    console.log(error)
    return {
      error: "Algo deu errado!"
    }
  }
}
export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData)

  try {
    connectToDB();
    await Post.findByIdAndDelete(id)
    console.log("Deleted from DB")
    revalidatePath("/blog")
    revalidatePath("/admin")

  } catch (error) {
    console.log(error)
    return {
      error: "Algo deu errado!"
    }
  }
}

export const aprovar = async (id) => {
  try {
    connectToDB();
    await Post.findByIdAndUpdate(id, {aprovado: true, pendente: false })
    console.log("Atualizado!")
    revalidatePath("/blog")
    revalidatePath("/admin")

  } catch (error) {
    console.log(error)
    return {
      error: "Algo deu errado!"
    }
  }
}
export const reprovar = async (id) => {
  try {
    await connectToDB();
    await Post.findByIdAndUpdate(id, { aprovado: false, pendente: false });
    console.log("Post reprovado!");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Algo deu errado ao reprovar o post!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData)

  try {
    connectToDB();
    await Post.deleteMany({ userId: id })
    await User.findByIdAndDelete(id)
    console.log("Deleted from DB")
    revalidatePath("/admin")
  } catch (error) {
    console.log(error)
    return {
      error: "Algo deu errado!"
    }
  }
}

export const handleLogout = async () => {
  "use server"
  await signOut()
}
export const register = async (previousState, formData) => {
  const { username, email, password, passwordRepeat, img } = Object.fromEntries(formData)

  if (password !== passwordRepeat) { return { error: "Password does not match!" } }
  try {
    connectToDB()

    const user = await User.findOne({ username })
    const mail = await User.findOne({ email })

    if (user) {
      return { error: "Username already exists!" }
    }
    if (mail) {
      return { error: "Email already exists!" }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    })
    await newUser.save()
    console.log("Conta criada com sucesso!")

    return { success: true }
  }
  catch (err) {
    console.log(err)
    return { error: "Something wrong" }
  }
}

export const changePassword = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (user) {
    try {
      connectToDB();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.findOneAndUpdate({ email: email }, { password: hashedPassword, lastPasswordChange: Date.now() });

      console.log("Senha Atualizada!");

      revalidatePath("/blog");
      revalidatePath("/admin");

    } catch (error) {
      console.log(error);
      return {
        error: "Não foi possível alterar a senha!"
      };
    }
  }
  else {
    throw new Error("Não existe usuário com esse email!")
  }
};

export const login = async (username, password) => {
  console.log(username, password)
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
export const getCookieId = async()  => {
  const a = cookies().get("user")
  return a.value
}