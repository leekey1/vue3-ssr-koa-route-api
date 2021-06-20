const Koa = require('koa');
const app = new Koa();
const path = require('path')
const Router = require('koa-router');
const fs = require('fs');
const { renderToString } = require("@vue/server-renderer");


let port = 8080

let server = require('http').createServer(app.callback());

app.use(require('koa-static')(__dirname + '/dist'));

require('koa-qs')(app)
app.use(require('koa-bodyparser')());



let testDatas = [
    {
        title:"title 1"
        ,conctent:"conctent 1"
    },
    {
        title:"title 2"
        ,conctent:"conctent 2"
    }
]

let router = new Router();

router.get('/api', async function (ctx, next) {
    ctx.body = testDatas
});
app.use(router.routes()).use(router.allowedMethods())

let viewPath = path.join(__dirname, "dist/index.html");
let appPath = path.join(__dirname, "distssr/js/server");
const createSSRApp = require(appPath).default;


app.use(async ctx => {
    const app = await createSSRApp(ctx);
    const appContent = await renderToString(app);
    let temp = fs.readFileSync(viewPath, {encoding: 'utf-8'});
    ctx.body = temp.replace('{{appContent}}',appContent)
});


server.listen(port, function () {
    console.log("start " + port)
});

