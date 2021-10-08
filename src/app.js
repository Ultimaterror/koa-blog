// application principale importe les routeurs de articles et comments
// var _ = require('lodash');
const Koa = require('koa');

const koaBody = require('koa-body');

const Router = require('koa-router');

const axios = require('axios');

const app = module.exports = new Koa();

app.use(koaBody({ multipart: true }));

var router = new Router();

async function auth () {
    let jwt = null;
    await axios.post('https://gql.alcyone.life/auth/local', { identifier: 'itakad@gmail.com', password: 'itakad2020' })
    .then(function (response) {
        jwt = response.data.jwt
    })
    .catch(function (error) {
        console.log('error-test')
    })
    .then(function () {
        console.log('--- --- ---')
    });
    // console.log(jwt);
    return jwt
}

router.get('/test/', async (ctx, next) => {
    let jwt = await jwt() 
    console.log(jwt);
    ctx.body = jwt;
})

router.post('/test/:jj', async (ctx, next) => {
    let id = ctx.params.jj
    let author = ctx.request.body.name
    let content = ctx.request.body.content
    console.log(id);
    console.log(author);
    console.log(content);
    ctx.body = 'good';
})

// route all articles
router.get('/articles', async (ctx, next) => {
    let jwt = await auth() 

    let articles = null;
    await axios.get('https://gql.alcyone.life/Blog-Articles', { headers: { Authorization: `Bearer ${jwt}` }
        }).then(function (response) {
            // console.log(response.data)
            articles = response.data
        })
        .catch(function (error) {
            console.log('error1-1')
        })
        .then(function () {
            console.log('--- --- ---')
        })
    ctx.body = articles;
})

// route one article
router.get('/articles/:id', async (ctx, next) => {
    let jwt = await auth()

    let id = ctx.params.id;
    let article = null;
    await axios.get(`https://gql.alcyone.life/Blog-Articles/${id}`, { headers: { Authorization: `Bearer ${jwt}` }
        }).then(function (response) {
            article = response.data
            console.log(article)
        })
        .catch(function (error) {
            console.log('error2-1')
        })
        .then(function () {
            console.log('--- --- ---')
        })
    ctx.body = article;
})

// route post article
router.post('/articles', async (ctx, next) => {
    
    let {name, content, media} = ctx.request.body;
    if(!name){
        ctx.throw('400','name is required field');
    }
    if(!content){
        ctx.throw('400','content is required field');
    }
    
    let jwt = await auth() 

    function convertToSlug(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to   = "aaaaaeeeeeiiiiooooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes

        return str;
    }
    let slug = convertToSlug(name);

    let article = null;
    await axios.post(`https://gql.alcyone.life/Blog-Articles`, { name: name, slug: slug, content: content, media: media}, { headers: { Authorization: `Bearer ${jwt}` }
        }).then(function (response) {
            console.log(response.data)
            article = response.data
        })
        .catch(function (error) {
            console.log('error3-1')
        })
        .then(function () {
            console.log('--- --- ---')
        })
    ctx.body = article;
})

// route put article
router.put('/articles/:id', async (ctx, next) => {
    let jwt = await auth() 

    let article = null;
    let id = ctx.params.id;
    // let slug = null;
    
    let {name, content, media} = ctx.request.body;
    if(name){
        var slug = convertToSlug(name);
    }
    function convertToSlug(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to   = "aaaaaeeeeeiiiiooooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes

        return str;
    }

    await axios.put(`https://gql.alcyone.life/Blog-Articles/${id}`, { name: name, slug: slug, content: content, media: media}, { headers: { Authorization: `Bearer ${jwt}` }
        }).then(function (response) {
            console.log(response.data)
            article = response.data
        })
        .catch(function (error) {
            console.log('error4-3')
        })
        .then(function () {
            console.log('--- --- ---')
        })
    ctx.body = article;
})

// route delete article
router.delete('/articles/:id', async (ctx, next) => {
    let jwt = await auth() 

    let id = ctx.params.id;
    let article = null;
    await axios.delete(`https://gql.alcyone.life/Blog-Articles/${id}`, { headers: { Authorization: `Bearer ${jwt}` }
        }).then(function (response) {
            article = response.data
            console.log(article.name)
        })
        .catch(function (error) {
            console.log('error5-1')
        })
        .then(function () {
            console.log('--- --- ---')
        })
    ctx.body = article;
})

// route all comments
router.get('/comment', async (ctx, next) => {
    let jwt = await auth() 

    let comments = null;
    await axios.get('https://gql.alcyone.life/Blog-Comments', { headers: { Authorization: `Bearer ${jwt}` }
        }).then(function (response) {
            // console.log(response.data)
            comments = response.data
        })
        .catch(function (error) {
            console.log('error6-1')
        })
        .then(function () {
            console.log('--- --- ---')
        })
    ctx.body = comments;
})

// route one comment
router.get('/comment/:id', async (ctx, next) => {
    let jwt = await auth() 

    let id = ctx.params.id;
    let comment = null;
    await axios.get(`https://gql.alcyone.life/Blog-Comments/${id}`, { headers: { Authorization: `Bearer ${jwt}` }
        }).then(function (response) {
            comment = response.data
            console.log(comment)
        })
        .catch(function (error) {
            console.log('error7-1')
        })
        .then(function () {
            console.log('--- --- ---')
        })
    ctx.body = comment;
})

// route post comment
router.post('/comment', async (ctx, next) => {
    let {author, content, blog_article} = ctx.request.body;
    if(!author){
        ctx.throw('400','author is required field');
    }
    if(!content){
        ctx.throw('400','content is required field');
    }
    if(!blog_article){
        ctx.throw('400','article is required field');
    }
    
    let jwt = await auth() 

    let comment = null;
    await axios.post(`https://gql.alcyone.life/Blog-Comments`, { author: author, content: content, blog_article: blog_article}, { headers: { Authorization: `Bearer ${jwt}` }
        }).then(function (response) {
            console.log(response.data)
            comment = response.data
        })
        .catch(function (error) {
            console.log('error8-1')
        })
        .then(function () {
            console.log('--- --- ---')
        })
    ctx.body = comment;
})

// route put comment
router.put('/comment/:id', async (ctx, next) => {
    let {author, content, blog_article} = ctx.request.body;
    
    let jwt = await auth() 

    let comment = null;
    let id = ctx.params.id;
    await axios.put(`https://gql.alcyone.life/Blog-Comments/${id}`, { author: author, content: content, blog_article: blog_article}, { headers: { Authorization: `Bearer ${jwt}` }
        }).then(function (response) {
            console.log(response.data)
            comment = response.data
        })
        .catch(function (error) {
            console.log('error9-1')
        })
        .then(function () {
            console.log('--- --- ---')
        })
    ctx.body = comment;
})

// route delete comment
router.delete('/comment/:id', async (ctx, next) => {
    let jwt = await auth() 

    let id = ctx.params.id;
    let comment = null;
    await axios.delete(`https://gql.alcyone.life/Blog-Comments/${id}`, { headers: { Authorization: `Bearer ${jwt}` }
        }).then(function (response) {
            comment = response.data
            console.log(comment.name)
        })
        .catch(function (error) {
            console.log('error10-1')
        })
        .then(function () {
            console.log('--- --- ---')
        })
    ctx.body = comment;
})


// demarrer l'application
if (!module.parent) {
    app
        .use(router.routes()) // Specify we use a router
        .use(router.allowedMethods()) // All because no specification
        .listen(3000) // localhost:3000/
}