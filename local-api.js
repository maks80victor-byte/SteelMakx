import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: resolve(__dirname, '.env') });

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Mercado Pago
// We use the token from .env. If not present, we log a warning.
const accessToken = process.env.MP_ACCESS_TOKEN;
if (!accessToken) {
    console.warn("WARNING: MP_ACCESS_TOKEN is missing in .env file");
}

const client = new MercadoPagoConfig({ accessToken: accessToken || '' });

// Health check route
app.get('/', (req, res) => {
    res.json({ status: 'API Server is running', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', mercadoPagoConfigured: !!accessToken });
});

app.post('/api/checkout', async (req, res) => {
    try {
        const { items } = req.body;

        console.log('Received checkout request for items:', items?.length);

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Invalid items' });
        }

        const preference = new Preference(client);

        // Ensure a valid URL for back_urls
        const origin = req.headers.origin || 'http://localhost:3000';
        console.log('Using origin for back_urls:', origin);

        const result = await preference.create({
            body: {
                items: items.map((item) => ({
                    id: String(item.id),
                    title: item.name,
                    unit_price: Number(item.price),
                    quantity: Number(item.quantity),
                    picture_url: item.image && item.image.startsWith('http') ? item.image : `https://temp-image-url.com/placeholder.png`,
                })),
                back_urls: {
                    success: `${origin}/?status=success`,
                    failure: `${origin}/?status=failure`,
                    pending: `${origin}/?status=pending`,
                },
                auto_return: 'approved',
            }
        });

        console.log('Preference created:', result.id);
        return res.status(200).json({ preferenceId: result.id });

    } catch (error) {
        console.error('Mercado Pago error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Local API Server running on port ${PORT}`);
    console.log(`Proxy your /api requests to http://localhost:${PORT}`);
});
