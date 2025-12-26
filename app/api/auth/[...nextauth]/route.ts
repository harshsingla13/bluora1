import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbcon";
import User from "@/schema/userschema";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                otp: { label: "OTP", type: "text" }
            },
            async authorize(credentials) {
                if (!credentials?.email) {
                    throw new Error("Missing email");
                }

                await dbConnect();
                const user = await User.findOne({ email: credentials.email });

                // If user doesn't exist, we return null which NextAuth interprets as "No user found"
                // For Credentials provider, create account is handled in signup page, not here.
                if (!user) {
                    throw new Error("No user found");
                }

                // FLOW 1: OTP VERIFICATION & LOGIN
                if (credentials.otp) {
                    // Check if OTP matches and is not expired
                    // Convert both to string to ensure type safety
                    if (String(user.otp).trim() !== String(credentials.otp).trim()) {
                        throw new Error("Invalid OTP");
                    }
                    if (new Date(user.otpExpiry).getTime() < Date.now()) {
                        throw new Error("OTP has expired");
                    }

                    // Verify user and clear OTP
                    user.isVerified = true;
                    user.otp = undefined;
                    user.otpExpiry = undefined;
                    await user.save();

                    return { id: user._id.toString(), name: user.name, email: user.email };
                }

                // FLOW 2: PASSWORD LOGIN
                if (!credentials.password) {
                    throw new Error("Missing password");
                }

                if (!user.isVerified) {
                    throw new Error("Email not verified");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return { id: user._id.toString(), name: user.name, email: user.email };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    await dbConnect();
                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        // Create new user for Google login
                        const newUser = new User({
                            name: user.name,
                            email: user.email,
                            isVerified: true, // Google emails are verified
                            password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10), // Random password
                        });
                        await newUser.save();
                        user.id = newUser._id.toString();
                    } else {
                        user.id = existingUser._id.toString();
                    }
                    return true;
                } catch (error) {
                    console.log("Error checking if user exists: ", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
