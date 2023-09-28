import { Select } from "antd";
import React, { useState } from "react";
const { Option } = Select;

const Filterdropdown = () => {
     const [selectedValue, setSelectedValue] = useState("All");

     const handleDropdownChange = (value) => {
          setSelectedValue(value);
          console.log(value);
     };

     return (
          <Select
               value={selectedValue}
               onChange={handleDropdownChange}
               className=""
          >
               <Option value="true">TRUE</Option>
               <Option value="false">FALSE</Option>
               <Option value="All">ALL</Option>
          </Select>
     );
};

export default Filterdropdown;
