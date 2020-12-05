import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css";

import Display from './Pages/Display';
import Update from './Pages/Update';
import Delete from './Pages/Delete';

import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from 'antd';
import EmployeeTaskView from './Pages/EmployeeTaskView';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Router>
        <Layout className="layout">
          <Header style={{ background: "white" }}>
            <h1 style={{ float: "left", margin: 0 }}>Plastic0</h1>
            <Menu mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1"><Link to="/">
                Display
              </Link></Menu.Item>
              <Menu.Item key="2"><Link to="/update">
                Update
              </Link></Menu.Item>
              <Menu.Item key="3"><Link to="/delete">
                Delete 
              </Link></Menu.Item>
              <Menu.Item key="4"><Link to="/view">
                Employee Tasks 
              </Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: "3rem" }}>
            <Switch>
              <Route exact path="/">
                <Display />
              </Route>
              <Route path="/update">
                <Update />
              </Route>
              <Route path="/delete">
                <Delete />
              </Route>
              <Route path="/View">
                <EmployeeTaskView />
              </Route>
            </Switch>
          </Content>
          <Footer>
            Plastic0 | Website created with Ant Design
          </Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
