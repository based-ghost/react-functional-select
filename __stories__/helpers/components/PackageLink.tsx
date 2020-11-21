import React from 'react';
import styled from 'styled-components';

type PackageLinkProps = Readonly<{
  name: string;
  href: string;
}>;

const Link = styled.a`
  color: #149DF3;
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

const PackageLink: React.FC<PackageLinkProps> = React.memo(({ name, href }) => (
  <Link
    href={href}
    target='_blank'
    aria-label={name}
    rel='noopener noreferrer'
  >
    {name}
  </Link>
));

export default PackageLink;