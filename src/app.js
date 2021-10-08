// application principale importe les routeurs de articles et comments
// var _ = require('lodash');
const Koa = require('koa');

const koaBody = require('koa-body');

const Router = require('koa-router');

const axios = require('axios');

const app = module.exports = new Koa();

app.use(koaBody({ multipart: true }));

var router = new Router();

// function test () {
//     let jwt = null;
//     axios.post('https://gql.alcyone.life/auth/local', { identifier: 'itakad@gmail.com', password: 'itakad2020' })
//     .then(async (response) => {
//         jwt = response.data.jwt
//     })
//     .catch(function (error) {
//         console.log('error1-2')
//     })
//     .then(function () {
//         console.log('--- --- ---')
//     });
//     return jwt;
// }

// route all articles
router.get('/articles', async (ctx, next) => {
    let jwt = null;
    await axios.post('https://gql.alcyone.life/auth/local', { identifier: 'itakad@gmail.com', password: 'itakad2020' })
    .then(async (response) => {
        jwt = response.data.jwt
    })
    .catch(function (error) {
        console.log('error1-2')
    })
    .then(function () {
        console.log('--- --- ---')
    });

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
    let jwt = null;
    await axios.post('https://gql.alcyone.life/auth/local', { identifier: 'itakad@gmail.com', password: 'itakad2020' })
    .then(async (response) => {
        jwt = response.data.jwt
        // console.log(response.data)
    })
    .catch(function (error) {
        console.log('error2-2')
    })
    .then(function () {
        console.log('--- --- ---')
    });

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
    
    let jwt = null;
    await axios.post('https://gql.alcyone.life/auth/local', { identifier: 'itakad@gmail.com', password: 'itakad2020' })
    .then(async (response) => {
        jwt = response.data.jwt
    })
    .catch(function (error) {
        console.log('error3-2')
    })
    .then(function () {
        console.log('--- --- ---')
    });

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
    let jwt = null;
    await axios.post('https://gql.alcyone.life/auth/local', { identifier: 'itakad@gmail.com', password: 'itakad2020' })
    .then(async (response) => {
        jwt = response.data.jwt
    })
    .catch(function (error) {
        console.log('error4-2')
    })
    .then(function () {
        console.log('--- --- ---')
    });

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
    let jwt = null;
    await axios.post('https://gql.alcyone.life/auth/local', { identifier: 'itakad@gmail.com', password: 'itakad2020' })
    .then(async (response) => {
        jwt = response.data.jwt
    })
    .catch(function (error) {
        console.log('error5-2')
    })
    .then(function () {
        console.log('--- --- ---')
    });

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
    ctx.body = 'Hello-World6'
})

// route one comment
router.get('/comment/:id', async (ctx, next) => {
    ctx.body = 'Hello-World7'
})

// route post comment
router.post('/comment', async (ctx, next) => {
    ctx.body = 'Hello-World8'
})

// route put comment
router.put('/comment/:id', async (ctx, next) => {
    ctx.body = 'Hello-World9'
})

// route delete comment
router.delete('/comment/:id', async (ctx, next) => {
    ctx.body = 'Hello-World10'
})


// demarrer l'application
if (!module.parent) {
    app
        .use(router.routes()) // Specify we use a router
        .use(router.allowedMethods()) // All because no specification
        .listen(3000) // localhost:3000/
}