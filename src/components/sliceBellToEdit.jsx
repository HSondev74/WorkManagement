import { createSlice } from "@reduxjs/toolkit";

const UpdateBell = {
     valueBell: 0,
     isAgainCall: false,
     isAgainCall1: false,
};

export const UpNumBell = createSlice({
     name: "upnumbell",
     initialState: UpdateBell,
     reducers: {
          upnumbell: (state, action) => {
               console.log(action);

               state.valueBell = action.payload;
          },
          handleChangeCall: (state, action) => {
               state.isAgainCall = !state.isAgainCall;
          },
          handleChangeCall1: (state, action) => {
               state.isAgainCall1 = !state.isAgainCall1;
          },
     },
});
export const { upnumbell, handleChangeCall, handleChangeCall1 } =
     UpNumBell.actions;
export default UpNumBell.reducer;
