const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Pool } = require('pg');
const client = require('prom-client');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const register = new client.Registry();
client.collectDefaultMetrics({ register });
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  user: process.env.DB_USER || 'chatuser',
  password: process.env.DB_PASSWORD || 'ChatPass123!SecureApp',
  database: process.env.DB_NAME || 'chatdb',
  port: 5432,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('chatMessage', async (msg) => {
    await pool.query('INSERT INTO messages(content) VALUES($1)', [msg]);
    io.emit('message', msg);
  });
});

server.listen(3000, () => console.log('App running on port 3000'));
