const initial = {
    isAuthenticated: false,
    user: null
}

const userReducer = (state = initial, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                isAuthenticated: Boolean(action.payload),
                user: action.payload
            }

        case 'REMOVE_USER':
            return {
                isAuthenticated: false,
                user: null
            }

        default:
            return state
    }
}

export default userReducer