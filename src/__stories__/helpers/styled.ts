import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0.25rem 1.75rem;
`;

export const SelectContainer = styled.div`
  width: 100%;
  margin-top: 1rem;

  @media only screen and (min-width: 992px) {
    width: 60%;
  }

  @media only screen and (min-width: 770px) and (max-width: 991px) {
    width: 75%;
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

  @media only screen and (min-width: 992px) {
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
    margin-top: .25em;
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
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const Code = styled.code`
  color: #212529;
  font-size: 0.94em;
  word-break: break-word;
  border-radius: 0.25rem;
  padding: .185em .25em .1em;
  background-color: rgba(255, 229, 100, 0.2);
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
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

export const Button = styled.button<{ isActive?: boolean }>`
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
  background-color: #eeeff0;
  -webkit-appearance: button;
  border: 1px solid transparent;
  transition: color 0.15s ease-out, background-color 0.15s ease-out;

  :focus {
    outline: 0;
  }

  :hover {
    background-color: #E1E2E3;
  }

  ${({ isActive }) => isActive && css`
    color: #fff;
    background-color: #007bff;

    :hover {
      background-color: #0067EB;
    }
  `}
`;

export const Label = styled.label<{ $readOnly?: boolean }>`
  margin-top: 0.5rem;
  display: inline-block;

  > span {
    user-select: none;
    font-style: italic;
    margin-left: 0.4rem;
    color: rgb(102, 102, 102);
  }

  ${({ $readOnly }) => $readOnly && css`
    opacity: 0.7;
    cursor: default;
    pointer-events: none;

    > input {
      opacity: 0.7;
    }
  `}
`;

export const LabelText = styled.span`
  margin-right: 1.15rem;
  vertical-align: middle;
`;

export const CheckboxGroup = styled.div`
  font-size: 1rem;

  > label {
    margin-top: 1rem;

    :not(:last-of-type) {
      margin-right: 1.35rem;
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
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.085);
`;

export const CardHeader = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 1.15rem;
  flex-flow: row wrap;
  background-color: #fff;
  padding: 0.75rem 1.25rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom: 1px solid #f2f2f2;
`;

export const CardBody = styled.div`
  flex: 1 1 auto;
  min-height: 35rem;
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

  @media only screen and (min-width: 992px) {
    max-width: 85%;
  }
`;

export const Paragraph = styled.p`
  ${_paragraphStyles}
`;

export const JsonContainer = styled.div`
  ${_paragraphStyles}
`;