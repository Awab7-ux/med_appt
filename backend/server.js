import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import authRoutes from './routes/auth.js';

const app = express();
const port = Number(process.env.PORT) || 8181;

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use((error, _request, response, _next) => {
  console.error(error);
  if (error.name === 'ValidationError') return response.status(400).json({ message: 'Please check the submitted information.' });
  return response.status(500).json({ message: 'The server could not complete your request.' });
});

const server = app.listen(port, () => console.log(`StayHealthy API listening on port ${port}`));
let memoryServer;

async function connectDatabase() {
  const configuredUri = process.env.MONGO_URI?.trim();
  const useMemoryDatabase = !configuredUri || /CLUSTER|USERNAME/i.test(configuredUri);

  try {
    let uri = configuredUri;
    if (useMemoryDatabase) {
      console.log('Using in-memory MongoDB for local development.');
      memoryServer = await MongoMemoryServer.create();
      uri = memoryServer.getUri();
    } else {
      console.log('Using MongoDB connection from MONGO_URI.');
    }

    await mongoose.connect(uri);
    console.log(useMemoryDatabase ? 'Connected to in-memory MongoDB.' : 'Connected to MongoDB from MONGO_URI.');
  } catch (error) {
    console.error(`Could not connect to ${useMemoryDatabase ? 'in-memory MongoDB' : 'MONGO_URI'}:`, error.message);
    console.error(`StayHealthy API remains available on port ${port}, but database-backed routes will not work until MongoDB connects.`);
    if (memoryServer) await memoryServer.stop().catch(() => {});
  }
}

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is missing. Set it in backend/.env before using authentication routes.');
}

connectDatabase();

function shutdown() {
  server.close(() => {
    mongoose.disconnect().finally(() => memoryServer?.stop().finally(() => process.exit(0)));
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);