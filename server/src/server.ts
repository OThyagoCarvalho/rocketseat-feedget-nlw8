import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const app = express();

var corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200 
}


app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, ()=> {
  console.log('http server running!')
  console.log(process.env.CORS_ORIGIN)
});

//SQLite
//PRISMA - ORM: corvert js sintax to sql sintax