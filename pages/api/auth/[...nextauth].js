import NextAuth from "next-auth/next";
import User from "@/backend/models/user"
import bcrypt from "bcryptjs"
import dbConnect from "@/backend/config/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        // ... you can add more authentication providers here, like github, facebook etc.
        CredentialsProvider({
            async authorize(credentials, req) {
                dbConnect()

                const { email, password } = credentials

                const user = await User.findOne({ email }).select("+password")

                if (!user) {
                    throw new Error("Invalid Email or Password")
                }

                const isPasswordMatched = await bcrypt.compare(password, user.password)

                if (!isPasswordMatched) {
                    throw new Error("Invalid Email or Password")
                }

                return user
            },
        }),
    ],
    callbacks: {
        jwt: async ({ req, token, user }) => {
            user && (token.user = user)

            const updatedUser = await User.findById(token.user._id)
            token.user = updatedUser

            return token
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user = token.user
            }

            // delete password from session
            delete session?.user?.password
            return session
        }
    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOption)

