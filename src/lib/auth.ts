import { prisma } from "@/prisma/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  appName: "Studio IO",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId:
        process.env.GOOGLE_CLIENT_ID ||
        (() => {
          throw new Error("GOOGLE_CLIENT_ID environment variable is required");
        })(),
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        (() => {
          throw new Error(
            "GOOGLE_CLIENT_SECRET environment variable is required"
          );
        })(),
    },
  },
  plugins: [nextCookies()],
});
export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
