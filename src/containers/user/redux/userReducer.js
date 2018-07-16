const initialState = {
    user: {}
}

const user = (state = initialState, action) => {

    switch (action.type) {
        case "POST_USER_AUTHENTICATE":
            return {
                ...state,
                user: action.payload.user
            };

        default: {
            return {
                ...state
            }
        }
    }
};

export default user;
