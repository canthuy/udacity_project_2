import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './handlers/product';
import userRoutes from './handlers/user';
import orderRoutes from './handlers/order';

const app: express.Application = express();
const port: number = 3000;

app.use(bodyParser.json());

app.get('/', function (req: express.Request, res: express.Response) {
  res.send('Welcome to my project!');
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(port, function () {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
