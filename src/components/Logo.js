import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/logo.png"
      height='40'
      {...props}
    />
  );
};

export default Logo;
