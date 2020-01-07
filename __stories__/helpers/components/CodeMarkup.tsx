import React from 'react';
import styled from 'styled-components';
import { MEDIA_QUERY_IS_MOBILE, MEDIA_QUERY_IS_MOBILE_XS } from '../styled';

// Register light build of react-syntax-highlighter and register only what is needed
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/dark';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';

SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('javascript', javascript);

type CodeMarkupProps = {
  readonly data: any;
  readonly header: string;
  readonly language: string;
  readonly formatFn?: (data: any) => string;
};

const CodeMarkupContainer = styled.div`
  margin: 1rem 1.5rem;
  font-size: 1rem;
  overflow: hidden;
  border-radius: 0.625rem;
  background-color: rgb(40, 44, 52);

  ${MEDIA_QUERY_IS_MOBILE} {
    margin: 1rem 0;
  }
`;

const Header = styled.div`
  color: #999;
  line-height: 3;
  padding: 0 .9rem;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  border-radius: 0.625rem;
  background-color: #20232A;
  text-transform: uppercase;
`;

const PreContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: 0.625rem;
  min-height: 380px !important;
  max-height: 380px !important;

  pre {
    font-size: 14px;
    border: none !important;
    box-shadow: none !important;
    text-shadow: none !important;
    padding: 1em 1.25em !important;
    margin: 0 0 0.25em 0 !important;
    background-color: #282c34 !important;

    > code {
      background: none !important;
      text-shadow: none !important;
      font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace !important;

      &:first-of-type {
        color: #BFC2C0 !important;
        padding-right: 20px !important;
      }

      &:last-of-type {
        display: inherit;

        .tag,
        .string,
        .number {
          color: #FFB0BC;
        }

        .operator,
        .punctuation {
          color: #B0FFF3;
        }

        .attr-name {
          color: #CCB0FF;
        }
      }
    }

    ${MEDIA_QUERY_IS_MOBILE_XS} {
      font-size: 12px;
      > code:first-of-type {
        padding-right: 10px !important;
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