
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbcon';
import Product from '@/schema/productschema';

export async function GET() {
    await dbConnect();
    try {
        const products = await Product.find({});
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}


