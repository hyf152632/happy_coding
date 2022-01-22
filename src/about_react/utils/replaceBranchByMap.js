let actions = new Map([
  [
    { identity: "guest", status: 1 },
    () => {
      alert("guest status 1.");
    }
  ],
  [
    { identity: "guest", status: 2 },
    () => {
      alert("guest status 2.");
    }
  ]
]);

let onBtnClick = (identity, status) => {
  let action = [...actions].filter(
    ([key, value]) => key.identity === identity && key.status === status
  );
  /*
  const [[key, value]] = Array.isArray(action) ? action : [[]]
  value.call(null)
  */
  action.map(([key, value]) => value.call(this));
};

actions = () => {
  const functionA = () => {
    console.log("functionA");
  };
  const functionB = () => {
    console.log("functionB");
  };
  return new Map([[/^guest_[1-4]$/, functionA], [/^guest_5$/, functionB]]);
};
onBtnClick = (identity, status) => {
  let action = [...actions()].filter(([key, value]) =>
    key.test(`${identity}_${status}`)
  );
  action.map(([key, value]) => value.call(this));
};

//这里Map的优势更加凸显，可以用正则类型作为key了，这样就有了无限可能，假如需求变成，
//凡是guest情况都要发送一个日志埋点，不同status情况也需要单独的逻辑处理，那我们可以这样写:

actions = () => {
  const functionA = () => {
    /*do sth*/
  };
  const functionB = () => {
    /*do sth*/
  };
  const functionC = () => {
    /*send log*/
  };
  return new Map([
    [/^guest_[1-4]$/, functionA],
    [/^guest_5$/, functionB],
    [/^guest_.*$/, functionC]
    //...
  ]);
};

const onBtnClick = (identity, status) => {
  const action = [...actions()].filter(([key, value]) =>
    key.test(`${identity}_${status}`)
  );
  action.map(([key, value]) => value.call(this));
};
export default onBtnClick;
