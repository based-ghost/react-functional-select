import styled, { css, keyframes } from 'styled-components';

export const MEDIA_QUERY_IS_MOBILE = '@media only screen and (max-width: 768px)';
export const MEDIA_QUERY_IS_MOBILE_XS = '@media only screen and (max-width: 525px)';
export const MEDIA_QUERY_IS_TABLET_OR_DESKTOP = '@media only screen and (min-width: 992px)';
export const MEDIA_QUERY_IS_TABLET = '@media only screen and (max-width: 991px) and (min-width: 769px)';

// Need to implement a div version of Paragraph since PrettyPrintJson contains an <pre> element
// ...which cannot be a child of a <p> element
const PARAGRAPH_BASE_STYLE = css`
  margin-top: 0;
  display: block;
  margin-bottom: 1rem;
  margin-block-end: 1em;
  margin-inline-end: 0px;
  margin-block-start: 1em;
  margin-inline-start: 0px;
`;

export const Content = styled.p`
  ${PARAGRAPH_BASE_STYLE}
`;

export const Paragraph = styled.p`
  ${PARAGRAPH_BASE_STYLE}

  ${MEDIA_QUERY_IS_TABLET_OR_DESKTOP} {
    max-width: 85%;
  }
`;

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

export const Hr = styled.hr`
  border: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-bottom: .225rem;
  border-top: 1px solid #ddd;
`;

export const Columns = styled.div`
  width: 100%;

  ${MEDIA_QUERY_IS_TABLET_OR_DESKTOP} {
    display: flex;
  }
`;

export const Column = styled.div<{widthPercent?: number}>`
  flex-grow: 1;
  flex-basis: 0;
  flex-shrink: 1;
  display: block;
  padding: 0.25rem;

  ${MEDIA_QUERY_IS_MOBILE} {
    padding: 0.25rem 0;
    width: 100% !important;
  }

  ${({widthPercent}) =>
    widthPercent &&
    css`
      flex: none;
      width: ${widthPercent}%;
    `}
`;

export const ListWrapper = styled.div`
  ${PARAGRAPH_BASE_STYLE}

  ${MEDIA_QUERY_IS_TABLET_OR_DESKTOP} {
    max-width: 85%;
  }

  &.is-class-list {
    max-width: 100% !important;

    ul {
      li + li {
        margin-top: 0.55em !important;
      }
    }
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
  padding-inline-start: 20px;

  li + li {
    margin-top: 0.6em;
  }
`;

export const Li = styled.li`
  display: list-item;
  text-align: match-parent;
`;

export const TextHeader = styled.span`
  color: #476582;
  font-size: 90%;
  line-height: 1.7;
  border-radius: 4px;
  padding: .175em .475em;
  word-break: break-word;
  background-color: #f1f1f1;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.167;
  margin-top: 0.5rem;
  margin-bottom: .5rem;
`;

export const SubTitle = styled.h4`
  font-weight: 700;
  line-height: 1.167;
  font-size: 1.65rem;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.00735em;
`;

export const Button = styled.button`
  border: 0;
  color: #262626;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  overflow: visible;
  user-select: none;
  text-align: center;
  border-radius: 3px;
  display: inline-block;
  vertical-align: middle;
  background-color: #eaebec;
  padding: 0.375rem 0.75rem;
  -webkit-appearance: button;
  transition: color 0.2s ease-out, background-color 0.2s ease-out;

  :focus {
    outline: 0;
  }

  :hover, :focus {
    background-color: #DDDEDF;
  }

  ${MEDIA_QUERY_IS_MOBILE} {
    display: block;
    width: 100% !important;
  }

  ${MEDIA_QUERY_IS_MOBILE_XS} {
    font-size: 0.9em;
  }
`;

export const Buttons = styled.div`
  > button {
    min-width: 6.25rem;
    margin-top: 0.5rem;

    :not(:last-of-type) {
      margin-right: 0.5rem;
    }
  }
`;

