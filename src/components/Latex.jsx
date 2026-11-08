import React, { useMemo } from 'react';
import katex from 'katex';

export default function Latex({ math, inline = false, style = {} }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: !inline,
        throwOnError: false,
      });
    } catch (e) {
      return math;
    }
  }, [math, inline]);

  return (
    <span 
      style={{ display: inline ? 'inline-block' : 'block', overflowX: 'auto', maxWidth: '100%', ...style }}
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}
