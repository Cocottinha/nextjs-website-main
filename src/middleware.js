"use client"
import { NextResponse } from 'next/server';

export async function middleware(req,res) {
  const url = req.nextUrl.clone();

  let cookie = req.cookies.get("access-token")

  const session = cookie

  const isOnAdminPanel = url.pathname.startsWith("/admin");
  const isOnBlogPage = url.pathname.startsWith("/blog");
  const isOnLoginPage = url.pathname.startsWith("/login");
  const isOnRegisterPage = url.pathname.startsWith("/register");

  if (isOnAdminPanel && (!session || !session.isAdmin)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isOnBlogPage && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isOnRegisterPage && (!session || !session.isAdmin)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isOnLoginPage && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