export const Label = styled.label`
  width: 100%;
  font-weight: 600;
  text-align: left;
  user-select: none;
  display: inline-block;
  vertical-align: middle;
  color: rgba(0, 0, 0, 0.45);
  margin: 0.5rem auto 0.25rem 0;

  ${MEDIA_QUERY_IS_MOBILE} {
    margin: 0 auto 0.15rem 0;
  }
`;

export const Checkboxes = styled.div`
  font-size: 1rem;

  > label {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    :not(:last-of-type) {
      margin-right: 1.35rem;
    }
  }

  ${MEDIA_QUERY_IS_MOBILE} {
    text-align: left;

    > label {
      width: 100%;
      margin-left: auto;
      margin-top: 0.425rem;
      margin-bottom: 0.425rem;
    }
  }
`;

export const Card = styled.div`
  min-width: 0;
  display: flex;
  margin: 1.25rem 0;
  position: relative;
  border-radius: 3px;
  word-wrap: break-word;
  background-color: #fff;
  flex-direction: column;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 3px 0px, rgb(0 0 0 / 5%) 0px 5px 15px 0px;

  ${MEDIA_QUERY_IS_MOBILE} {
    border: none;
    border-radius: 0;
    box-shadow: none;
    margin: 0;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  font-size: 1.15rem;
  flex-flow: row wrap;
  background-color: #fff;
  padding: 0.75rem 1.25rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);

  ${MEDIA_QUERY_IS_MOBILE} {
    font-size: 1.1rem;
    text-align: center;
    display: inline-block;
    padding: 0 1.15rem 1rem;
  }
`;

export const CardBody = styled.div<{ multiComponents?: boolean }>`
  flex: 1 1 auto;
  min-height: 32rem;
  padding: 0.75rem 1.25rem;

  ${({ multiComponents }) =>
    multiComponents &&
    css`
      > div {
        margin-bottom: 3rem;

        :first-of-type > label {
          margin-top: 0;
        }

        > label {
          font-size: 18px;
          margin-bottom: 0.5rem;
        }
      }
    `}

  ${MEDIA_QUERY_IS_MOBILE} {
    padding: 0.5rem 0;
  }
`;

export const OtherSpan = styled.span`
  opacity: 0.75;
  font-size: 0.75em;
  margin-top: 0.075em;
  margin-left: 0.45em;
`;

export const MenuPortalElement = styled.div<{ menuOpen: boolean; }>`
  width: 100%;
  margin: 0.5rem 0;
  min-height: 115px;
  position: relative;
  border-radius: 3px;
  transition: background-color 0.2s ease-out;
  background-color: ${({ menuOpen }) => menuOpen ? 'white' : 'whitesmoke'};

  span {
    font-weight: 700;
    font-size: 1.5em;
    text-align: center;
    padding: 1.25em 1em;
    color: rgba(0,0,0,0.6);
    display: ${({ menuOpen }) => menuOpen ? 'none' : 'block'};
  }
`;

// =======================================
// Advanced story specific
// =======================================

const SPIN_KEYFRAMES = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

const SPIN_ANIMATION_CSS = css`animation: ${SPIN_KEYFRAMES} infinite 8s linear;`;

export const ReactSvg = styled.svg<{ isDisabled?: boolean }>`
  width: 30px;
  height: 30px;
  color: #1ea7fd;
  fill: currentColor;
  display: inline-block;
  ${({ isDisabled }) => !isDisabled && SPIN_ANIMATION_CSS}
`;

export const ChevronDownSvg = styled.svg<{ menuOpen: boolean }>`
  width: 14px;
  height: 14px;
  fill: currentColor;
  transition: transform 0.25s ease-in-out;
  ${({ menuOpen }) => menuOpen && css`transform: rotate(180deg);`}
`;

export const OptionContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const OptionName = styled.span`
  color: #515151;
  font-weight: 600;
  margin-left: 1px;
`;