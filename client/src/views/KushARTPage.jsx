import React, { Component } from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;
export default class KushARTPage extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="1">
      <TabPane tab="INFO" key="1">

          <p>More technical details about how KushART project will work soon....</p>
       
        <button className="disabled launch-date">KushART Opens For Public in Late Autumn</button>
     
       
      </TabPane>
    </Tabs>
      
    );
  }
}
