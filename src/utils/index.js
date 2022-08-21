import Resizer from "react-image-file-resizer";
import storage from "../firebase.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
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

export async function listRecipesByName (name) {
    let result = [];
    if (name === "") {
        return result;
    }
    const res = await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/recipe/${name}`)
                .then((res)=>res.data)
                .catch(err=>console.log(err));
    res.forEach(item => {
        result.push(item.id)
    });
    return result;
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
    const res = await axios({
        method: 'post',
        url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/`,
        data: req
      }).then((res)=>res.data.id)
        .catch(err=>console.log(err));
    return res;
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


// ingredient functions

export async function listIngredients () {
    return await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/ingredient`)
                .then((res)=>res.data)
                .catch(err=>console.log(err));
}

export async function getIngredientIDbyName (name) {
    return await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/ingredient/${name}`)
                .then((res)=>{
                    if(res.data.length <= 0){
                        return false;
                    }
                    if(res.data[0].id) {
                        return res.data[0].id;
                    }   
                })
                .catch(err=>console.log(err));
}

export async function addIngredientToRecipe (recipeID, req) {
    axios({
        method: 'post',
        url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/${recipeID}/ingredient`,
        data: req
      });
    // console.log('Ingredient is added into a Recipe!', req)
}

// Add Multiple Ingredients to a recipe
export async function addIngredientsToRecipe (recipeID, reqList) {
    console.log('Add Multiple ingredients', recipeID, reqList)
    reqList.forEach((req) => {
        axios({
            method: 'post',
            url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/${recipeID}/ingredient`,
            data: req
          });
    })
}

export async function editIngridentToRecipe (recipeToIngreID, req) {
    axios({
        method: 'patch',
        url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/ingredient/${recipeToIngreID}`,
        data: req
      });
      console.log('editIngredientToRecipe!', req)
}

export async function removeIngridentToRecipe (id) {
    axios({
        method: 'delete',
        url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/ingredient/${id}`
      });
      console.log('removeIngridentToRecipe!', id)
}

export async function addIngredient (req) {
    return axios.post('https://fast-recipe-api-psql.herokuapp.com/api/ingredient', req)
      .then((res)=>res.data.id)
      .catch((error) =>{
        console.log(error);
      }); 
}


// return await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/recipe?limit=${n}`)
//                 .then((res)=>res.data)
//                 .catch(err=>console.log(err));
// image function

export function resizeFile (file) {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          654,
          404,
          "JPG",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "file",
          327,
          202
        );
      });
}

export async function handleUploadImage (image, reqFunc) {
    if (image == null) {
        reqFunc();
        return;
    }
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    await uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
          return url
      }).then(url=> reqFunc(url));
    });
}

  