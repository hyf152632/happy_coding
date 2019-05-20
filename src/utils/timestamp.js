const timestampToTime = timestamp => {
  const nowTimestamp = Date.now();
  const oneDayTimestamp = 1000 * 60 * 60 * 24;
  const todayZeroClockTimestamp = new Date(
    new Date(nowTimestamp).toDateString()
  ).getTime();
  const todayTimeOffset = nowTimestamp - todayZeroClockTimestamp;
  const nowAndInputTimestampOffset = nowTimestamp - timestamp;

  let timeStr = '';
  let dateStr = '';

  try {
    const dateCondMap = new Map([
      [[0, todayTimeOffset], '今天'],
      [[todayTimeOffset, todayTimeOffset + oneDayTimestamp], '昨天'],
      [
        [
          todayTimeOffset + oneDayTimestamp,
          todayTimeOffset + oneDayTimestamp * 2
        ],
        '前天'
      ],
      [
        [todayTimeOffset + oneDayTimestamp * 2, Infinity],
        new Date(timestamp).toLocaleDateString()
      ]
    ]);
    const findDateCond = [...dateCondMap].find(
      ([[key0, key1]]) =>
        nowAndInputTimestampOffset >= key0 && nowAndInputTimestampOffset < key1
    );
    dateStr = findDateCond ? findDateCond[1] : '';
    timeStr = new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return timestamp;
  }
  return `${dateStr} ${timeStr}`;
};

export { timestampToTime };
