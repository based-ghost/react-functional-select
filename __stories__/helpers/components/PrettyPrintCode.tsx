import React from 'react';
import styled from 'styled-components';
import { MEDIA_QUERY_IS_MOBILE_XS } from '../styled';
import {
  OPTION_CLS,
  CARET_ICON_CLS,
  CLEAR_ICON_CLS,
  OPTION_FOCUSED_CLS,
  AUTOSIZE_INPUT_CLS,
  MENU_CONTAINER_CLS,
  SELECT_CONTAINER_CLS,
  CONTROL_CONTAINER_CLS
} from '../../../src/constants/dom';

type PrintHtmlProps = {
  readonly header: string;
};

type PrintJsonProps = {
  readonly data: any;
  readonly header: string;
};

const CLASS_NAME_HTML = `<div class='${SELECT_CONTAINER_CLS}'>
  <div class='${CONTROL_CONTAINER_CLS}'>
    <div>
      <div>Select option..</div>
      <div>
        <input value='' type='text' class='${AUTOSIZE_INPUT_CLS}' />
      </div>
    </div>
    <div>
      <div aria-hidden='true'>
        <div class='${CLEAR_ICON_CLS}'>X</div>
      </div>
      <div />
      <div aria-hidden='true'>
        <div class='${CARET_ICON_CLS}' />
      </div>
    </div>
  </div>
  <div class='${MENU_CONTAINER_CLS}'>
    <div>
      <div>
        <div class='${OPTION_CLS} ${OPTION_FOCUSED_CLS}'>Option 1</div>
        <div class='${OPTION_CLS}'>Option 2</div>
      </div>
    </div>
  </div>
</div>`;

const PrintJsonRoot = styled.div`
  font-size: 1rem;
  overflow: hidden;
  position: relative;
  margin-top: 1.75rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5625rem;
  background-color: #282c34;
  box-shadow: rgba(20, 20, 20, 0.2) 1px 1px 18px;
`;

const PrintJsonHeader = styled.div`
  color: #FFA1AD;
  line-height: 3;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 0 0.9375rem;
  letter-spacing: 0.08em;
  border-radius: 0.5625rem;
  text-transform: uppercase;
  background-color: #1D2027;

  ${MEDIA_QUERY_IS_MOBILE_XS} {
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
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;

  ${MEDIA_QUERY_IS_MOBILE_XS} {
    font-size: 0.75em;
    letter-spacing: normal;
    padding: 0.625rem 1.125rem;
  }
`;

const PrettyPrintHtml = React.memo<PrintHtmlProps>(({ header }) => (
  <PrintJsonRoot>
    <PrintJsonHeader>{header}</PrintJsonHeader>
    <PrintJsonPre>{CLASS_NAME_HTML}</PrintJsonPre>
  </PrintJsonRoot>
));

const PrettyPrintJson = React.memo<PrintJsonProps>(({ data, header }) => {
  const jsonWithoutQuotes = JSON.stringify(data || {}, null, 2)
    .replace(/"/g, '')
    .replace(/\\n/g, '')
    .replace(/\\/g, '');

  return (
    <PrintJsonRoot>
      <PrintJsonHeader>{header}</PrintJsonHeader>
      <PrintJsonPre>{jsonWithoutQuotes}</PrintJsonPre>
    </PrintJsonRoot>
  );
});

export {
  PrettyPrintHtml,
  PrettyPrintJson
};