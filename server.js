import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// IMPORTS
import router from './routes/routes.js';

app.use('/index', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use('/', router);

app.listen(process.env.MYSQLPORT, () => {
    console.log(`Server is running on port ${process.env.MYSQLPORT}`);
}); 