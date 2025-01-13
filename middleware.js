import { NextResponse } from "@node_modules/next/server";

export async function middleware(request) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/' || path === "/register";

    const token = request.cookies.get('jwt')?.value || '';

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/home', request.nextUrl));
    }
    if (!isPublicPath && !token){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
} 


export const config = {
    matcher: ['/','/register', '/login', '/home']
}