import React from 'react';
import styled from 'styled-components';
import { mediaQueryIsMobileXS } from './styled';

type PrintJsonProps = {
  readonly data: any;
  readonly header: string;
};

const PrintJsonRoot = styled.div`
  font-size: 1rem;
  margin-top: 25px;
  overflow: hidden;
  border-radius: 9px;
  position: relative;
  background-color: #282c34;
  box-shadow: rgba(20, 20, 20, 0.23) 0.0555556rem 0.0555556rem 1.11111rem;
`;

const PrintJsonHeader = styled.div`
  color: #f5b83d;
  line-height: 3;
  font-weight: 700;
  padding: 0px 15px;
  font-size: 1.15rem;
  border-radius: 9px;
  letter-spacing: 0.08em;
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
  padding: 10px 30px;
  display: inline-block;
  letter-spacing: 0.03em;
  touch-action: manipulation;
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;

  ${mediaQueryIsMobileXS} {
    font-size: 0.75em;
    padding: 10px 18px;
    letter-spacing: normal;
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