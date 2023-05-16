import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth(
    {
        providers: [
            CredentialsProvider({
                name: "Credentials",
                type: "credentials",
                credentials: {
                    email: {label: "Email", type: "email"},
                    password: {label: "Password", type: "password"}
                },
                async authorize(credentials, req) {
                    const credentialDetails = {
                        email: credentials?.email,
                        password: credentials?.password,
                    };

                    const res = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(credentialDetails)
                    })
                    const response = await res.json();
                    if (res.status == 200) {
                        return response;
                    }

                    return null;
                }
            })
        ],
        pages: {
            signIn: '/login',
            signOut: '/logout'
        },
        callbacks: {
            async jwt({token, user}) {
                if (token?.exp < Date.now() / 1000) {
                    console.log("Error")
                    return Promise.reject({
                        error: new Error("Access token has expired. Please log in again to get a new access token."),
                    });
                }
                return {...token, ...user};
            },
            async session({session, token, user}) {
                session.user = token as any;
                return session;
            },
        },
    }
);