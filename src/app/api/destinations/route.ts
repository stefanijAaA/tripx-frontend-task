import { NextResponse } from 'next/server';

const TRIPX_DESTINATIONS_ENDPOINT =
  'https://book.tripx.se/wp-json/tripx/v1/destinations';

export async function GET() {
  try {
    const response = await fetch(TRIPX_DESTINATIONS_ENDPOINT, {
      method: 'GET',
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
      { message: 'Unable to load destinations' },
      { status: 500 },
    );
  }
}
