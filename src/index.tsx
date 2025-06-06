import { Hono } from 'hono'
import Page from './app/page';

const app = new Hono()

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
  return c.html(<Page/>)
})

app.get('/response', (c) => {
  return new Response('Good morning')
})

export default app;
