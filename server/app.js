import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import allRoutes from './V2/routes/allRoutes';
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
app.use('/api/v2', allRoutes);
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
});

app.listen(port, () => console.log(`running on ${port}`));

export default app;
