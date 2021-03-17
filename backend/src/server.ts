import express from 'express';
import 'express-async-errors';
import path from 'path';



import './database/connection';
import routes from './routes';
import errorHandler from './errors/handler';


const app = express();



app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(3333, () => {
    console.log('Server started!');
});

