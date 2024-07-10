"use server";
import { cookies } from "next/headers";
import axios from "axios";

export const login = async (email, password) => {
  const requestData = {
    email: email.toString(),
    password: password.toString()
  };

  try {
    const response = await axios.post(process.env.APILOGIN, requestData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'PostmanRuntime/7.39.0',
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br',
      }
    });

    if (!response.data.Sucesso) {
      throw new Error('Token not found in the response');
    }

    const token = response.data.Dados.token;
    cookies().set("access-token", token);

    return { token };
  } catch (error) {
    throw new Error(error.message + '| Login failed');
  }
};

export const register = async (name, email, password, c_password) => {
  const requestData = {
    name: name.toString(),
    email: email.toString(),
    password: password.toString(),
    c_password: c_password.toString()   
  };

  console.log("back:",JSON.stringify(requestData))
  try {
    const response = await axios.post(process.env.APIREGISTER, requestData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      }
    });

    console.log("Response:", response.data)

    if (!response.data.Sucesso) {
      throw new Error('Token not found in the response');
    }

    return (response.data);
  } catch (error) {
    throw new Error(error.message + '| Create failed');
  }
};

export const changePassword = async (email, password, c_password) => {
  const requestData = {
    name: name.toString(),
    email: email.toString(),
    password: password.toString(),
    c_password: c_password.toString()   
  };

  console.log("back:",JSON.stringify(requestData))
  try {
    const response = await axios.post(process.env.APIREGISTER, requestData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      }
    });

    console.log("Response:", response.data)

    if (!response.data.Sucesso) {
      throw new Error('Token not found in the response');
    }

    return (response.data);
  } catch (error) {
    throw new Error(error.message + '| Create failed');
  }
};

export const getPosts = async () => {
  const a = cookies().get("access-token")
  console.log(a.value)
  try {
    const response = await axios.get(process.env.APIPOSTS,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'PostmanRuntime/7.39.0',
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br',
        'Authorization': `Bearer ${a.value}`
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch posts');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPost = async (slug) => {
  const a = cookies().get("access-token")
  console.log(a.value)
  console.log(`${process.env.APIPOST}${slug}`)
  try {
    const response = await axios.get(`${process.env.APIPOST}${slug}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'PostmanRuntime/7.39.0',
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br',
        'Authorization': `Bearer ${a.value}`
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch posts');
    }
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function deleteCookies() {
  cookies().delete("access-token");
}
