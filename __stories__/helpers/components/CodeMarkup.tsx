import { memo } from 'react';
import styled from 'styled-components';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { MEDIA_QUERY_IS_MOBILE, MEDIA_QUERY_IS_MOBILE_XS } from '../styled';

// Register light build of react-syntax-highlighter and register only what is needed
const markup = require('react-syntax-highlighter/dist/esm/languages/prism/markup').default;
const javascript = require('react-syntax-highlighter/dist/esm/languages/prism/javascript').default;
const dark = require('react-syntax-highlighter/dist/esm/styles/prism/dark').default;

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
  border-radius: 6px;
  margin: 1rem 1.5rem;
  background: #282c34;

  ${MEDIA_QUERY_IS_MOBILE} {
    margin: 1rem 0;
  }
`;

const Header = styled.div`
  color: #999;
  font-size: 14px;
  padding: 0 .9rem;
  font-weight: 700;
  line-height: 2.95;
  letter-spacing: 0.075em;
  text-transform: uppercase;
  background-color: #20232a;

  ${MEDIA_QUERY_IS_MOBILE_XS} {
    font-size: 12px;
  }
`;

const PreContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: 0;
  min-height: 385px !important;
  max-height: 385px !important;

  pre {
    line-height: 20px;
    margin: 1rem !important;

    > code {
      padding: 0;
      font-size: 14px !important;
      font-weight: 400 !important;
      line-height: 20px !important;
      text-shadow: black 0px -0.1em 0.2em !important;

      ${MEDIA_QUERY_IS_MOBILE_XS} {
        font-size: 12px !important;
      }

      .boolean {
        color: #ff8b50;
      }

      .number,
      .function {
        color: #79b6f2;
      }

      .tag {
        color: #fc929e;
      }

      .attr-name {
        color: #c5a5c5;
      }

      .string,
      .tag.attr-value {
        color: #8dc891;
      }

      .operator,
      .token.punctuation,
      .tag.punctuation,
      .tag.attr-value.punctuation {
        color: #88c6be;
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
    <Header>
      {header}
    </Header>
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

export default CodeMarkup;