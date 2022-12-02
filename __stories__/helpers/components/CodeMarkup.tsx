import React, { memo } from 'react';
import styled from 'styled-components';
import { MEDIA_QUERY_IS_MOBILE } from '../styled';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';

// Register light build of react-syntax-highlighter and register only what is needed
const dark = require('react-syntax-highlighter/dist/esm/styles/prism/dark').default;
const markup = require('react-syntax-highlighter/dist/esm/languages/prism/markup').default;
const javascript = require('react-syntax-highlighter/dist/esm/languages/prism/javascript').default;

SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('javascript', javascript);

type CodeMarkupProps = Readonly<{
  data: any;
  header: string;
  language: string;
  formatFn?: (data: any) => string;
}>;

const CodeMarkupContainer = styled.div`
  overflow: hidden;
  border-radius: 5px;
  margin: 1rem 1.5rem;
  background: #292d3e;

  ${MEDIA_QUERY_IS_MOBILE} {
    margin: 1rem 0;
  }
`;

const Header = styled.div`
  font-size: 14px;
  padding: 0 .9rem;
  font-weight: 700;
  line-height: 2.95;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(235, 235, 235, 0.45);
  background-color: rgba(0, 0, 0, 0.2);
`;

const PreContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: 0;
  min-height: 365px !important;
  max-height: 365px !important;

  pre {
    line-height: 20px;
    margin: 1rem !important;

    > code {
      padding: 0;
      color: #A6ACCD !important;
      font-size: 14px !important;
      font-weight: 400 !important;
      line-height: 20px !important;
      text-shadow: none !important;

      .boolean {
        color: #FF9CAC;
      }

      .number {
        color: #F78C6C;
      }

      .function {
        color: #82AAFF;
      }

      .tag {
        color: #F07178;
      }

      .attr-name {
        color: #c792ea;
      }

      .string,
      .tag.attr-value {
        color: #C3E88D;
      }

      .property {
        color: #F07178;
      }

      .operator,
      .token.punctuation,
      .tag.punctuation,
      .tag.attr-value.punctuation {
        color: #89DDFF;
      }
    }
  }
`;

const CodeMarkup = memo<CodeMarkupProps>(({
  data,
  header,
  language,
  formatFn
}) => (
  <CodeMarkupContainer>
    <Header>{header}</Header>
    <PreContainer>
      <SyntaxHighlighter
        wrapLines
        style={dark}
        language={language}
        useInlineStyles={false}
      >
        {formatFn ? formatFn(data) : data}
      </SyntaxHighlighter>
    </PreContainer>
  </CodeMarkupContainer>
));

CodeMarkup.displayName = 'CodeMarkup';

export default CodeMarkup;