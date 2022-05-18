const axios = require('axios').default;

export function test () {
    return axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/recipe`)
                .then((res)=>console.log(res))
                .catch(err=>console.log(err));
}