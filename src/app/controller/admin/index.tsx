import { Hono } from "hono";
import { ErrorBoundary, memo } from 'hono/jsx';
import type { FC } from 'hono/jsx'
import { 
    renderToReadableStream, 
    Suspense 
} from "hono/jsx/streaming";

const adminApp = new Hono();

adminApp.use('/admins/*', async (c, next) => {
    await next()
    c.header('X-Message', 'Hello Admin!')
})

adminApp.get('/', (c) => {
    return c.text('Hello Admin!');
})

const Header = memo(() => <header>Welcome to Hono</header>)
const Footer = memo(() => <footer>Powered by Hono</footer>)

const Layout: FC = ({ children }) => (
    <div>
        <Header />
        <p>
            {children}
        </p>
        <Footer />
    </div>
)

adminApp.get('/layout', (c) => {
    return c.html(
        <Layout>
            layout
        </Layout>
    )
})

const AsyncComponent = async () => {
    await new Promise((r) => setTimeout(r, 1000))
    return <div>Done!</div>
}

adminApp.get('/async', (c) => {
    return c.html(
        <Layout>
            <AsyncComponent />
        </Layout>
    )
})

adminApp.get('/async-stream', (c) => {
    const stream = renderToReadableStream(
        <Suspense fallback={<div>Loading...</div>}>
            <Layout>
                <AsyncComponent />
            </Layout>
        </Suspense>
    )
    return c.body(stream, {
        headers: {
            'Content-Type': 'text/html',
        },
    })
})

const ErrorComponent = () => {
    throw new Error('Error!')
    return <div>I am an error</div>
}

adminApp.get('/error', (c) => {
    return c.html(
        <ErrorBoundary fallback={<div>Sorry, Server has been errored</div>}>
            <ErrorComponent />
        </ErrorBoundary>
    )
})



export default adminApp;