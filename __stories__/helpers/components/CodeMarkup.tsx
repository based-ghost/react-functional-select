import React from 'react';
import styled from 'styled-components';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { MEDIA_QUERY_IS_MOBILE, MEDIA_QUERY_IS_MOBILE_XS } from '../styled';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';

// Register light build of react-syntax-highlighter and register only what is needed
SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('javascript', javascript);

type CodeMarkupProps = {
  readonly data: any;
  readonly header: string;
  readonly language: string;
  readonly formatFn?: (data: any) => string;
};

const CodeMarkupContainer = styled.div`
  font-size: 1rem;
  overflow: hidden;
  border-radius: 6px;
  margin: 1rem 1.5rem;
  background-color: #282c34;

  ${MEDIA_QUERY_IS_MOBILE} {
    margin: 1rem 0;
  }
`;

const Header = styled.div`
  line-height: 3;
  color: #999;
  padding: 0 .9rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background-color: #20232a;
`;

const PreContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: 6px;
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
      display: inherit;
      color: #fff;

      .block-comment,
      .comment {
        color: #ddd;
        padding-right: 1.75em !important;
      }

      .boolean,
      .function,
      .number {
        color: rgb(121, 182, 242);
      }

      .tag {
        color: rgb(252, 146, 158);
      }

      .attr-name {
        color: rgb(197, 165, 197);
      }

      .string,
      .tag.attr-value {
        color: rgb(141, 200, 145);
      }

      .token.punctuation,
      .tag.punctuation,
      .tag.attr-value.punctuation {
        color: rgb(136, 198, 190);
      }

      .operator {
        color: rgb(215, 222, 234);
      }

      ${MEDIA_QUERY_IS_MOBILE_XS} {
        font-size: 12.5px !important;

        .block-comment,
        .comment {
          min-width: 2.25em !important;
          padding-right: 1.25em !important;
        }
      }
    }
  }
`;

const CodeMarkup = React.memo<CodeMarkupProps>(({
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