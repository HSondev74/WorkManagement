import { createSlice } from "@reduxjs/toolkit";

const numberofbell = {
     valueBell: 0,
};

export const NumberBell = createSlice({
     name: "numberbell",
     initialState: numberofbell,
     reducers: {
          numberbell: (state, action) => {
               state.valueBell = action.payload;
          },
     },
});
export const { numberbell } = NumberBell.actions;
export default NumberBell.reducer;
