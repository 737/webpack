

const Koa = require('koa');
const app = new Koa();
const Webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackdevmiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const PassThrough = require('stream').PassThrough;

let devMiddleware = (oCompiler, opts) => {
    let _middleware = webpackdevmiddleware(oCompiler, opts);

    return async (ctx, next) => {

        await _middleware(ctx.req, {
            end: (content) => {
                ctx.body = content
            },
            setHeader: (name, value) => {
                ctx.set(name, value)
            }
        }, next)
    };
};


const hotMiddleware = (compiler, opts) => {
    const middleware = webpackHotMiddleware(compiler, opts);
    return async (ctx, next) => {
        let stream = new PassThrough()
        ctx.body = stream
        await middleware(ctx.req, {
            write: stream.write.bind(stream),
            writeHead: (status, headers) => {
                ctx.status = status
                ctx.set(headers)
            }
        }, next)
    }
    
}



// app.use(ctx => {
//     ctx.body = 'hello koa2'
// })

const compiler = Webpack(webpackConfig);

app.use(devMiddleware(compiler));
app.use(hotMiddleware(compiler));



app.listen(3000)
console.log('[demo] start-quick is starting at port 3000');



