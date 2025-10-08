import 'dotenv/config';

import express, { Request, Response, NextFunction, response } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { authRouter } from './module/auth/auth.router';
import { userRouter } from './module/user/user.routes';
import { handleError } from './utils/exception';
import session, { Session } from 'express-session';
import { isProduction } from './config/app.config';
import { get } from 'node:http';
import { getEnvOrThrow } from './utils/utils';
import { responseEnhancer } from './middlewares/response.middleware';
//import { multerGlobalMiddleware } from './utils/global-middleware';
import './services/mongoose.service';

// const PORT = 4000;
//const PORT = process.env.PORT;
const PORT = getEnvOrThrow('PORT');
console.log('process.env.PORT',process.env.PORT);

export const app = express();

// global middleware that handle parseing the request and call next under the hood
app.use((req, res, next) => {
  console.log(req.path, 'is hit');
  next();
});

app.use(express.json());
app.use(express.urlencoded());
app.use(responseEnhancer);
Buffer.from(JSON.stringify({
   'alg': 'hs265' ,
    'typ': 'jwt'
  }),'base64url');
app.use(
  session({
    secret: String(getEnvOrThrow('SESSION_SECRET')),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: isProduction, maxAge: 1000 * 60 * 60 * 24 * 30 }
  })
);

app.use(
  express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
      res.setHeader('cache-control', `public max-age=${5}`);
    }
  })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter); // auth router
//app.use(multerGlobalMiddleware)
// app.use('/users', authMiddleware);


const notFoundPath = path.join(__dirname, 'public', '404.html');

// Read the 404.html template for dynamic content
const NotFoundPageHTML = fs.readFileSync(notFoundPath, 'utf8');

// fallback for any un defined route --> 404
app.use((req: Request, res: Response) => {
  // Check if it's an API route
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: `Route ${req.method} ${req.path} not found`
    });
  }

  const dynamicHtml = NotFoundPageHTML.replace(/{{requestedPath}}/g, req.path)
    .replace(/{{method}}/g, req.method)
    .replace(/{{timestamp}}/g, new Date().toLocaleString());

  // For static files, use the dynamic 4c04 template

  res.status(404).send(dynamicHtml);
});
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  handleError(error, res);
});
if(process.env.NODE_ENV !== 'test'){

app.listen(PORT, () => {
  console.log('App is running in port: ', PORT);
})}