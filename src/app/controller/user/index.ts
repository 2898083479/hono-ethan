import { Hono } from "hono";
import { ResponseStatus } from "../../response";
import { CreateUserForm } from "../../form/create-user";
import { createUser } from "../../service/user";
import { basicAuth } from 'hono/basic-auth';

const userApp = new Hono().basePath('/users');
userApp.use(
    '/*',
    basicAuth({
        username: 'ethan',
        password: '123'
    })
)

userApp.post('/', async (c) => {
    const form = await c.req.json<CreateUserForm>();
    const user = await createUser(form);
    return c.json({
        status: ResponseStatus.SUCCESS,
        data: user,
        message: 'User created successfully',
    });
});

export default userApp;
