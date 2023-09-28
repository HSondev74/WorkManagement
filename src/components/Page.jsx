import React from "react";

import { Pagination } from "antd";
export default function Page({ x, fnsetx }) {
     return (
          <Pagination
               total={x.total}
               showQuickJumper
               showTotal={(total, range) =>
                    `Total ${total} items, and range ${range}`
               }
               current={x.page}
               pageSize={x.pageSize}
               onChange={(page1, pageSize1) => {
                    fnsetx(page1, pageSize1);
               }}
          />
     );
}
