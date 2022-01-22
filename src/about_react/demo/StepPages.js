import React, { Component } from "react";
import R from "ramda";
import Route from "react-router-dom";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

class StepPages extends Component {
  getCurrentStep() {
    const currentPath = document.location.hash.replace(/^#/, "");
    return R.findIndex(R.propEq("path", currentPath))(this.getSteps());
  }
  getSteps() {
    return [
      { title: "验证邮件", path: "/wizard/step/1", component: Step1 },
      { title: "账号信息", path: "/wizard/step/2", component: Step2 },
      { title: "完成", path: "/wizard/step/3", component: Step3 }
    ];
  }
  renderComponent = () => {
    const { form, allValues } = this.props;
    const StepComponent = this.getSteps()[this.getCurrentStep].component;
    return <StepComponent form={form} allValues={allValues} />;
  };
  render() {
    return <Route path="/wizard/step/:stepId" render={this.renderComponent} />;
  }
}
