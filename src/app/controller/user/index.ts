import { Hono } from "hono";
import { ResponseStatus } from "../../response";
import { CreateUserForm } from "../../form/create-user";
import { createUser } from "../../service/user";
import { requestLogger } from "../../middleware/logger";
import { getCookie, setCookie } from "hono/cookie";

const userApp = new Hono();
// userApp.use(
//     '/*',
//     basicAuth({
//         username: 'ethan',
//         password: '123'
//     })
// )

userApp.use('*', requestLogger);

userApp.post('/', async (c) => {
    const form = await c.req.json<CreateUserForm>();
    const user = await createUser(form);
    setCookie(c, 'user', form.email);
    return c.json({
        status: ResponseStatus.SUCCESS,
        data: user,
        message: 'User created successfully',
    });
});


userApp.get('/hello', (c) => {
    return c.json({
        message: 'Hello World',
    });
});


export default userApp;
