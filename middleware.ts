import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('userToken')?.value
  // const [cookies] = useCookies(["userToken"]);
// const currentUser = request.cookies.get('userToken');
// console.log(currentUser);
// const currentUser =true
  // if (currentUser && !request.nextUrl.pathname.startsWith('/')) {
  //   return Response.redirect(new URL('/home', request.url))
  // }
 
  // if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
  //   return Response.redirect(new URL('/login', request.url))
  // }
}
 
export const config = {
  matcher: ["/((?!_next/static|_next/image|public/|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",],
}