import { NextRequest, NextResponse } from 'next/server';

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

    return new NextResponse(text, {
      status: response.status,
      headers: {
        'Content-Type':
          response.headers.get('Content-Type') ?? 'application/json',
      },
    });
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
