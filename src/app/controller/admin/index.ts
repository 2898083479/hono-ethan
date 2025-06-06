import { Hono } from "hono";

const adminApp = new Hono().basePath('/admin');

adminApp.get('/', (c) => {
    return c.text('Hello Admin!');
})

export default adminApp;