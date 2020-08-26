import React from 'react';
import styled from 'styled-components';
import { MEDIA_QUERY_IS_MOBILE, MEDIA_QUERY_IS_MOBILE_XS } from '../styled';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Register light build of react-syntax-highlighter and register only what is needed
SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('javascript', javascript);

type CodeMarkupProps = {
  readonly data: any;
  readonly header: string;
  readonly language: string;
  readonly textColor?: string;
  readonly formatFn?: (data: any) => string;
};

const CodeMarkupContainer = styled.div`
  font-size: 1rem;
  overflow: hidden;
  border-radius: 8px;
  margin: 1rem 1.5rem;
  background-color: #282c34;

  ${MEDIA_QUERY_IS_MOBILE} {
    margin: 1rem 0;
  }
`;

const Header = styled.div`
  line-height: 3;
  color: #9E9E9E;
  padding: 0 .9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background-color: #20232a;
`;

const PreContainer = styled.div<{ $color: string }>`
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
    background-color: #282c34 !important;

    > code {
      background: none !important;
      text-shadow: none !important;
      font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace !important;

      > code {
        color: rgba(255,255,255,0.975) !important;
      }

      &:first-of-type {
        color: #94A7A7 !important;
        padding-right: 20px !important;
      }

      &:last-of-type {
        display: inherit;
        color: ${({ $color }) => $color} !important;

        .tag, .string, .number {
          color: #fc929e;
        }

        .attr-value, .operator, .punctuation {
          color: #8dc891;
        }

        .attr-name {
          color: #79b6f2;
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
  textColor = 'rgba(255,255,255,0.975)'
}) => (
  <CodeMarkupContainer>
    <Header>{header}</Header>
    <PreContainer $color={textColor}>
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