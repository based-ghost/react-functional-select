import styled from 'styled-components';

import type { FunctionComponent } from 'react';

type PackageLinkProps = Readonly<{
  name: string;
  href: string;
}>;

const Link = styled.a`
  color: #026fb3;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  overflow: visible;
  user-select: none;
  padding: 0 .05rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  will-change: transform;
  background-color: transparent;
  transition: transform 0.25s ease-out;
  transform: translate3d(0px, 0px, 0px);

  :hover {
    transform: translate3d(0px, -1.5px, 0px);
  }
`;

const PackageLink: FunctionComponent<PackageLinkProps> = ({ name, href }) => (
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