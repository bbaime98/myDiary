import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './V2/routes/userRoutes';
import entryRoutes from './V2/routes/entryRoutes';
import Response from './V2/helpers/Response';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use('/api/v2', userRoutes);
app.use('/api/v2', entryRoutes);
app.get('/', (_req, res) => {
  res.status(200).send({
    status: 200,
    message:
      'Welcome to MyDiary'
  });
});


app.use('/*', (_req, res) => Response.errorResponse(res, 404, 'Route Not Found'));

app.use((error, _req, res, _next) => {
  if (error.status === 400) {
    return Response.errorResponse(res, error.status, 'Syntax error, Please double check your input');
  }
  return Response.errorResponse(res, 500, 'Something went wrong, server is down');
});

app.listen(port);

export default app;
