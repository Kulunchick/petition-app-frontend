import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
            id: number;
            first_name: string;
            last_name: string;
            email: string;
            gender: string;
            token: string;
        };
  }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    export interface JWT {
        token: string;
        exp: number;
        iat: number;
        jti: string;
    }
}