import { Hono } from 'hono'
import { cors } from 'hono/cors';
import Page from './app/page';
import userApp from './app/controller/user';
import adminApp from './app/controller/admin';
import { requestLogger } from './app/middleware/logger';
import { testMiddleware } from './app/middleware/testMiddleware';

const app = new Hono(
  {
    strict: false
  }
)

console.log("Starting server...")

app.route('/users', userApp)
app.route('/admins', adminApp)

console.log("Load sub routes")

app.use('*', requestLogger);

app.use('*', async (c, next) => {
  const middleware = cors({
    origin: '*'
  })
  return middleware(c, next)
})
// app.use('*', testMiddleware);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/hello', (c) => {
  return c.json({
    name: 'Ethan',
    age: 21,
  })
})

app.get('/search/:id', (c) => {
  const page = c.req.query('page');
  const id = c.req.param('id');
  c.header('X-Message', "Hi!");
  c.header('X-Test', '21');
  return c.text(`Page: ${page}, ID: ${id}`);
})

app.get('/page', (c) => {
  return c.html(<Page />)
})

app.get('/response', (c) => {
  return new Response('Good morning')
})


export default {
  port: 8080,
  fetch: app.fetch,
}
