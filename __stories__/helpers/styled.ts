import styled, { css } from 'styled-components';

export const MEDIA_QUERY_IS_MOBILE = '@media only screen and (max-width: 768px)';
export const MEDIA_QUERY_IS_MOBILE_XS = '@media only screen and (max-width: 525px)';
export const MEDIA_QUERY_IS_TABLET_OR_DESKTOP = '@media only screen and (min-width: 992px)';
export const MEDIA_QUERY_IS_TABLET = '@media only screen and (max-width: 991px) and (min-width: 769px)';

export const Container = styled.div`
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0.25rem 1.75rem;

  ${MEDIA_QUERY_IS_MOBILE} {
    font-size: 0.96em;
    padding: 0.25rem 1.25rem;
  }
`;

export const SelectContainer = styled.div`
  width: 60%;
  margin-top: 1rem;

  ${MEDIA_QUERY_IS_TABLET} {
    width: 75%;
  }

  ${MEDIA_QUERY_IS_MOBILE} {
    width: 100%;
  }
`;

export const ListWrapper = styled.div`
  margin-top: 0;
  display: block;
  margin-bottom: 1rem;
  margin-block-end: 1em;
  margin-inline-end: 0px;
  margin-block-start: 1em;
  margin-inline-start: 0px;

  ${MEDIA_QUERY_IS_TABLET_OR_DESKTOP} {
    max-width: 85%;
  }
`;

export const List = styled.ul`
  display: block;
  padding-left: 1.75rem;
  margin-block-end: 1em; 
  list-style-type: disc;
  margin-inline-end: 0px;
  margin-block-start: 1em;
  margin-inline-start: 0px;
  padding-inline-start: 30px;

  li + li {
    margin-top: 0.5em;
  }
  
  ${MEDIA_QUERY_IS_MOBILE} {
    padding-inline-start: 20px;
  }
`;

export const ListItem = styled.li`
  display: list-item;
  text-align: -webkit-match-parent;
`;

export const Hr = styled.hr`
  border: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-bottom: .225rem;
  border-top: 1px solid #ddd;
`;

export const Code = styled.code`
  margin: 0 1px;
  color: #D8205E;
  padding: 3px 5px;
  font-size: 0.90em;
  border-radius: 0.3em;
  word-break: break-word;
  background-color: rgba(27, 31, 35, 0.06);
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;

  ${MEDIA_QUERY_IS_MOBILE_XS} {
    padding: .1em .25em .1em;
  }
`;

export const CodeHeader = styled(Code)`
  font-size: 1em;
  color: #212529;
  font-weight: 600;
  line-height: 1.7;
  padding: 3.2px 6.4px;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  margin-top: .5rem;
  margin-bottom: .5rem;
`;

export const SubTitle = styled.h4`
  font-weight: 600;
  line-height: 1.2;
  font-size: 1.65rem;
  margin-top: 1.25rem;
  margin-bottom: .5rem;
`;

export const ButtonGroup = styled.div`
  > button {
    min-width: 4.5rem;
    margin-top: 0.5rem;
    
    :not(:last-of-type) {
      margin-right: .5rem;
    }
  }
`;

export const Button = styled.button`
  border: 0;
  color: #212529;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  overflow: visible;
  user-select: none;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  border-radius: 0.25rem;
  padding: .375rem .75rem;
  -webkit-appearance: button;
  background-color: rgba(9, 30, 66, 0.075);
  transition: color 0.2s ease-out, background-color 0.2s ease-out;

  :focus {
    outline: 0;
  }

  :hover {
    background-color: rgba(9, 30, 66, 0.125);
  }

  ${MEDIA_QUERY_IS_MOBILE} {
    display: block;
    width: 100%;
  }

  ${MEDIA_QUERY_IS_MOBILE_XS} {
    font-size: 0.9em;
  }
`;

export const Label = styled.label`
  color: #5E5E5E;
  user-select: none;
  font-style: italic;
  margin-top: 0.4rem;
  margin-left: 0.4rem;
  margin-right: 1.15rem;
  display: inline-block;
  vertical-align: middle;
`;

export const LabelHeader = styled(Label)`
  margin-bottom: 0.4rem;
`;

export const CheckboxGroup = styled.div`
  font-size: 1rem;

  > label {
    margin-top: 1rem;

    :not(:last-of-type) {
      margin-right: 1.35rem;
    }

    ${MEDIA_QUERY_IS_MOBILE} {
      margin-top: 0.75rem;
    }
  }
`;

export const Card = styled.div`
  min-width: 0;
  display: flex;
  margin: 1.25rem 0;
  position: relative;
  word-wrap: break-word;
  border-radius: 0.25rem;
  background-color: #fff;
  flex-direction: column;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
`;

export const CardHeader = styled.div<{ supportMobile?: boolean }>`
  display: flex;
  font-weight: 600;
  font-size: 1.15rem;
  flex-flow: row wrap;
  background-color: #fff;
  padding: 0.75rem 1.25rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);

  ${MEDIA_QUERY_IS_MOBILE} {
    text-align: center;
  }

  ${({ supportMobile }) => supportMobile && css`
    > * {
      ${MEDIA_QUERY_IS_MOBILE} {
        width: 100%;
        display: block;
        margin: 0 3.25rem 0.25rem;
      }

      ${MEDIA_QUERY_IS_MOBILE_XS} {
        margin: 0 1.25rem 0.25rem;
      }
    }
  `}
`;

export const CardBody = styled.div`
  flex: 1 1 auto;
  min-height: 32rem;
  padding: 0.75rem 1.25rem;
`;

export const Spacer = styled.div`
  display: block;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`;

// Need to implement a div version of Paragraph since PrettyPrintJson contains an <pre> element
// ...which cannot be a child of a <p> element
const _paragraphStyles = css`
  margin-top: 0;
  display: block;
  margin-bottom: 1rem;
  margin-block-end: 1em;
  margin-inline-end: 0px;
  margin-block-start: 1em;
  margin-inline-start: 0px;

  ${MEDIA_QUERY_IS_TABLET_OR_DESKTOP} {
    max-width: 85%;
  }
`;

export const Paragraph = styled.p`
  ${_paragraphStyles}
`;

export const JsonContainer = styled.div`
  ${_paragraphStyles}
`;