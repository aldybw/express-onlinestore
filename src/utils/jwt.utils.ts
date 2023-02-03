import jwt from "jsonwebtoken";
import config from "config";

const PRIVATE_KEY = config.get<string>("privateKey");
const PUBLIC_KEY = config.get<string>("publicKey");

export async function signJwt(
  payload: object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(payload, PRIVATE_KEY, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export async function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: (error.message = "jwt expired"),
      decoded: null,
    };
  }
}
