import { jwtVerify, type JWTPayload } from 'jose';

export async function verify(
  token: string,
  secret: string,
): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
}
