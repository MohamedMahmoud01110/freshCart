import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Function to get prerender parameters for routes with dynamic segments like :id
 */
function getPrerenderParams(route: string) {
  const params = [];

  // مسار product-details/:id
  if (route.startsWith('/product-details/')) {
    const id = route.split('/')[2];  // استخراج الـ id من المسار
    params.push({ id });
  }

  // مسار checkout/:id
  if (route.startsWith('/checkout/')) {
    const id = route.split('/')[2];  // استخراج الـ id من المسار
    params.push({ id });
  }

  return params;
}

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  // التعامل مع requests الموجهة إلى الـ Angular Universal app
  const prerenderParams = getPrerenderParams(req.url);
  angularApp
    .handle(req, { prerenderParams })
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Fallback for any unmatched routes
 */
app.get('*', (req: express.Request, res: express.Response) => {
  res.render('index', { req });
});

app.use('*', (req, res, next) => {
  res.json({
    message: 'Page Not Found',
  });
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
