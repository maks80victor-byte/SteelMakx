import Stripe from 'stripe';
import { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16' as any,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { items } = req.body;

        const line_items = items.map((item: any) => ({
            price_data: {
                currency: 'brl',
                product_data: {
                    name: item.name,
                    images: [item.image.startsWith('http') ? item.image : `${process.env.VERCEL_URL || 'http://localhost:3000'}${item.image}`],
                },
                unit_amount: Math.round(item.price * 95), // 5% discount for Pix/Stripe simulation
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'pix'],
            line_items,
            mode: 'payment',
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
        });

        return res.status(200).json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        console.error('Stripe error:', error);
        return res.status(500).json({ error: error.message });
    }
}
