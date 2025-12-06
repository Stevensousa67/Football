import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { APIError } from "better-auth/api";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_BASE_URL || "http://localhost:3000",
});

console.log("Base URL:", process.env.BETTER_BASE_URL);

export const loginWithSocial = async (provider: string) => {
  try {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
      errorCallbackURL: "/login",
    });
  } catch (error) {
    if (error instanceof APIError) {
      throw new Error(`Failed to log in with ${provider}: ${error.message}`);
    }
  }
};
