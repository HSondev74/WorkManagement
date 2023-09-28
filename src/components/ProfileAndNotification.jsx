import React, { useState, useEffect } from "react";
import { BellOutlined } from "@ant-design/icons";
import axios from "axios";
import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Dropdownbell from "./Dropdownbell";
const styles = {
     color: "red",
};
export default function ProfileAndNotification() {
     const [countbell1, setCountbell1] = useState(0);

     const [Itemfalse, setItemfalse] = useState([]);
     const isAgainCall = useSelector((chuong) => chuong.upnumbell.isAgainCall);
     const [shownotifi, setShownotifi] = useState(false);
     function Showdetail() {
          setShownotifi(!shownotifi);
          setCountbell1(0);
     }
     function Leave() {
          setShownotifi(!shownotifi);
     }
     useEffect(() => {
          axios.get(
               "https://backoffice.nodemy.vn/api/tasks?pagination[page]=1&pagination[pageSize]=4&filters[complete][$eq]=false&sort[0]=createdAt:desc"
          ).then((response) => {
               setCountbell1(response?.data?.meta?.pagination?.total);
               setItemfalse(response?.data?.data);
          });
     }, [isAgainCall]);

     return (
          <div className="flex">
               <div
                    onClick={Showdetail}
                    className="flex items-center gap-x-[100px] w-[35px] "
               >
                    <Badge
                         count={countbell1}
                         overflowCount={1000}
                         size="default"
                         shape="square"
                    >
                         <BellOutlined
                              style={{ fontSize: "30px", color: "#fff" }}
                              className="bell "
                         />
                    </Badge>
               </div>
               {shownotifi ? (
                    <Dropdownbell arritem={Itemfalse} leave={Leave} />
               ) : (
                    <></>
               )}
          </div>
     );
}
