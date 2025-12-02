import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const authPage = ['/auth']

export default function withAuth(middleware: any, requireAuth: string[] = []){
  return async(req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname 
    const token = req.cookies.get('authToken')?.value;

    if(token && authPage.includes(pathname)){ //jika sudah login
      return NextResponse.redirect(new URL('/dashboard',req.url)) //alihkan ke page /
    }

    if(requireAuth.includes(pathname)){
      if(!token && !authPage.includes(pathname)){ //jika tidak ada hak akses dan path sedang tidak ada di login atau register
        const url = new URL('/auth',req.url) //Buat URL redirect ke /login dan
        url.searchParams.set('callbackUrl', encodeURI(req.url)) //tambahkan query param callbackUrl supaya nanti bisa diarahkan kembali ke halaman sebelumnya setelah login.
        return NextResponse.redirect(url)
      }
    }  

    return middleware(req,next) //Jika sudah login atau path tidak membutuhkan autentikasi, lanjutkan ke middleware utama.

  }
}