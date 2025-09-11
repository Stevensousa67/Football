import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      isAdmin: { type: "boolean" },
      countryCode: { type: "string" },
      phoneNumber: { type: "string" },
      gender: { type: "string" },
      accountStatus: { type: "string" },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
    maxPasswordLength: 128,
    autoSignIn: true,
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    microsoft: {
      prompt: "select_account",
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
    },
    // twitter: {
    //   prompt: "select_account",
    //   clientId: process.env.TWITTER_CLIENT_ID as string,
    //   clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    // },
  },
  plugins: [nextCookies()],
});
