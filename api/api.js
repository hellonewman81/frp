import feathers from 'feathers';
import morgan from 'morgan';
// import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import multer from 'multer';
// import socketio from 'feathers-socketio';
import config from './config';
// import services from './services';
import { actionHandler, logger, notFound, errorHandler } from './middleware';
// import auth from './services/authentication';

process.on('unhandledRejection', error => console.error(error));

const app = feathers();

app
  .set('config', config)
  .use(morgan('dev'))
  .use(cookieParser())
  /*
    .use(session({
      secret: 'sb_react_app',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }))
  */
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(multer({ storage: multer.memoryStorage(), limits: { fieldSize: 10000000 } }).single('photo'))
  // Core
  .configure(hooks())
  .configure(rest())
  // .configure(socketio({ path: '/ws' }))
  // .configure(auth)
  .use(actionHandler(app))
  // .configure(services)
  // Final handlers
  .use(notFound())
  .use(logger(app))
  .use(errorHandler());

if (process.env.APIPORT) {
  app.listen(process.env.APIPORT, err => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', process.env.APIPORT);
    console.info('==> 💻  Send requests to http://localhost:%s', process.env.APIPORT);
  });
} else {
  console.error('==>     ERROR: No APIPORT environment variable has been specified');
}
