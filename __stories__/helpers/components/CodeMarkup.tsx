import React from 'react';
import styled from 'styled-components';
import { MEDIA_QUERY_IS_MOBILE } from '../styled';

// Register async-light build of react-syntax-highlighter and register only what is needed
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/dark';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-async-light';

SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('markup', markup);

type CodeMarkupProps = {
  readonly data: any;
  readonly header: string;
  readonly language: string;
  readonly formatFn?: (data: any) => string;
};

const CodeMarkupContainer = styled.div`
  margin: 1rem;
  font-size: 1rem;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: rgb(40, 44, 52);
  box-shadow: rgba(20, 20, 20, 0.19) 1px 1px 18px;

  ${MEDIA_QUERY_IS_MOBILE} {
    margin: 1rem 0;
  }
`;

const Header = styled.div`
  color: #A5A8A6;
  line-height: 3;
  padding: 0 .9rem;
  font-weight: 700;
  font-size: 1.075rem;
  border-radius: 0.5rem;
  letter-spacing: 0.08em;
  background-color: #20232A;
  text-transform: uppercase;
`;

const PreContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  max-height: 425px !important;

  pre {
    font-size: 14px;
    text-shadow: none !important;
    padding: 1em 1.25em !important;
    margin: 0 0 0.25em 0 !important;
    background-color: rgb(40, 44, 52) !important;
    border: 0.3em solid rgb(40, 44, 52) !important;
    box-shadow: rgb(40, 44, 52) 1px 1px 0.5em inset !important;

    > code {
      text-shadow: none !important;

      &:first-of-type {
        color: #BFC2C0 !important;
        padding-right: 20px !important;
      }

      &:last-of-type {
        display: inherit;

        span {
          &.token.tag.token.tag {
            color: #FFB0BC;
          }

          &.token.tag.token.tag.token.punctuation {
            color: #B0FFF3;
            font-weight: 400;
          }

          &.token.tag.token.attr-name {
            color: #CCB0FF;
          }

          &.token.operator,
          &.token.punctuation {
            color: #A6F5E9;
            font-weight: 600;
          }
        }
      }
    }
  }
`;

const CodeMarkup = React.memo<CodeMarkupProps>(({
  data,
  header,
  language,
  formatFn,
}) => (
  <CodeMarkupContainer>
    <Header>{header}</Header>
    <PreContainer>
      <SyntaxHighlighter
        wrapLines
        style={dark}
        showLineNumbers
        language={language}
        useInlineStyles={false}
      >
        {formatFn ? formatFn(data) : data}
      </SyntaxHighlighter>
    </PreContainer>
  </CodeMarkupContainer>
));

export default CodeMarkup;