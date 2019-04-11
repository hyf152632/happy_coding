import React, { Component } from 'react';
import { render, cleanup } from 'react-testing-library';

let idCounter = 1;

class NumberDisplay extends Component {
  id = idCounter++;

  render() {
    const { number } = this.props;
    return (
      <div>
        <span data-testid="number-display">{number}</span>
        <span data-testid="instance-id">{this.id}</span>
      </div>
    );
  }
}

afterEach(cleanup);

test('calling render with the same component on the same container does not remount', () => {
  const { getByTestId, rerender } = render(<NumberDisplay number={1} />);

  expect(getByTestId('number-display').textContent).toBe('1');

  rerender(<NumberDisplay number={2} />);
  expect(getByTestId('number-display').textContent).toBe('2');

  expect(getByTestId('instance-id').textContent).toBe('1');
});
