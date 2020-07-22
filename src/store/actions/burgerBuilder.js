import * as actionTypes from './actionTypes';
import Axios from '../../axiox-order';

export const addIngredient=(name)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}

export const removeIngredient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const fetchIngredients=(ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchIngredientsFailed=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients=()=>{
    return dispatch=>{
         Axios.get('https://my-burger-app-decfc.firebaseio.com/ingredients.json')
        .then(res=>{
           dispatch(fetchIngredients(res.data))
        })
        .catch(err=>{
          dispatch(fetchIngredientsFailed())
            
        })
    }
}