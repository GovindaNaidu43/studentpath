import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_session";

/* 
  POST /api/admin/login
  Body: { email: string; password: string }
  Sets an HttpOnly cookie if credentials match .env.local values.
*/
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminEmail || !adminPassword || !adminSecret) {
      return NextResponse.json(
        { error: "Server configuration error: admin credentials not set." },
        { status: 500 }
      );
    }

    // Validate credentials
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Set secure HttpOnly session cookie (expires in 7 days)
    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, adminSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
