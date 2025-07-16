import { TokenService } from "../../domain/ports/TokenService";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode("clave-secreta-super-segura");

export const tokenService: TokenService = {
  generateToken: async (payload) =>
    await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret),
};
