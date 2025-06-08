import { MiddlewareHandler } from "hono";
import pino from "pino";

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
        }
    }
});

export const requestLogger: MiddlewareHandler = async (c, next) => {
    logger.info(`[${new Date().toISOString()}] ${c.req.method} ${c.req.path}`);
    await next();
}