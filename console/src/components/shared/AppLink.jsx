import React, { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = forwardRef(function Link({ href, to, children, passHref, ...props }, ref) {
  const target = to || href || '#';
  return (
    <RouterLink
      ref={ref}
      to={target}
      {...props}
      style={{ textDecoration: 'none', color: 'inherit', ...props.style }}
    >
      {children}
    </RouterLink>
  );
});

export default Link;
