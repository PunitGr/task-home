// @flow
import { combineReducers } from "redux";

import membersReducer from "./membersReducer";
import editMemberReducer from "./editMemberReducer";
import showStatusReducer from "./showStatusReducer";

const rootReducer = combineReducers({
    members: membersReducer,
    show: showStatusReducer,
    editId: editMemberReducer
});

export default rootReducer;
