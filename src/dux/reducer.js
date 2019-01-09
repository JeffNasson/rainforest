const initialState={
    customer:{},
    search:''
}

const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER'
const UPDATE_SEARCH = 'UPDATE_SEARCH'

export const updateCustomer = (userData) =>{
    return{
        type: UPDATE_CUSTOMER,
        payload: userData
    }
}

export const updateSearch = (searchData) =>{
    return{
        type:UPDATE_SEARCH,
        payload: searchData
    }
}

function reducer(state=initialState,action){
    switch(action.type){

        case UPDATE_CUSTOMER:
            return{...state, customer: action.payload}
        
        case UPDATE_SEARCH:
            return{...state,search:action.payload}

        default: return state
    }
}

export default reducer;