import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbcon';
import User from '@/schema/userschema';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        if (user.isVerified) {
            return NextResponse.json({ message: 'User is already verified' }, { status: 400 });
        }

        // Generate new OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 mins from now

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Bluora - New OTP Request',
            text: `Your new OTP is: ${otp}. It expires in 2 minutes.`,
        });

        return NextResponse.json({ message: 'New OTP sent verified.' }, { status: 200 });

    } catch (error) {
        console.error("Resend OTP Error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
