import React from 'react';
import styled from 'styled-components';

export type PackageLinkProps = {
  readonly name: string;
  readonly href: string;
};

const Link = styled.a`
  color: #007bff;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: none;
  font-weight: 600;
  line-height: 1.2;
  overflow: visible;
  user-select: none;
  padding: 0 .05rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  background-color: transparent;
  transition: box-shadow 0.2s ease-out;

  :hover {
    box-shadow: 0 1px 0 0 currentColor;
  }
`;

const PackageLink: React.FC<PackageLinkProps> = ({ name, href }) => (
  <Link
    href={href}
    rel='noopener'
    target='_blank'
    aria-label={name}
  >
    {name}
  </Link>
);

export default PackageLink;