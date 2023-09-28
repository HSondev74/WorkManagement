import React, { useEffect, useRef, useState } from "react";
import "./Antd.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setUser } from "./Sliceredux";
import Test from "./test";
import Dropdownbell from "./Dropdownbell";
export default function Login() {
     const LoginSuccess = useNavigate();
     const [x, setX] = useState(true);
     const InputEmail = useRef();
     const InputPassword = useRef();
     const [messageApi, contextHolder] = message.useMessage();
     const [messageApiSuccess, contextHolderSuccsess] = message.useMessage();
     const key = "updatable";
     const checkbox = useRef();
     const [check, setCheck] = useState(false);
     const usedipatch = useDispatch();
     function HandleSubmitLogin(e) {
          setX(!x);
          e.preventDefault();
          let data = JSON.stringify({
               identifier: `${InputEmail.current.value}`,
               password: `${InputPassword.current.value}`,
          });
          let config = {
               method: "post",
               maxBodyLength: Infinity,
               url: "auth/local", // lấy base bên file axios.jsx
               headers: {}, //lấy base axios bên file axios.jsx
               data: data,
          };
          axios.request(config)
               .then((response) => {
                    window.localStorage.setItem(
                         "token",
                         JSON.stringify(response.data)
                    );
                    usedipatch(setUser(response.data.user));
                    messageApiSuccess.open({
                         key,
                         type: "loading",
                         content: "Loading...",
                    });
                    setTimeout(() => {
                         LoginSuccess("/homepage");
                    }, 5000);
                    setTimeout(() => {
                         messageApiSuccess.open({
                              key,
                              type: "success",
                              content: "Login Success!",
                              duration: 3,
                         });
                    }, 3000);
               })
               .catch((error) => {
                    alert("login failed");
               });
     }
     return (
          <div className="h-[100vh] w-[100vw]  Login flex justify-center items-center relative">
               {contextHolderSuccsess}
               <div className="w-[25%] h-[70%] bg-black opacity-40 absolute top-25 left-30 rounded-3xl"></div>

               <div className="w-[25%] h-[70%] ">
                    <h1 className="text-2xl mt-10 font-bold text-[#a4c0d5] relative z-10 text-center">
                         LOGIN TO OURS SHOP
                    </h1>
                    <div className="flex flex-col relative z-10 text-[#a4c0d5] w-full items-center mt-10 ">
                         <form
                              action=""
                              onSubmit={HandleSubmitLogin}
                              className="w-[80%] flex flex-col gap-y-4"
                         >
                              <div className="flex flex-col">
                                   <label
                                        htmlFor="email"
                                        className="text-left cursor-pointer"
                                   >
                                        Your Email:
                                   </label>
                                   <input
                                        type="email"
                                        id="email"
                                        className="outline-none text-black pl-0 rounded-full h-[30px] pl-3"
                                        ref={InputEmail}
                                   />
                              </div>
                              <div className="flex flex-col">
                                   <label
                                        htmlFor="pass"
                                        className="text-left cursor-pointer"
                                   >
                                        Your Password:
                                   </label>
                                   <input
                                        type="password"
                                        id="pass"
                                        className="outline-none text-black pl-0 rounded-full h-[30px] pl-3"
                                        ref={InputPassword}
                                   />
                              </div>
                              <div className="flex gap-1">
                                   <input
                                        onClick={() => {
                                             setCheck(!check);
                                        }}
                                        ref={checkbox}
                                        type="checkbox"
                                        className=""
                                        defaultChecked={check}
                                   />
                                   Remember me !
                              </div>
                              <input
                                   type="submit"
                                   value={"Login"}
                                   className="bg-white text h-[35px] mt-1 text-black font-extrabold rounded-full cursor-pointer"
                              />
                         </form>
                    </div>
               </div>
               <Test />
          </div>
     );
}
