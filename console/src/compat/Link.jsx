import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function Link({ href, to, children, passHref, ...props }) {
  const target = to || href || '#';
  return (
    <RouterLink to={target} {...props} style={{ textDecoration: 'none', color: 'inherit', ...props.style }}>
      {children}
    </RouterLink>
  );
}
