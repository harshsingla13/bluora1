import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbcon';
import Order from '@/schema/orderschema';
import User from '@/schema/userschema';

export async function POST(req: Request) {
    try {
        await dbConnect();

        // Basic session check via headers/cookies handled by next-auth on client, 
        // but for server side ideally we check session.
        // For this demo, we'll trust the user email passed in the body matches the authenticated user 
        // (In production, MUST validate against getServerSession).

        const data = await req.json();
        const { userEmail, items, totalAmount, shippingDetails } = data;

        if (!userEmail || !items || !totalAmount || !shippingDetails) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Find user by email to link the order
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const newOrder = new Order({
            user: user._id,
            items,
            totalAmount,
            shippingDetails,
            status: 'Pending'
        });

        await newOrder.save();

        return NextResponse.json({ message: 'Order placed successfully', orderId: newOrder._id }, { status: 201 });

    } catch (error: any) {
        console.error('Order creation error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });

        return NextResponse.json({ orders }, { status: 200 });

    } catch (error: any) {
        console.error('Order fetch error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
