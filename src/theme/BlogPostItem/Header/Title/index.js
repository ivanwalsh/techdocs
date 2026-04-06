import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import Title from '@theme-original/BlogPostItem/Header/Title';

export default function TitleWrapper(props) {
  const {metadata} = useBlogPost();
  const rawUrl = `https://raw.githubusercontent.com/ivanwalsh/techdocs/main/${metadata.source.replace(/^@site\//, '')}`;

  return (
    <>
      <Title {...props} />
      <div style={{marginBottom: '1rem', fontSize: '0.85rem'}}>
        <a href={rawUrl} target="_blank" rel="noopener noreferrer">
          📄 View as Markdown
        </a>
      </div>
    </>
  );
}
