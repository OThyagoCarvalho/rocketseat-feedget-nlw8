import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const app = express();

var corsOptions = {
  origin: 'https://rocketseat-feedget-alt-nlw8.vercel.app/',
  optionsSuccessStatus: 200 
}


app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, ()=> {
  console.log('http server running!')
});

//SQLite
//PRISMA - ORM: corvert js sintax to sql sintax