import { prisma } from "@/prisma/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  appName: "Studio IO",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
