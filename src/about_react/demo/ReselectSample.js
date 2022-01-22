import React from "react";
import { Button } from "antd";
import { createSelector } from "reselect";

function runDemo() {
  const shopItemsSelector = state => state.shop.items;
  const taxPercentSelector = state => state.shop.taxPercent;

  const subtotalSelector = createSelector(shopItemsSelector, items =>
    items.reduce((acc, item) => acc + item.value, 0),
  );

  const taxSelector = createSelector(
    subtotalSelector,
    taxPercentSelector,
    (subtotal, taxPercent) => subtotal * (taxPercent / 100),
  );

  const totalSelector = createSelector(
    subtotalSelector,
    taxSelector,
    (subtotal, tax) => ({ total: subtotal + tax }),
  );

  let exampleState = {
    shop: {
      taxPercent: 8,
      items: [{ name: "apple", value: 1.2 }, { name: "orange", value: 0.95 }],
    },
  };

  console.log(subtotalSelector(exampleState)); // 2.15
  console.log(taxSelector(exampleState)); // 0.172
  console.log(totalSelector(exampleState)); // { total: 2.322 }
}

export default class extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={runDemo}>Run Demo</Button>
        <br />
        <br />
        <div>* æå¼æ§å¶å°æ¥çè¿è¡ç»æ</div>
      </div>
    );
  }
}
