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

export async function getIngredientsByRecipeID (id) {
    return await axios.get(`https://fast-recipe-api-psql.herokuapp.com/api/recipe/${id}/ingredients/`)
                    .then((res)=>res.data)
                    .catch(err=>console.log(err));
}

export async function addIngredientToRecipe (recipeID, req) {
    axios({
        method: 'post',
        url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/${recipeID}/ingredient`,
        data: req
      });
}

// Add Multiple Ingredients to a recipe
export async function addIngredientsToRecipe (recipeID, reqList) {
    
    if (reqList.length <= 0 ) {
        axios({
            method: 'post',
            url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/${recipeID}/ingredient`,
            data: {
                ingredientID: 11,
                amount: "N/A"
            }
          });
        return;
    }
    reqList.forEach((req) => {
        axios({
            method: 'post',
            url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/${recipeID}/ingredient`,
            data: req
            });
    })
}

export async function editIngredientToRecipe (recipeToIngreID, req) {
    axios({
        method: 'patch',
        url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/ingredient/${recipeToIngreID}`,
        data: req
      });
      console.log('editIngredientToRecipe!', req)
}

export async function removeIngredientToRecipe (recipeToIngreID) {
    axios({
        method: 'delete',
        url: `https://fast-recipe-api-psql.herokuapp.com/api/recipe/ingredient/${recipeToIngreID}`
      });
      console.log('removeIngridentToRecipe!', recipeToIngreID)
}

export async function removeIngredientsToRecipe (arr) {
    arr.forEach(recipeToIngreID => removeIngredientToRecipe(recipeToIngreID));
}

export async function addIngredient (req) {
    return axios.post('https://fast-recipe-api-psql.herokuapp.com/api/ingredient', req)
      .then((res)=>res.data.id)
      .catch((error) =>{
        console.log(error);
      }); 
}

export async function addIngredientWhenNotExist (item) {
    if(item.name) {
        let id = await getIngredientIDbyName(item.name);
  
        if (id) {
          return {
            ingredientID: id,
            amount: item.amount
          }
        }
  
        if (!id) { 
          let newID = await addIngredient({ name: item.name })
          return {
            ingredientID: newID,
            amount: item.amount }
        } 
      } 
    return;
}

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

export async function handleUploadImage (image, reqFunc, isEdit) {

    if (isEdit) {
        reqFunc();
        return; 
    }
    if (image == null) {
        reqFunc('https://firebasestorage.googleapis.com/v0/b/fast-recipe-7aa79.appspot.com/o/recipe_image%2Fno-image.png?alt=media&token=dcbede3d-a115-4785-bfb9-1d91054b277f');
        return;
    }
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    await uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
          return url
      }).then(url=> reqFunc(url));
    });
}

  