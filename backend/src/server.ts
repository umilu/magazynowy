import http from 'node:http';
import { pool } from './db.ts';

const server = http.createServer(async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        if (req.method === 'GET' && req.url === '/products') {
            const result = await pool.query('SELECT id, name, quantity FROM products ORDER BY id');

            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify(result.rows));
            return;
        }
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    } catch (error) {
        console.error(error);
        res.writeHead(500, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
});

server.listen(process.env.PORT, () =>
    console.log(`Server is running on http://localhost:${process.env.PORT}`),
);
