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
  overflow: hidden;
  border-radius: 10px;
  margin: 1rem 1.5rem;
  background-color: #282c34;

  ${MEDIA_QUERY_IS_MOBILE} {
    margin: 1rem 0;
  }
`;

const Header = styled.div`
  color: #999;
  line-height: 3;
  font-size: 14px;
  padding: 0 .9rem;
  font-weight: 700;
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
    margin: 1rem !important;

    > code {
      font-size: 14px !important;
      text-shadow: none !important;

      ${MEDIA_QUERY_IS_MOBILE_XS} {
        font-size: 12px !important;
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