import {
    actionNames
} from "../../actions";

export default (state = {
    error: false,
    loading: false,
    success: false
}, action) => {
    switch (action.type) {
        default:
            return state;
    }
}