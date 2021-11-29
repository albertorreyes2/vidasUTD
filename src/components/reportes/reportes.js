import React, { useState, useEffect } from "react";
import {
Table, Divider, Tabs
} from "antd";


export default function Reportes() {

    return (
        <>
            <Divider>
                <h3>Reportes</h3>
            </Divider>
            <div className="card-container">
    <Tabs type="card">
      <Tabs.TabPane tab="Tab Title 1" key="1">
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab Title 2" key="2">
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab Title 3" key="3">
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
      </Tabs.TabPane>
    </Tabs>
  </div>,
        </>
    );
}