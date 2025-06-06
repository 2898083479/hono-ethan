import { Hono } from "hono";
import { serveStatic } from 'hono/bun';
import { ResponseStatus } from "../../response";
import { CreateUserForm } from "../../form/create-user";
import { createUser } from "../../service/user";
import { basicAuth } from 'hono/basic-auth';

const app = new Hono().basePath('/users');
app.use(
    '/*',
    basicAuth({
        username: 'ethan',
        password: '123'
    })
)

app.post('/', async (c) => {
    const form = await c.req.json<CreateUserForm>();
    const user = await createUser(form);
    return c.json({
        status: ResponseStatus.SUCCESS,
        data: user,
        message: 'User created successfully',
    });
});

export default {
    port: 8080,
    fetch: app.fetch,
}
