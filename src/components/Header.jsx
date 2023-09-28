import React from "react";
import Menu from "./Menu";
import ProfileAndNotification from "./ProfileAndNotification";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
export default function Header() {
     return (
          <>
               <div className="h-[10%] w-full flex justify-between bg-gradient-to-r from-[#a4c0d5] to-[#60a3d6]  px-16 fixed z-50 ">
                    <HomePageName />
                    <Menu />
                    <div className="flex gap-x-16">
                         <ProfileAndNotification />
                         <div className="flex items-center">
                              <DropDownName />
                         </div>
                    </div>
               </div>
          </>
     );
}
function HomePageName() {
     const titlenav = useNavigate();
     function HandleClickToHomePage() {
          titlenav("/homepage");
     }
     return (
          <div className="flex items-center h-full ">
               <h1
                    onClick={HandleClickToHomePage}
                    className="text-5xl font-bold text-[#fff] cursor-pointer"
               >
                    My Shop
               </h1>
          </div>
     );
}
function DropDownName() {
     const username = useSelector((x) => x.valueuserprint.valueuser);
     const GotoLogin = useNavigate();
     const items = [
          {
               label: <div>Profile</div>,
               key: "0",
          },
          {
               label: (
                    <div
                         onClick={() => {
                              GotoLogin("/");
                              localStorage.removeItem("token");
                         }}
                    >
                         Log Out
                    </div>
               ),
               key: "1",
          },
     ];
     return (
          <Dropdown
               menu={{
                    items,
               }}
               trigger={["click"]}
          >
               <a onClick={(e) => e.preventDefault()}>
                    <Space>
                         {username?.id}
                         {username?.username}
                         <DownOutlined />
                    </Space>
               </a>
          </Dropdown>
     );
}
