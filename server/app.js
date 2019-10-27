import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.get('/', (_req, res) => {
  res.status(200).send({
    status: 200,
    message:
      'Welcome to MyDiary'
  });
});


app.use('/*', (_req, res) => {
  res.status(404).send({ status: 404, error: 'Route Not Found' });
});

app.use((error, _req, res, _next) => {
  if (error.status === 400) {
    return res.status(error.status).json({
      error: {
        message: 'Syntax error, Please double check your input'
      }
    });
  }
});

app.listen(port);

export default app;
