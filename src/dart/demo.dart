void main() {
  print("hello, world");

  final name = 'Bob';

  var clapping = '\u{1f44f}';
  print(clapping);

  assert(5 ~/ 2 == 2);
}

String say(String from, String msg,
    [String device = 'carrier pigeon', String mood]) {
  var result = '$from say $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  if (mood != null) {
    result = '$result (in a $mood mood)';
  }
  return result;
}

void doStuff(
    {List<int> list = const [1, 2, 3],
    Map<String, String> gifts = const {
      'first': 'paper',
      'second': 'cotton',
      'third': 'leather'
    }}) {
  print('list: $list');
  print('gifts: $gifts');
}
