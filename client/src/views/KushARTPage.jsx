import React, { Component } from "react";
import { Divider, Tabs } from "antd";
const { TabPane } = Tabs;
export default class KushART extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="1">
      <TabPane tab="INFO" key="1">
      <div className="subpage kush-art">

          <p>More technical details about how KushART project will work soon....</p>
       
        <button className="disabled launch-date">KushART Opens For Public in Late Autumn</button>
      </div>
       
      </TabPane>
    </Tabs>
      
    );
  }
}
