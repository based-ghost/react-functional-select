import React from 'react';
import styled from 'styled-components';
import classNameMarkup from '../classNameMarkup';
import { MEDIA_QUERY_IS_MOBILE, MEDIA_QUERY_IS_MOBILE_XS } from '../styled';

// Register light build of react-syntax-highlighter and register only what is needed
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/dark';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';

SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('javascript', javascript);

type CodeMarkupProps = {
  readonly data?: any;
  readonly header: string;
  readonly language: string;
  readonly formatFn?: (data: any) => string;
};

const COLOR_BG = '#061B2C';
const COLOR_HEADER = '#809393';
const COLOR_HEADER_BG = '#001122';
const COLOR_PRE_BG = COLOR_BG;
const COLOR_CODE_TAG = '#ffa7c4';
const COLOR_CODE_ATTR_VALUE = '#fff';
const COLOR_CODE_ATTR_NAME = '#82aaff';
const COLOR_LINE_NUMBER = '#94A7A7';
const COLOR_CODE_PUNCTUATION = '#c792ea';

const CodeMarkupContainer = styled.div`
  font-size: 1rem;
  overflow: hidden;
  border-radius: 8px;
  margin: 1rem 1.5rem;
  background-color: ${COLOR_BG};

  ${MEDIA_QUERY_IS_MOBILE} {
    margin: 1rem 0;
  }
`;

const Header = styled.div`
  line-height: 3;
  padding: 0 .9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${COLOR_HEADER};
  background-color: ${COLOR_HEADER_BG};
`;

const PreContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: 8px;
  min-height: 385px !important;
  max-height: 385px !important;

  pre {
    font-size: 14px;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
    text-shadow: none !important;
    padding: 1em 1.25em !important;
    background-color: ${COLOR_PRE_BG} !important;

    > code {
      background: none !important;
      text-shadow: none !important;
      font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace !important;

      &:first-of-type {
        padding-right: 20px !important;
        color: ${COLOR_LINE_NUMBER} !important;
      }

      &:last-of-type {
        display: inherit;

        .tag, .string, .number, .operator {
          color: ${COLOR_CODE_TAG};
        }

        .attr-value {
          color: ${COLOR_CODE_ATTR_VALUE};
        }

        .punctuation {
          color: ${COLOR_CODE_PUNCTUATION};
        }

        .attr-name {
          color: ${COLOR_CODE_ATTR_NAME};
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
  formatFn
}) => {
  const dataOrDefault = data || classNameMarkup;
  const codeSyntax = formatFn ? formatFn(dataOrDefault) : dataOrDefault;

  return (
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
          {codeSyntax}
        </SyntaxHighlighter>
      </PreContainer>
    </CodeMarkupContainer>
  )
});

export default CodeMarkup;