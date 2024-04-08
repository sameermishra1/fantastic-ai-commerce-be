import express from 'express';
import helloRoutes from './routes/helloRoutes';

const app = express();
const port = 5000;

app.use('/', helloRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});