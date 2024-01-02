import { DefaultSession, DefaultUser } from "next-auth";
import { LineProfile } from "next-auth/providers/line";

declare module "next-auth" {
  interface Session {
    jwt: JWT;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}
