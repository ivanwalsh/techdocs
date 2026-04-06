import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Content from '@theme-original/DocItem/Content';

export default function ContentWrapper(props) {
  const {metadata} = useDoc();
  const rawUrl = `https://raw.githubusercontent.com/ivanwalsh/techdocs/main/${metadata.source.replace(/^@site\//, '')}`;

  return (
    <>
      <div style={{marginBottom: '1rem', fontSize: '0.85rem'}}>
        <a href={rawUrl} target="_blank" rel="noopener noreferrer">
          📄 View as Markdown
        </a>
      </div>
      <Content {...props} />
    </>
  );
}
