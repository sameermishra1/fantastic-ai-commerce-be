import express from 'express';
import cors from 'cors';
import helloRoutes from './routes/helloRoutes';
import productRoutes from './routes/productRoute';
import { apiRoot } from './builders/commercetoolsBuilder';
const app = express();
app.use(cors()); // Apply CORS middleware
const port = process.env.PORT || 5000;

/**
 * Retrieves the project from the API root.
 * @returns {Promise<any>} A promise that resolves to the project data.
 */
const getProject = () => {
    return apiRoot
      .get()
      .execute();
  };
  
  // Retrieve Project information and output the result to the log
getProject()
    .then(console.log)
    .catch((error) => {
        console.error('Failed to retrieve project information:', error);
        process.exit(1); // Prevent server startup if project retrieval fails
    });


app.use('/', helloRoutes);
app.use('/', productRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});