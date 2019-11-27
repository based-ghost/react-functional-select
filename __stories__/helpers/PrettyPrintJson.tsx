import React from 'react';
import styled from 'styled-components';
import { mediaQueryIsMobileXS } from './styled';

type PrintJsonProps = {
  readonly data: any;
  readonly header: string;
};

const PrintJsonRoot = styled.div`
  font-size: 1rem;
  overflow: hidden;
  position: relative;
  margin-top: 1.5625rem;
  border-radius: 0.5625rem;
  background-color: #282c34;
  box-shadow: rgba(20, 20, 20, 0.225) 1px 1px 18px;
`;

const PrintJsonHeader = styled.div`
  color: #f5b83d;
  line-height: 3;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 0 0.9375rem;
  letter-spacing: 0.08em;
  border-radius: 0.5625rem;
  text-transform: uppercase;
  background-color: #1D2027;

  ${mediaQueryIsMobileXS} {
    font-size: 1.05rem;
    letter-spacing: 0.05em;
  }
`;

const PrintJsonPre = styled.pre`
  margin: 0;
  color: #fff;
  resize: none;
  font-size: 90%;
  display: inline-block;
  letter-spacing: 0.03em;
  padding: 0.625rem 1.875rem;
  touch-action: manipulation;
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;

  ${mediaQueryIsMobileXS} {
    font-size: 0.75em;
    letter-spacing: normal;
    padding: 0.625rem 1.125rem;
  }
`;

const PrettyPrintJson = React.memo<PrintJsonProps>(({ data, header }) => {
  const jsonWithoutQuotes = JSON
    .stringify(data || {}, null, 2)
    .toString()
    .replace(/"/g, '')
    .replace(/\\/g, '');

  return (
    <PrintJsonRoot>
      <PrintJsonHeader>{header}</PrintJsonHeader>
      <PrintJsonPre>{jsonWithoutQuotes}</PrintJsonPre>
    </PrintJsonRoot>
  );
});

export default PrettyPrintJson;