import { Map, List, Seq } from 'immutable';

//immutable collections should be treeted as values rether than objects.
//while objects represent some thing which could chage  over time,
//a value represents the state of that thing at a particular instance of time.
//The principle is most important to understanding the appropriate use of immutable data.

describe('test immutable js', () => {
  test('should return new map each time', () => {
    const map1 = Map({ a: 1, b: 2, c: 3 });
    expect(map1.get('a')).toBe(1);
    const map2 = map1.set('b', 50);
    expect(map2.get('b')).toBe(50);
    expect(map2.get('a')).toBe(1);
  });
  test('map merge method', () => {
    const map1 = Map({ a: 1, b: 2, c: 3 });
    const map2 = Map({ c: 4, d: 5, e: 6 });
    const obj = { d: 7, e: 8, f: 9 };
    const map3 = map1.merge(map2, obj);
    expect(map3.size).toBe(6);
    expect(map3.get('c')).toBe(4);
  });
  test('should return new List each time', () => {
    const list1 = List([1, 2]);
    const list2 = list1.push(3, 4, 5);
    expect(list1.size).toBe(2);
    expect(list2.size).toBe(5);
  });
  test('Seq interface', () => {
    const myObject = { a: 1, b: 2, c: 3 };
    const seqObj = Seq(myObject)
      .map(x => x * x)
      .toObject();
    expect(typeof seqObj).toBe('object');

    const obj = {};
    expect(Seq.isSeq(obj)).toBeFalsy();
  });
});
