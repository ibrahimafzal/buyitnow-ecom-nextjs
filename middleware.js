import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(async function middleware(req) {
    // authorize roles
    const  url = req.nextUrl.pathname // yeh url ka mtlb hai k yh hmen wo url dy ga jon sa page open hoga wo wala route. lekin is ny mje "/me" dia
    const userRole = req?.nextauth?.token?.user?.role

    // here we are handle cors for deployment
    if(url.startsWith("/api")) {
        NextResponse.next().headers.append("Access-Control-Allow-Origin", "*")
    }



    if(url?.startsWith('/admin') && userRole !== "admin") {
        return NextResponse.redirect(new URL("/page_not_found", req.url))
    }
}, {
    callbacks: {
        authorized: ({token}) => !!token
    }
})

export const config = {
    matcher: ["/admin/:path*", "/me/:path*", "/shipping"]
}