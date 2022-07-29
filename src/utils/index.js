const axios = require('axios').default;

// recipe functions

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

export async function listRecipesByName (title) {
    if (title === "") {
        return [];
    }
    return await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/recipe/${title}`)
                .then((res)=>[res.data.id])
                .catch(err=>console.log(err));
}

export async function findRecipeByID (id) {
    return await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/recipe/${id}`)
                .then((res)=>[res.data])
                .catch(err=>console.log(err));


}

export async function listRecipeIngredientsByID (id) {
    return await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/recipe/${id}/ingredients/`)
                .then((res)=>[...res.data])
                .catch(err=>console.log(err));
}

// Search feature
export async function listRecipesByIngredient (name) {
    let result = [];
    if (name === "") {
        return result;
    }
    const res = await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/recipe/ingredient/${name}`)
                .then((res)=>res.data)
                .catch(err=>console.log(err));
    res.forEach(item => {
        result.push(item.id)
    });
    return result;
}

export async function listRecipesByCalories (lt, gt) {
    console.log(lt, gt);
    let result = [];
    if (!lt && !gt) {
        return result;
    } else {
        const res = await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/recipe?calories={"lt": ${lt}, "gt": ${gt}}`)
        .then((res)=>res.data)
        .catch(err=>console.log(err));
        res.forEach(item => {
        result.push(item.id)
        });
        return result;
    }   
}

export async function listRecipesByIds (arr) {
    let result = [];
    for (const id of arr) {
            const p = await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/recipe/${id}`)
            result.push(p.data)
    }
    return result;
}

// Recipe CRUD
export async function addRecipe (req) {
    axios({
        method: 'post',
        url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/`,
        data: req
      });
    console.log('Recipe Added!', req)
}

export async function editRecipe (req) {
    axios({
        method: 'patch',
        url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/${req.id}`,
        data: req
      });
    console.log('Request Sent!', req)
}

export async function removeRecipe (id) {
    axios({
        method: 'delete',
        url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/${id}`
      });
    console.log('Item Removed!', "id", id)
}


// ingredient fucntions

export async function listIngredients () {
    return await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/ingredient`)
                .then((res)=>res.data)
                .catch(err=>console.log(err));
}

export async function addIngridentToRecipe (recipeID, req) {
    axios({
        method: 'post',
        url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/${recipeID}/ingredient`,
        data: req
      });
    console.log('Ingredient is added into a Recipe!', req)
}

// image function

export async function listImages (recipeID, req) {
    return await axios.get('https://picsum.photos/v2/list').then((res)=>res.data)
    .catch(err=>console.log(err));
}