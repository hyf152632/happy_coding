import React from "react";
import ReactDOM from "react-dom";
import Timer from "./components/Timer";
import Context from "./components/Context";
import NameProvider from "./components/pattern/RenderProps";
import FunctionalChildrenShowName from "./components/FunctionalChildren";
import FunctionalWithDefaultProps from "./components/FunctionalDefaultProps.js";
import DestructuringProps from "./components/pattern/DestructuringProps.js";
import ParentCallChildMethod from "./components/callChildFunction.js";
import SwitchComponent from "./components/SwitchComponent.js";
import MouseOverComponent from "./components/MouseOverComponent.js";
import CustomButton from "./components/CustomButton";

import { HashRouter as Router, Route, NavLink } from "react-router-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content-wrapper">
          <ul className="menu">
            <li className="menu-item">
              <NavLink
                activeClassName="nav-selected"
                to="/page/MouseOverComponent"
              >
                mouseover
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="nav-selected" to="/page/Timer">
                Timer
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="nav-selected" to="/page/ContextApi">
                Context Api
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="nav-selected" to="/page/RenderProps">
                RenderProps
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="nav-selected"
                to="/page/FunctionalChildren"
              >
                FunctionalChildren
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="nav-selected"
                to="/page/FunctionalWithDefaultProps"
              >
                FunctionalWithDefaultProps
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="nav-selected"
                to="/page/DestructuringProps"
              >
                DestructuringProps
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="nav-selected"
                to="/page/ParentCallChildMethod"
              >
                ParentCallChildMethod
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="nav-selected"
                to="/page/SwitchComponent"
              >
                SwitchComponent
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="nav-selected" to="/page/forwardRef">
                forwardRef
              </NavLink>
            </li>
          </ul>

          <div className="page-container">
            <Route
              path="/page/MouseOverComponent"
              component={MouseOverComponent}
            />
            <Route path="/page/Timer" component={Timer} />
            <Route path="/page/ContextApi" component={Context} />
            <Route path="/page/RenderProps" component={NameProvider} />
            <Route
              path="/page/FunctionalChildren"
              component={FunctionalChildrenShowName}
            />
            <Route
              path="/page/FunctionalWithDefaultProps"
              component={FunctionalWithDefaultProps}
            />
            <Route
              path="/page/DestructuringProps"
              component={DestructuringProps}
            />
            <Route
              path="/page/ParentCallChildMethod"
              component={ParentCallChildMethod}
            />
            <Route path="/page/SwitchComponent" component={SwitchComponent} />
            <Route path="/page/forwardRef" component={CustomButton} />
          </div>
        </div>
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
