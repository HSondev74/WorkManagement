import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
     Avatar,
     Card,
     Button,
     Form,
     Input,
     DatePicker,
     Radio,
     message,
} from "antd";

import {
     ProfileOutlined,
     DeleteOutlined,
     CloseCircleTwoTone,
} from "@ant-design/icons";
import "./Antd.css";
import { useNavigate } from "react-router-dom";
import Page from "./Page";
import { useDispatch } from "react-redux";

import { handleChangeCall } from "./sliceBellToEdit";
import Filterdropdown from "./Filterdropdown";

const styles = {
     margin: "0 auto",
};
const { Meta } = Card;
export default function Body() {
     const [ListItem, setListItem] = useState([]);
     const [SearchItem, setSearchItem] = useState([]);
     const [active, setActive] = useState(null); //gán index cho sự kiện xem chi tiết
     const [active1, setActive1] = useState(null); //gán index cho sự kiện xem chi tiết
     // console.log(active);
     // console.log(active1);
     console.log("render");
     const [deleteitem, setDeleteItem] = useState(null); //gán index cho sự kiện xóa item
     const [isreload, setIsReload] = useState(true); // sau khi xóa sẽ set lại và render lại màn hình
     const Item = useNavigate();
     const [togglemodal, setTogglemodal] = useState(false);

     const [messageApi, contextHolder] = message.useMessage();
     const [messageApiSuccess, Succsess] = message.useMessage();

     const key = "updatable";
     const [valueinput, setValueinput] = useState("");
     const [x, setX] = useState({ page: 1, pageSize: 5, total: 10 });
     const numberbell1 = useDispatch();

     function setpage(trang, trangSize) {
          setX({ ...x, page: trang, pageSize: trangSize });
     }
     function Save() {
          setTogglemodal(!togglemodal);
     }
     function Add() {
          setTogglemodal(!togglemodal);
     }
     function Render() {
          setIsReload(!isreload);
     }
     useEffect(() => {
          if (active === null) {
               return;
          }
          if (active || active === 0) {
               //sau khi click setActive(index)=active =vị trí  tại đó,nếu có active hoặc active===0 vì =0 là falsy
               //sẽ gán cái prev(là listitem) tại vị trí active=index chấm đến cái key active = true
               setListItem((prev) => {
                    prev[active].active = true;
                    return [...prev]; // trả lại mảng listitem sau khi gán lại
               });
          }
          setTimeout(() => {
               Item(`/homepage/${ListItem[active].id}`);
          }, 3000);
     }, [active]);
     useEffect(() => {
          //sau khi click xóa sẽ setDelete(index)=deleteitem= vị trí tại đó,nếu có delete hoặ delete===0
          // sẽ gán cái prev(là listitem) tại vị trí deleteitem=index chấm đến cái key delete = true để loadding
          if (deleteitem || deleteitem === 0) {
               setListItem((prev) => {
                    prev[deleteitem].delete = true;
                    return [...prev];
               });
               let config = {
                    method: "delete",
                    maxBodyLength: Infinity,
                    url: "tasks/" + ListItem[deleteitem].id,
                    headers: {
                         Authorization:
                              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzgsImlhdCI6MTY4NDg5NzQwMCwiZXhwIjoxNjg3NDg5NDAwfQ.289mUKwbhMlMmiwSORmuYsgs5R26hkPnlsETkt5z7xk",
                    },
               };
               setTimeout(() => {
                    axios.request(config)
                         .then(() => {
                              setIsReload(!isreload); // sau khi call  xoas gọi ra thằng này set ngược lai để render lại với việc chuyền nó vào dependence của get all
                              setDeleteItem(null); //sau khi xóa 1 phần tử thì cái index  delete sẽ bị thay đổi dẫn deends ko xóa dc, ví dụ xóa thằng delete =0 , setDelete(0),sau đó thằng delet1=1 nhảy về =0 lại set 0 nên sẽ ko có thay đổi nên ko xóa dc
                              //nên cần set lại là null
                         })
                         .catch((error) => {
                              console.log(error);
                         });
               }, 3000);
          }
     }, [deleteitem]);

     useEffect(() => {
          let a = setTimeout(() => {
               axios.get(
                    `tasks?pagination[page]=${x.page}&pagination[pageSize]=${x.pageSize}&sort[0]=createdAt:desc&populate=*`
               ).then((response) => {
                    setX({
                         ...x,
                         total: response?.data?.meta?.pagination?.total,
                    });
                    let data = response.data.data.map((item) => {
                         item.active = false; //thêm vào các item trong mảng isreloadkey active:false
                         item.delete = false; //thêm vào các item trong mảng key delete:false

                         setTimeout(() => {
                              messageApiSuccess.open({
                                   key,
                                   type: "success",
                                   content: "Success!",
                                   duration: 2,
                              });
                         }, 1000);
                         return item; // trả về item
                    });
                    setListItem(data);
                    console.log(data);
               });
          }, 500);
          return function () {
               clearTimeout(a); //clean hàm và ko gọi lại nữa
          };
     }, [isreload, x.page, x.pageSize]);
     useEffect(() => {
          if (active1 === null) {
               return;
          }
          messageApi.open({
               key,
               type: "loading",
               content: "Loading...",
          });
          setTimeout(() => {
               Item(`/homepage/${SearchItem[active1].id}`);
          }, 1000);
     }, [active1]);
     function HandleSearch(e) {
          setValueinput(e.target.value);
     }
     useEffect(() => {
          let debounce = setTimeout(() => {
               if (valueinput != "") {
                    let config = {
                         method: "get",
                         maxBodyLength: Infinity,
                         url:
                              "tasks?pagination[page]=1&pagination[pageSize]=5&filters[title][$contains]=" +
                              valueinput,
                         headers: {},
                    };

                    axios.request(config)
                         .then((response) => {
                              setSearchItem(response.data.data);
                              console.log("a");
                         })
                         .catch((error) => {
                              console.log(error);
                         });
               } else {
                    setSearchItem([]);
               }
          }, 1000);
          return () => {
               clearTimeout(debounce);
          };
     }, [valueinput]);
     return (
          <>
               <div className="relative z-40">
                    {contextHolder}
                    <div className="fixed w-full flex justify-center h-[50px]  bg-gradient-to-r from-[#a4c0d5] to-[#60a3d6] items-center z-20 top-[10%]">
                         <Page x={x} fnsetx={setpage} />
                    </div>
                    <div
                         style={styles}
                         className="flex flex-wrap pt-[8rem] mb-24 gap-x-20 gap-y-11  w-[90%] justify-center  "
                    >
                         <Input
                              placeholder="Search"
                              onChange={(e) => {
                                   HandleSearch(e);
                              }}
                         />
                         {JSON.stringify(SearchItem) === JSON.stringify([]) ? ( //ko thể so sánh 2 mảng,chuyển đổi thành stringify để so sánh
                              <></>
                         ) : (
                              <div className="w-full flex flex-col gap-y-5">
                                   {SearchItem.map((item, index) => {
                                        return (
                                             <div
                                                  key={item.id}
                                                  className="h-[50px] bg-white rounded-full text-black cursor-pointer"
                                                  onClick={() => {
                                                       setActive1(index);
                                                  }}
                                             >
                                                  <Search1 item={item} />
                                             </div>
                                        );
                                   })}
                              </div>
                         )}
                         <button
                              onClick={Add}
                              className="w-full border-indigo-400"
                         >
                              ADD DATA
                         </button>
                         <div className="w-full">
                              <Filterdropdown />
                         </div>
                         {ListItem.map((item, index) => {
                              return (
                                   <div key={index}>
                                        <Card
                                             style={{
                                                  width: "200px",
                                                  height: "300px",
                                                  position: "relative",
                                             }}
                                             cover={
                                                  <img
                                                       style={{
                                                            height: "100%",
                                                            objectFit: "cover",
                                                       }}
                                                       alt="example"
                                                       src={`https://xsgames.co/randomusers/avatar.php?g=pixel&${item.id}`}
                                                       //   "https://backoffice.nodemy.vn" +
                                                       //   item?.attributes?.image?.data?.attributes?.url
                                                       // }
                                                  />
                                             }
                                             actions={[
                                                  <div
                                                       onClick={() => {
                                                            setActive(index); //setactive tại đó bằng giá trị index của mảng data và render lại
                                                       }}
                                                  >
                                                       {item.active ? ( //tại đây sau khi set thành true sẽ chạy vế trái
                                                            <Button
                                                                 loading={true}
                                                            ></Button>
                                                       ) : (
                                                            <Button>
                                                                 <ProfileOutlined />
                                                                 Detail
                                                            </Button>
                                                       )}
                                                  </div>,
                                                  <div
                                                       onClick={() => {
                                                            setDeleteItem(
                                                                 index
                                                            ); //setactive tại đó bằng giá trị index của mảng data và render lại
                                                       }}
                                                  >
                                                       {item.delete ? ( //tại đây sau khi set thành true sẽ chạy vế trái
                                                            <Button
                                                                 loading={true}
                                                            ></Button>
                                                       ) : (
                                                            <Button>
                                                                 <DeleteOutlined />
                                                                 Delete
                                                            </Button>
                                                       )}
                                                  </div>,
                                             ]}
                                        >
                                             <Meta
                                                  avatar={
                                                       <Avatar
                                                            src={`https://xsgames.co/randomusers/avatar.php?g=pixel&${item.id}`}
                                                       />
                                                  }
                                                  title={`Id:${item.id}`}
                                                  description={`title: ${item.attributes.title}`}
                                             />
                                        </Card>
                                   </div>
                              );
                         })}
                         {togglemodal ? (
                              <div className="w-[100vw] h-[100vh]  fixed flex">
                                   <Edit
                                        togglemodal={togglemodal}
                                        save={Save}
                                        setRender={Render}
                                        fnnumberbell1={numberbell1}
                                   />
                              </div>
                         ) : (
                              <></>
                         )}
                         <div className="text-white h-[150px]">
                              <Page x={x} fnsetx={setpage} />
                         </div>
                    </div>
               </div>
          </>
     );
}
export function Edit({ save, setRender, fnnumberbell1 }) {
     const modal1 = useRef(false);
     const dung = (values) => {
          values.date.format("YY-MM-DD");
          modal1.current = true; //ngan cho submit khi ko dien gi vao input
          let data = JSON.stringify({
               data: {
                    title: `${values.title}`,
                    date: `${values.date.format("YYYY-MM-DD")}`,
                    complete: `${values.complete}`,
               },
          });

          let config = {
               method: "post",
               maxBodyLength: Infinity,
               url: "tasks",
               headers: {
                    Authorization:
                         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzgsImlhdCI6MTY4NTE4NzI2OCwiZXhwIjoxNjg3Nzc5MjY4fQ.3tqH50n7mfAVZdnfFRB6-L6U-5rPgZADqRj01OrxoD0",
               },
               data: data,
          };

          axios.request(config)
               .then((response) => {
                    console.log(JSON.stringify(response.data));
                    if (modal1.current) {
                         save();
                         setRender();
                         fnnumberbell1(handleChangeCall());
                    }
               })
               .catch((error) => {
                    console.log(error);
               });
     };
     const sai = (values) => {
          console.log("Failed:", values);
     };

     function Close() {
          save();
     }
     return (
          <div className=" flex flex-col bg-white fixed top-[30%] left-[50%] -translate-x-56 w-[500px] rounded-[20px]  bg-gradient-to-r from-[#508acf] to-[#77c7e8] text-white">
               <div onClick={Close} className="flex justify-end cursor-pointer">
                    <CloseCircleTwoTone
                         style={{ color: "#508acf", fontSize: "40px" }}
                         spin
                         twoToneColor="#eb2f96"
                    />
               </div>
               <Form
                    name="basic"
                    labelCol={{
                         span: 7,
                    }}
                    wrapperCol={{
                         span: 10,
                    }}
                    style={{
                         maxWidth: 600,
                    }}
                    initialValues={{
                         remember: true,
                    }}
                    onFinish={dung}
                    onFinishFailed={sai}
               >
                    <Form.Item
                         label="Title"
                         name="title"
                         rules={[
                              {
                                   required: true,
                                   message: "Please input your username!",
                              },
                         ]}
                    >
                         <Input />
                    </Form.Item>
                    <Form.Item
                         label="Date"
                         name="date"
                         rules={[
                              {
                                   required: true,
                                   message: "Please choose date!",
                              },
                         ]}
                    >
                         <DatePicker />
                    </Form.Item>
                    <Form.Item
                         label="Complete"
                         name="complete"
                         rules={[
                              {
                                   required: true,
                                   message: "Please choose state!",
                              },
                         ]}
                    >
                         <Radio.Group>
                              <Radio value="true"> True</Radio>
                              <Radio value="false">False </Radio>
                         </Radio.Group>
                    </Form.Item>

                    <Form.Item
                         wrapperCol={{
                              offset: 7,
                              span: 10,
                         }}
                    >
                         <Button
                              type="primary"
                              htmlType="submit"
                              style={{
                                   background:
                                        "linear-gradient(to right, #508acf, #a4c0d5)",
                                   width: "200px",
                                   fontSize: "20px",
                              }}
                         >
                              Save
                         </Button>
                    </Form.Item>
               </Form>
          </div>
     );
}
export function Search1({ item }) {
     return (
          <div className="flex  justify-center items-center w-full h-full">
               <div className=" relative z-40 flex items-center w-full h-full">
                    <div className="w-[30px] h-[30px] rounded-full ml-5">
                         <img
                              className="w-[100%] h-full object-cover rounded-full"
                              src={`https://xsgames.co/randomusers/avatar.php?g=pixel&${item.id}`}
                              alt=""
                         />
                    </div>
                    <div className="w-[70%] flex justify-center gap-x-[100px] h-full items-center  ">
                         <span>ID:{item.id}</span>
                         <span>Title:{item.attributes.title}</span>
                         <span>DATE:{item.attributes.date}</span>
                         <span>Complete:{item?.attributes?.complete + ""}</span>
                    </div>
               </div>
          </div>
     );
}

function useDebounce(value, delay) {
     const [debounce, setDebounce] = useState(value);

     useEffect(() => {
          const handler = setTimeout(() => setDebounce(value), delay);

          return () => clearTimeout(handler);
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [value]);

     return debounce;
}
