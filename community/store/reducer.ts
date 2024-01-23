import { combineReducers } from "redux";

import statusSlice from "@/slices/status";

const rootReducer = combineReducers({
  user: statusSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
