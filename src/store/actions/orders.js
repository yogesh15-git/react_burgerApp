import * as actionTypes from './actionTypes';
import Axios from '../../axiox-order';

export const purchaseBurgerSuccess=(id,order)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        order:order
    };
};

export const purchaseBurderFail=(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    };
};

export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    };
};
export const purchaseBurger=(order,token)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        Axios.post('/orders.json?auth='+token,order)
        .then(res=>{
            console.log(res.data,'res.data');
            
            dispatch(purchaseBurgerSuccess(res.data,order))
            
        })
        .catch(err=>{
            console.log(err,'err');
            
            dispatch(purchaseBurderFail(err))
            
    })
}
}

export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderStart=()=>{
    return{
        type:actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}

export const fetchOrderfail=(err)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAIL,
        error:err
    }
}

export const fetchOrder=(token,userId)=>{
    return dispatch=>{
        dispatch(fetchOrderStart());
        const querParams='?auth='+ token + '&orderBy="userId"&equalTo="' + userId + '"';
        Axios.get('/orders.json' + querParams)
        .then(res=>{
            const fetchOrders=[]
            for(let i in res.data){
                fetchOrders.push({
                    ...res.data[i],
                    id:i
                })
            }
            dispatch(fetchOrderSuccess(fetchOrders))
            
            
        })
        .catch(err=>{
            dispatch(fetchOrderfail(err))
            
        })
    }
}