import { combineReducers } from "redux";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
    auth: userReducer
})
export default rootReducer