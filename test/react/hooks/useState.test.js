import React, { useState, useCallback } from 'react';
import { renderHook, cleanup } from 'react-hooks-testing-library';
import { render, fireEvent } from 'react-testing-library';
import { act } from 'react-dom/test-utils';

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = useCallback(() => setCount(count + 1), [count]);
  const decrement = useCallback(() => setCount(count - 1), [count]);
  return {
    count,
    increment,
    decrement
  };
}

function Example() {
  const { count, increment } = useCounter(0);

  return (
    <div>
      <p data-testid="count">{count}</p>
      <p>You clicked {count} times</p>
      <button onClick={() => increment()}>Click me</button>
    </div>
  );
}

describe('test Example', () => {
  const { getByText, getByTestId } = render(<Example />);

  act(() => {
    fireEvent.click(getByText('Click me'));
  });

  expect(getByTestId('count').textContent).toBe('1');
});

describe('useCounter tests', () => {
  afterEach(cleanup);

  test('should increment counter', () => {
    const { result } = renderHook(() => useCounter());

    act(() => result.current.increment());

    expect(result.current.count).toBe(1);
  });

  test('should decrement counter', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => result.current.decrement());

    expect(result.current.count).toBe(4);
  });
});

describe('useState tests', () => {
  afterEach(cleanup);

  test('should use setState value', () => {
    const { result } = renderHook(() => useState('foo'));

    const [value] = result.current;

    expect(value).toBe('foo');
  });

  test('should update setState value using setter', () => {
    const { result } = renderHook(() => useState('foo'));

    const [_, setValue] = result.current;

    act(() => setValue('bar'));

    const [value] = result.current;

    expect(value).toBe('bar');
  });
});
