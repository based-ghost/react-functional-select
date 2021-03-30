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
  font-weight: 600;
  line-height: 1.2;
  overflow: visible;
  user-select: none;
  padding: 0 .05rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  background-color: transparent;
  box-shadow: 0 .75px 0 0 currentColor;
      transform: translate3d(0px, 0px, 0px);
      transition: all 250ms ease-out 0s;

      :hover {
        transform: translate3d(0px, -1px, 0px);
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