// instance api axios tests de toutes les routes dispo sur app.js
const axios = require('axios');

// get all articles  OK
axios.get('http://localhost:3000/articles/')
    .then(function (response) {
        console.log('All articles');
        console.log(response.data);
    })
    .catch(function (error) {
        console.log('error');
    })
    .then(function () {
        console.log('--- --- ---');
    }
);

// get one article  OK
axios.get('http://localhost:3000/articles/4')
    .then(function (response) {
        console.log('One article');
        console.log(response.data);
    })
    .catch(function (error) {
        console.log('error');
    })
    .then(function () {
        console.log('--- --- ---');
    }
);

// post one article  OK
// axios.post('http://localhost:3000/articles/', {name: "test-Alex", content: "bilibilibili"})
//     .then(function (response) {
//         console.log('Post article');
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.log('error');
//     })
//     .then(function () {
//         console.log('--- --- ---');
//     }
// );

// put/modify one article  OK
// axios.put('http://localhost:3000/articles/4', {name: "Golf-Alex", content: "Hole-in-one"})
//     .then(function (response) {
//         console.log('Put/Modify article');
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.log('error');
//     })
//     .then(function () {
//         console.log('--- --- ---');
//     }
// );

// delete one article
// axios.delete('http://localhost:3000/articles/8')
//     .then(function (response) {
//         console.log('Delete article');
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.log('error');
//     })
//     .then(function () {
//         console.log('--- --- ---');
//     }
// );

// get all comments
axios.get('http://localhost:3000/comment')
    .then(function (response) {
        console.log('All comments');
        console.log(response.data);
    })
    .catch(function (error) {
        console.log('error');
    })
    .then(function () {
        console.log('--- --- ---');
    }
);

// get one comment
axios.get('http://localhost:3000/comment/1')
    .then(function (response) {
        console.log('One comment');
        console.log(response.data);
    })
    .catch(function (error) {
        console.log('error');
    })
    .then(function () {
        console.log('--- --- ---');
    }
);

// post one comment
axios.post('http://localhost:3000/comment')
    .then(function (response) {
        console.log('');
        console.log(response.data);
    })
    .catch(function (error) {
        console.log('error');
    })
    .then(function () {
        console.log('--- --- ---');
    }
);

// put/modify one comment
axios.put('http://localhost:3000/comment/1')
    .then(function (response) {
        console.log('Put/modify comment');
        console.log(response.data);
    })
    .catch(function (error) {
        console.log('error');
    })
    .then(function () {
        console.log('--- --- ---');
    }
);

// delete one comment
axios.delete('http://localhost:3000/comment/2')
    .then(function (response) {
        console.log('');
        console.log(response.data);
    })
    .catch(function (error) {
        console.log('error');
    })
    .then(function () {
        console.log('--- --- ---');
    }
);