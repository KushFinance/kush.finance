import React, { Component } from "react";
import { Switch, Divider } from 'antd'

export default class SettingsPage extends Component {
  state = {
    kseedBalance: localStorage.getItem("kseedBalance") === "true" ? true : false,
    kseedSupply: localStorage.getItem("kseedSupply") === "true" ? true : false,
    kseedTotal: localStorage.getItem("kseedTotal") === "true" ? true : false,
    kkushSupply: localStorage.getItem("kkushSupply") === "true" ? true : false,
  }
  changeStorage(item){
    if(localStorage.getItem(item) === "false") localStorage.setItem(item,"true");
    else localStorage.setItem(item,"false");
    this.setState({
        kseedBalance: localStorage.getItem("kseedBalance") === "true" ? true : false,
        kseedSupply: localStorage.getItem("kseedSupply") === "true" ? true : false,
        kseedTotal: localStorage.getItem("kseedTotal") === "true" ? true : false,
        kkushSupply: localStorage.getItem("kkushSupply") === "true" ? true : false,
      }) 
  }
  render() {
    return (
      <div className="subpage settings">
        <h1>Settings</h1>
        <Divider orientation="left">
          Float wallet settings
        </Divider>
        <div className="wallet--setting">
          <Switch
          checked={this.state.kseedBalance}
          onChange={()=>{this.changeStorage("kseedBalance")}} />
          <span>Show k.SEED balance</span>
        </div> 
        <div className="wallet--setting">
          <Switch
          checked={this.state.kseedSupply}
          onChange={()=>{this.changeStorage("kseedSupply")}} />
          <span>Show k.SEED supply</span>
        </div> 
        <div className="wallet--setting">
          <Switch
          checked={this.state.kseedTotal}
          onChange={()=>{this.changeStorage("kseedTotal")}} />
          <span>Show total k.SEED seeded</span>
        </div> 
        <div className="wallet--setting">
          <Switch
          checked={this.state.kkushSupply}
          onChange={()=>{this.changeStorage("kkushSupply")}} />
          <span>Show k.KUSH supply</span>
        </div> 
        <button onClick={()=> {window.location.reload()}}>Save</button>
      </div>
    );
  }
}
