import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleChangeCall1 } from "./sliceBellToEdit";
export default function Dropdownbell({ arritem, leave }) {
     const [active2, setActive2] = useState(null);
     const gotodetail = useNavigate();
     const dispatchgodetail = useDispatch();
     function Leavenotifi() {
          leave();
     }
     useEffect(() => {
          if (active2 === null) {
               return;
          }
          axios.get(`tasks/${arritem[active2]?.id}`).then(() => {
               gotodetail(`/homepage/${arritem[active2]?.id}`);
          });
     }, [active2]);
     return (
          <div className="relative">
               <div
                    onMouseLeave={Leavenotifi}
                    className="absolute top-[66px] left-[-56px]"
               >
                    <div className="w-[80px] h-[50px] flex justify-center left-0 absolute z-10 top-[-27px]">
                         <div className="w-[30px] h-[10px] border-[15px] border-b-[#97bfdd] border-solid border-transparent"></div>
                    </div>
                    <div className="bg-[#97bfdd] w-[250px] h-[300px] rounded-[20px] flex flex-col gap-y-2 pt-5">
                         {arritem.map((item, index) => {
                              return (
                                   <div
                                        key={item.id}
                                        className="h-[50px] bg-white rounded-full text-black cursor-pointer text-[10px]"
                                        onClick={() => {
                                             setActive2(index);
                                             setTimeout(() => {
                                                  dispatchgodetail(
                                                       handleChangeCall1()
                                                  );
                                             }, 100);
                                        }}
                                   >
                                        <div className="flex  justify-center items-center w-full h-full">
                                             <div className=" relative z-40 flex items-center w-full h-full">
                                                  <div className="w-[30px] h-[30px] rounded-full ml-5">
                                                       <img
                                                            className="w-[100%] h-full object-cover rounded-full"
                                                            src={`https://xsgames.co/randomusers/avatar.php?g=pixel&${item.id}`}
                                                            alt=""
                                                       />
                                                  </div>
                                                  <div className="w-[70%] flex justify-center gap-x-[10px] h-full items-center  ">
                                                       <span>ID:{item.id}</span>
                                                       <span>
                                                            Complete:
                                                            {item?.attributes
                                                                 ?.complete +
                                                                 ""}
                                                       </span>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              );
                         })}
                    </div>
               </div>
          </div>
     );
}
