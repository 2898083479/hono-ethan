import { MiddlewareHandler } from "hono";

export const testMiddleware: MiddlewareHandler = async (c, next) => {
    console.log("testMiddleware")
    await next()
}