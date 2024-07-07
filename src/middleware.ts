import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export async  function middleware(request: NextRequest) {
const token = request.cookies.get('tokenn')?.value || ''
const path = request.nextUrl.pathname
const ispublicpath = path === '/login' || path === '/register'
const isprotectedpath = path === '/profile' 
const dashsel = path === '/Dashboard_Blog_sel'
const dash = path === '/Dasboard_Blog'
const dashupd = path === '/Dashboard_Blog_update'


if(ispublicpath && token){
    console.log('runnn')
    return NextResponse.redirect(new URL('/', request.url))
}

if(isprotectedpath && !token){
    return NextResponse.redirect(new URL('/login', request.url))
}
// if(dashsel && !token){
//   return NextResponse.redirect(new URL('/login', request.url))
// }
// if(dash && !token){
//   return NextResponse.redirect(new URL('/login', request.url))
// }
if(dashupd && !token){
  return NextResponse.redirect(new URL('/login', request.url))
}

}

export const config = {
  matcher:[
    '/',
    '/login',
    '/register',
    '/profile',
    '/profile/id',
    '/Dasboard_Blog',
    '/Dashboard_Blog_sel',
    '/Dashboard_Blog_update'

  ],
}