const axios = require('axios');

// requete une la base de donnes avec login + password afin de recuperer un token (jwt : json web token)
axios.post('https://gql.alcyone.life/auth/local', { identifier: 'itakad@gmail.com', password: 'itakad2020' })
    .then(function (response) {
        // console.log(response.data)
        // recuperer jwt pour joindre a une requete authentifier
        let jwt = response.data.jwt
        // construire bearer auth token a joindre avec la requete
        console.log(`Bearer ${response.data.jwt}`)
        // recuperer la liste des categories disponibles en base de donnees
        axios.get('https://gql.alcyone.life/Blog-Articles', { headers: { Authorization: `Bearer ${jwt}` }
            }).then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log('error')
            })
            .then(function () {
                console.log('--- --- ---')
            })
            axios.get('https://gql.alcyone.life/Blog-Comments', { headers: { Authorization: `Bearer ${jwt}` }
            }).then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log('error')
            })
            .then(function () {
                console.log('--- --- ---')
            })
    })
    .catch(function (error) {
        console.log('error')
    })
    .then(function () {
        console.log('--- --- ---')
    });