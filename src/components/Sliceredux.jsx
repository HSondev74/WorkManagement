import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     valueuser: JSON.parse(localStorage.getItem("token"))?.user || {}, //value là key có giá trị là data được action bắn lên store sau khi xử lý hàm action
};
//mỗi lần f5 trang dữ liệu sẽ xóa sạch khiến cho acttion không có data mang theo và sẽ luôn khởi tạo là ban đầu nên ở kho của slice ta gán biến
// bằng giá trị dc lấy ra từ local storage nếu có không thì sẽ là giá trị rỗng
export const UserSlice = createSlice({
     name: "user",
     initialState,
     reducers: {
          setUser: (state, action) => {
               state.valueuser = action.payload; // hàm action xử lý : gán state(initialState).value =action.payload(là obj action chưa key là payload và payload là data được bắn lến store)
               console.log(state.value);
               console.log(action.payload);
          }, // đây là action là các hàm sử lý khi được bắn lên store chứa state(là obj khi chứa của slice là cái initialState ) và action={playload}
     },
});

// Action creators are generated for each case reducer function
export const { setUser } = UserSlice.actions; //đây là actions được bắn ra gửi đến store thông qua hàm dispatch() khi sự kiện được kích hoạtt

export default UserSlice.reducer; // đây là slice nằm trong store
