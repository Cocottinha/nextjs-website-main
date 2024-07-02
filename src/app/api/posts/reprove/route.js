import { connectToDB } from "@/lib/connectToDB";
import { Post } from "@/lib/models";
import { revalidatePath } from "next/cache"

export async function POST(req) {
  const { id } = await req.json();
  if (req.method === "POST") {
    
    try {
      await connectToDB();
      await Post.findByIdAndUpdate(id, { aprovado: false, pendente: false });
      revalidatePath("/admin")
      revalidatePath("/blog")
      return Response.json({ message: "Post reprovado!" });
    } catch (error) {
      console.log(error);
      return Response.json({
        success: false,
        message: "Algo deu errado ao reprovar o post!",
        status: 500
      });    }
  } else {
    return new Response.json({
      success: false,
      message: "Método não permitido",
      status: 405});  }
}
