import { createSessionToken } from '@/src/lib';
import { NextRequest, NextResponse } from 'next/server';

// Backend login endpoint does not return a session cookie or JWT,
// so we generate a short-lived session token on the frontend
// to maintain authenticated state.

const TRIPX_LOGIN_ENDPOINT =
  'https://tripx-test-functions.azurewebsites.net/api/login';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(TRIPX_LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const text = await response.text();
    const contentType =
      response.headers.get('Content-Type') ?? 'application/json';

    if (!response.ok) {
      return new NextResponse(text, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
        },
      });
    }

    const sessionToken = await createSessionToken({
      authenticated: true,
      username: body.username ?? body.email ?? 'user',
    });

    const nextResponse = new NextResponse(text, {
      status: response.status,
      headers: {
        'Content-Type': contentType,
      },
    });

    nextResponse.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return nextResponse;
  } catch {
    return NextResponse.json(
      { message: 'Unable to reach login service' },
      { status: 500 },
    );
  }
}
