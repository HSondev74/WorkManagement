import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Form, Input, DatePicker, Radio } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import "./Antd.css";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeCall } from "./sliceBellToEdit";
const { Meta } = Card;
export default function DetailProduct() {
     const date = (datadate) => {
          const date = new Date(datadate);
          const formattedDate = `${date.getDate()}-${
               date.getMonth() + 1
          }-${date.getFullYear()}`;
          return formattedDate;
     };
     const [DetailItem, setDeailItem] = useState({});
     const id = useParams();
     const gohomenav = useNavigate();
     const [togglemodal, setTogglemodal] = useState(false);
     const [render, setRender] = useState(true);
     const renderRedux = useSelector((ren) => ren.upnumbell.isAgainCall1);

     function HandlerGoHome() {
          gohomenav("/homepage");
     }
     function Editdata() {
          setTogglemodal(true);
     }
     function Save() {
          setTogglemodal(!togglemodal);
     }
     function Render() {
          setRender(!render);
          setTogglemodal(!togglemodal);
     }
     useEffect(() => {
          let config = {
               method: "get",
               maxBodyLength: Infinity,
               url: "tasks/" + id.id + "?populate=*",
               headers: {},
          };

          axios.request(config)
               .then((response) => {
                    setDeailItem(response.data.data);
               })
               .catch((error) => {});
     }, [render, renderRedux]);
     return (
          <div className="h-full flex justify-center items-center">
               <div className=" relative z-40 flex flex-col items-center">
                    <Card
                         hoverable
                         style={{
                              width: 240,
                         }}
                         cover={
                              <img
                                   alt="example"
                                   src={`https://xsgames.co/randomusers/avatar.php?g=pixel&${DetailItem.id}`}
                              />
                         }
                    >
                         <Meta
                              title={`title: ${DetailItem?.attributes?.title}`}
                              description={`Id:${DetailItem.id}- Date:${date(
                                   DetailItem?.attributes?.date
                              )}-complete:${DetailItem?.attributes?.complete}`}
                         />
                         <button
                              onClick={Editdata}
                              style={{
                                   width: "100%",
                                   height: 30,
                                   marginTop: 10,
                                   backgroundColor: "#53abc9",
                                   fontSize: "15px",
                              }}
                         >
                              EDIT
                         </button>
                         <button
                              onClick={HandlerGoHome}
                              style={{
                                   width: "100%",
                                   height: 30,
                                   marginTop: 10,
                                   backgroundColor: "#53abc9",
                                   fontSize: "15px",
                              }}
                         >
                              BACK HOME
                         </button>
                    </Card>
                    {togglemodal ? (
                         <Edit
                              togglemodal={togglemodal}
                              save={Save}
                              id={id}
                              setRender={Render}
                         />
                    ) : (
                         <></>
                    )}
               </div>
          </div>
     );
}
export function Edit({ save, id, setRender }) {
     const modal1 = useRef(false);
     const upnumbell1 = useDispatch();
     const dung = (values) => {
          // console.log(values);
          values.date.format("YY-MM-DD");
          // console.log("Success:", values.date.format("YY-MM-DD"));
          modal1.current = true;
          let data = JSON.stringify({
               data: {
                    title: `${values.title}`,
                    date: `${values.date.format("YYYY-MM-DD")}`,
                    complete: `${values.complete}`,
               },
          });

          let config = {
               method: "put",
               maxBodyLength: Infinity,
               url: "tasks/" + id.id,
               headers: {
                    "Content-Type": "application/json",
                    Authorization:
                         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzgsImlhdCI6MTY4NDg5NzQwMCwiZXhwIjoxNjg3NDg5NDAwfQ.289mUKwbhMlMmiwSORmuYsgs5R26hkPnlsETkt5z7xk",
               },
               data: data,
          };
          axios.request(config)
               .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    if (modal1.current) {
                         save();
                         setRender();
                         upnumbell1(handleChangeCall());
                    }
               })
               .catch((error) => {
                    // console.log(error);
               });
     };
     const sai = (values) => {
          // console.log("Failed:", values);
          modal1.current = false;
     };

     function Close() {
          save();
     }
     return (
          <div className=" flex flex-col bg-white fixed top-[30%] w-[500px] rounded-[20px]  bg-gradient-to-r from-[#508acf] to-[#77c7e8] text-white">
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
