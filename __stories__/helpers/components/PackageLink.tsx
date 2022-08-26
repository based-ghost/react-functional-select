import styled from 'styled-components';
import React, { type FunctionComponent } from 'react';

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

const PackageLink: FunctionComponent<PackageLinkProps> = ({
  name,
  href
}) => (
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