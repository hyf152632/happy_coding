import React, { Component } from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';

class CostInput extends Component {
  state = {
    value: ''
  };

  removeDollarSign = value => (value[0] === '$' ? value.slice(1) : value);
  getReturnValue = value => (value === '' ? '' : `$${value}`);
  handleChange = ev => {
    ev.preventDefault();
    const inputtedValue = ev.currentTarget.value;
    const noDollarSign = this.removeDollarSign(inputtedValue);
    if (isNaN(noDollarSign)) return;
    this.setState({
      value: this.getReturnValue(noDollarSign)
    });
  };
  render() {
    return (
      <input
        value={this.state.value}
        aria-label="const-input"
        onChange={this.handleChange}
      />
    );
  }
}

const setup = () => {
  const utils = render(<CostInput />);
  const input = utils.getByLabelText('const-input');
  return {
    input,
    ...utils
  };
};

afterEach(cleanup);

test('It should keep a $ in front of the input', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: '23' } });
  expect(input.value).toBe('$23');
});

test('It should allow a $ to be inthe input when the value is changed', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: '$23.0' } });
  expect(input.value).toBe('$23.0');
});

test('It should not allow letter to be inputted', () => {
  const { input } = setup();
  expect(input.value).toBe('');
  fireEvent.change(input, { target: { value: 'Good Day' } });
  expect(input.value).toBe('');
});

test('It should allow the $ to be deleted', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: '23' } });
  expect(input.value).toBe('$23');
  fireEvent.change(input, { target: { value: '' } });
  expect(input.value).toBe('');
});
