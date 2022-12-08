import React from 'react';
import styled from 'styled-components';

type PackageLinkProps = Readonly<{
  name: string;
  href: string;
}>;

const Link = styled.a`
  color: #1EA7FD;
  cursor: pointer;
  font-weight: 600;
  line-height: 1.5;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const PackageLink: React.FC<PackageLinkProps> = ({ name, href }) => (
  <Link
    href={href}
    target='_blank'
    aria-label={name}
    rel='noopener noreferrer'
  >
    {name}
  </Link>
);

export default PackageLink;