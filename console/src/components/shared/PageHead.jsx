import React, { useEffect } from 'react';

export default function Head({ children }) {
  useEffect(() => {
    if (!children) return;
    React.Children.forEach(children, (child) => {
      if (!child) return;
      if (child.type === 'title') {
        const titleContent = child.props?.children;
        if (typeof titleContent === 'string') {
          document.title = titleContent;
        } else if (Array.isArray(titleContent)) {
          document.title = titleContent.join('');
        }
      }
    });
  }, [children]);

  return null;
}
