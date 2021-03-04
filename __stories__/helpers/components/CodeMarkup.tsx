import { memo } from 'react';
import styled from 'styled-components';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { MEDIA_QUERY_IS_MOBILE, MEDIA_QUERY_IS_MOBILE_XS } from '../styled';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';

// Register light build of react-syntax-highlighter and register only what is needed
SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('javascript', javascript);

type CodeMarkupProps = Readonly<{
  data: any;
  header: string;
  language: string;
  formatFn?: (data: any) => string;
}>;

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
  color: #999;
  line-height: 3;
  padding: 0 .9rem;
  font-weight: 700;
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
    margin: 0 !important;
    border: none !important;
    margin: 1rem !important;
    box-shadow: none !important;
    text-shadow: none !important;
    background: #282c34 !important;

    > code {
      font-size: 14px !important;
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

      .boolean {
        color: rgb(255, 139, 80);
      }

      .function {
        color: rgb(121, 182, 242);
      }

      .number {
        color: rgb(90, 155, 207);
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
        font-size: 12px !important;

        .block-comment,
        .comment {
          display: none !important;
        }
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