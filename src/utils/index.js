const axios = require('axios').default;

export async function listRecipes (n) {
    if (n !== undefined) {
        return await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/recipe?limit=${n}`)
                .then((res)=>res.data)
                .catch(err=>console.log(err));
    }
    return await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/recipe`)
                .then((res)=>res.data)
                .catch(err=>console.log(err));
}