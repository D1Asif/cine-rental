const initialState = {
    cartData:[]
}

const cartReducer = (state, action) => {
    switch(action.type) {
        case 'added': {
            return {
                ...state,
                cartData: [
                    ...state.cartData,
                    action.payLoad
                ]
            }
        }

        case 'removed': {
            return {
                ...state,
                cartData: state.cartData.filter(item => item.id !== action.payLoad.id)
            }
        }

        default: {
            return state;
        }
    }
}

export {
    initialState,
    cartReducer
}