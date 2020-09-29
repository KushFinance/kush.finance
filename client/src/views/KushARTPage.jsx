import React, { Component } from "react";
import { Divider, Tabs } from "antd";
const { TabPane } = Tabs;
export default class KushART extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="1">
      <TabPane tab="INFO" key="1">
      <div className="subpage kush-art">
       
        <button className="disabled launch-date">KushART Opens For Public in Late Autumn</button>
      </div>
       
      </TabPane>
    </Tabs>
      
    );
  }
}
