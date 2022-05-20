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

export async function listRecipesByName (title) {
    if (title === "") {
        return [];
    }
    return await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/recipe/${title}`)
                .then((res)=>[res.data.id])
                .catch(err=>console.log(err));
}

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