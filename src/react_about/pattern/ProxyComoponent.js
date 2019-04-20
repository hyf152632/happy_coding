import React from 'react';

//Writing this attribute hundreds of tiems is error prone.
//We can write a higher level compnnent to proxy props to a lower-level button component.

const Button = props => <button type="button" {...props} />;

export default Button;
