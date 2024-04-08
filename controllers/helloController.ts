import axios from 'axios';
import { Request, Response } from 'express';

export const getHello = async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/5');
    res.send(response.data);
  } catch (error) {
    res.send((error as Error).toString());
  }
};