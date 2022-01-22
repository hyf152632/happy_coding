subscriptions: {
  openSocket({ dispatch }) {
    return service.wsConnect((data) => {
      dispatch({ type, payload: data })
    })
  },
}

// service.js
let ws
export function wsConnect(action) {
  ws = new global.WebSocket(url)
  ws.onopen = () => {
    // do something
  }
  ws.onmessage = ({ data }) => {
    action(JSON.parse(data))
  }
}

subscriptions里面的在初始化的时候都会执行一下，history是dva提供给你的，你在service自己封装一下提供对socket时间监听的接口解可以了。

service里面：

export function listen(action) {
  socket.on('message', (data) => {
    action(data);
  });
}
subscriptions里面：

socketMessage({ dispatch }) {
  return service.listen((data) => {
    dispatch({ type: 'your action', payload: data });
  });
}
对于接收服务端消息，监听异常断开，这些数据订阅都可以用这种方式


//https://github.com/dvajs/dva-hackernews/blob/master/src/models/user.js

import {
  fetchIdsByType,
  fetchItem,
  fetchItems,
  watchList,
} from '../services/hn';

subscriptions: {
  listSubscriber({ dispatch, history }) {
    let activeType = null;
    let unwatchList = null;
    let page = null;

    function fetchList(type, _page = 1) {
      page = _page;
      dispatch({ type: 'saveActiveType', payload: type });
      dispatch({ type: 'fetchList', payload: { type, page } });
    }

    function doWatchList(type) {
      let unwatchListFn = watchList(type, (ids) => {
        dispatch({ type: 'saveList', payload: { type, ids } });
        dispatch({ type: 'fetchList', payload: { type, page } });
      });
      return unwatchListFn
    }

    return history.listen(({ pathname }) => {
      for (const type of ITEM_TYPES) {
        const match = pathToRegexp(`/${type}/:page?`).exec(pathname);
        if (match) {
          const page = match[1];

          // fetch
          fetchList(type, page);

          // watch
          if (activeType !== type) {
            activeType = type;
            if (unwatchList) unwatchList();
            unwatchList = doWatchList(type);
          }
        }
      }
    });
  },

  itemSubscriber({ dispatch, history }) {
    return history.listen(({ pathname }) => {
      const match = pathToRegexp('/item/:itemId').exec(pathname);
      if (match) {
        const itemId = match[1];
        dispatch({
          type: 'fetchComments',
          payload: itemId,
        });
      }
    });
  },
},


export function watchList(type, cb) {
  let first = true;
  const ref = api.child(`${type}stories`);
  const handler = (snapshot) => {
    if (first) {
      first = false;
    } else {
      cb(snapshot.val());
    }
  };
  ref.on('value', handler);
  return () => {
    ref.off('value', handler);
  }
}

let unwatchListFn = watchList(type, (ids) => {
  dispatch({ type: 'saveList', payload: { type, ids } });
  dispatch({ type: 'fetchList', payload: { type, page } });
});
return unwatchListFn