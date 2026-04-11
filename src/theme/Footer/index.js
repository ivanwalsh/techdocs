import React from 'react';
import Footer from '@theme-original/Footer';

const footerLinks = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: 'middle'}}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    label: 'Follow on X',
    href: 'https://x.com/ivanwalsh',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: 'middle'}}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'Connect on LinkedIn',
    href: 'https://www.linkedin.com/in/ivanwalsh/',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: 'middle'}}>
        <path d="M19 3H5a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3V6a3 3 0 00-3-3zm-.67 2L12 10.75 5.67 5zM19 19H5a1 1 0 01-1-1V7.25l7.4 6.67a1 1 0 001.2 0L20 7.25V18a1 1 0 01-1 1z" />
      </svg>
    ),
    label: 'Subscribe to newsletter',
    href: 'https://ivanwalsh.beehiiv.com/subscribe',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: 'middle'}}>
        <path d="M12 2a1 1 0 011 1v1.07A8.001 8.001 0 0119.93 11H21a1 1 0 110 2h-1.07A8.001 8.001 0 0113 19.93V21a1 1 0 11-2 0v-1.07A8.001 8.001 0 014.07 13H3a1 1 0 110-2h1.07A8.001 8.001 0 0111 4.07V3a1 1 0 011-1zm0 4a6 6 0 100 12 6 6 0 000-12zm0 3a3 3 0 110 6 3 3 0 010-6z" />
      </svg>
    ),
    label: 'llms.txt (AI index)',
    href: 'https://ivanwalsh.com/llms.txt',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: 'middle'}}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 12h8v2H8v-2zm0 4h8v2H8v-2zm0-8h5v2H8V8z" />
      </svg>
    ),
    label: 'llms-full.txt (full content)',
    href: 'https://ivanwalsh.com/llms-full.txt',
  },
];

function CustomFooterLinks() {
  return (
    <div
      style={{
        padding: '1.5rem 0',
        marginBottom: '0.5rem',
      }}>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
        }}>
        {footerLinks.map(({icon, label, href}) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}>
              {icon}
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterWrapper(props) {
  return (
    <footer className="footer">
      <div className="container container-fluid">
        <CustomFooterLinks />
        <div
          className="footer__bottom text--center"
          style={{paddingTop: '0.5rem', fontSize: '0.85rem'}}>
          Copyright &copy; 2026 Ivan Walsh, Technical Writer | AI Documentation Systems | APIs | RAG | Developer Portals. Built with Claude and Docusaurus.
        </div>
      </div>
    </footer>
  );
}
