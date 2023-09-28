import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Sliceredux";
import NumberBell from "./slicebell";
import UpNumBell from "./sliceBellToEdit";
export const store = configureStore({
     reducer: {
          valueuserprint: UserSlice, // initialState:value
          numberbell: NumberBell,
          upnumbell: UpNumBell,
     },
});
