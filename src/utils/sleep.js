const sleep = (ms = 1000) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, ms);
  });

export default sleep;
