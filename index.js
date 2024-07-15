import express from 'express';
import cors from 'cors';
import routes from './routes/router.js'
import 'dotenv/config';
import { serverLog } from './middleware/logger.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())
app.use(serverLog)

app.use('/', routes)

app.listen(PORT, () => console.log(`Servidor backend iniciado en http://localhost:${PORT}`))