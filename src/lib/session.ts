import { SignJWT, jwtVerify } from 'jose';

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error('SESSION_SECRET is not set');
}

const secret = new TextEncoder().encode(sessionSecret);

export type SessionPayload = {
  authenticated: true;
  username: string;
};

export async function createSessionToken(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .setIssuer('tripx-app')
    .setAudience('tripx-users')
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ['HS256'],
    issuer: 'tripx-app',
    audience: 'tripx-users',
  });

  return payload as SessionPayload;
}
