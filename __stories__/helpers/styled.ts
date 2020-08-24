import styled, { css, keyframes } from 'styled-components';

export const MEDIA_QUERY_IS_DESKTOP = '@media screen and (min-width: 1024px)';
export const MEDIA_QUERY_IS_MOBILE = '@media only screen and (max-width: 768px)';
export const MEDIA_QUERY_IS_MOBILE_XS = '@media only screen and (max-width: 525px)';
export const MEDIA_QUERY_IS_TABLET_OR_DESKTOP = '@media only screen and (min-width: 992px)';
export const MEDIA_QUERY_IS_TABLET = '@media only screen and (max-width: 991px) and (min-width: 769px)';

// Need to implement a div version of Paragraph since PrettyPrintJson contains an <pre> element
// ...which cannot be a child of a <p> element
const PARAGRAPH_CSS = css`
  margin-top: 0;
  display: block;
  margin-bottom: 1rem;
  margin-block-end: 1em;
  margin-inline-end: 0px;
  margin-block-start: 1em;
  margin-inline-start: 0px;
`;

export const Content = styled.p`
  ${PARAGRAPH_CSS}
`;

export const Paragraph = styled.p`
  ${PARAGRAPH_CSS}
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

export const Column = styled.div<{ widthPercent?: number }>`
  flex-grow: 1;
  flex-basis: 0;
  flex-shrink: 1;
  display: block;
  padding: 0.25rem;

  ${MEDIA_QUERY_IS_MOBILE} {
    padding: 0.25rem 0;
    width: 100% !important;
  }

  ${({ widthPercent }) =>
    widthPercent
    && (`
      flex: none;
      width: ${widthPercent}%;
    `)}
`;

export const ListWrapper = styled.div`
  ${PARAGRAPH_CSS}

  ${MEDIA_QUERY_IS_TABLET_OR_DESKTOP} {
    max-width: 85%;
  }

  &.is-class-list {
    font-weight: 600;
    max-width: 100% !important;

    ul {
      li + li {
        margin-top: 0.5em !important;
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
  padding-inline-start: 30px;

  li + li {
    margin-top: 0.55em;
  }

  ${MEDIA_QUERY_IS_MOBILE} {
    padding-inline-start: 20px;
  }
`;

export const ListItem = styled.li`
  display: list-item;
  text-align: match-parent;
`;

export const TextHeader = styled.span`
  color: black;
  font-weight: 600;
  line-height: 1.6;
  font-size: 1.025em;
  letter-spacing: 0.01em;
  word-break: break-word;
  padding: 3px 0 3px 6.4px;

  ${MEDIA_QUERY_IS_MOBILE_XS} {
    padding: .1em .25em .1em;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.167;
  margin-top: 0.5rem;
  margin-bottom: .5rem;
`;

export const SubTitle = styled.h4`
  font-weight: 600;
  line-height: 1.167;
  font-size: 1.65rem;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.00735em;
`;

export const ButtonGroup = styled.div`
  > button {
    min-width: 4.5rem;
    margin-top: 0.5rem;

    :not(:last-of-type) {
      margin-right: 0.5rem;
    }
  }
`;

export const Button = styled.button`
  border: 0;
  color: #212428;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  overflow: visible;
  user-select: none;
  text-align: center;
  border-radius: 3px;
  display: inline-block;
  vertical-align: middle;
  padding: 0.375rem 0.75rem;
  -webkit-appearance: button;
  background-color: rgba(9, 30, 66, 0.075);
  transition: color 0.2s ease-out, background-color 0.2s ease-out;

  :focus {
    outline: 0;
  }

  :hover {
    background-color: rgba(9, 30, 66, 0.115);
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
  user-select: none;
  display: inline-block;
  vertical-align: middle;
  color: rgba(0, 0, 0, 0.54);
  margin: 0.4rem 1.15rem 0rem 0.4rem;

  ${MEDIA_QUERY_IS_MOBILE} {
    margin: 0 auto .25rem auto;
  }
`;

export const LabelHeader = styled(Label)`
  margin-bottom: 0.4rem;

  ${MEDIA_QUERY_IS_MOBILE} {
    text-align: left;
    margin: 0 auto 0.4rem 0;
  }
`;

export const LabelNote = styled(Label)`
  margin: 0.5rem auto 0.5rem 0;

  ${MEDIA_QUERY_IS_MOBILE} {
    text-align: left;
    margin: 0 auto 0.4rem 0;
  }
`;

export const CheckboxGroup = styled.div`
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
      margin-left: auto;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;

      :not(:last-of-type) {
        margin-right: 1.25rem;
      }
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

  ${MEDIA_QUERY_IS_MOBILE} {
    border: none;
    border-radius: 0;
    box-shadow: none;
    margin: 0;
  }
`;

export const CardHeader = styled.div<{ supportMobile?: boolean }>`
  display: flex;
  font-size: 1.15rem;
  flex-flow: row wrap;
  background-color: #fff;
  padding: 0.75rem 1.25rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);

  ${MEDIA_QUERY_IS_MOBILE} {
    text-align: center;
    padding: 0 0 1rem 0;
  }

  ${({ supportMobile }) =>
    supportMobile
    && (`
      > * {
        ${MEDIA_QUERY_IS_MOBILE} {
          width: 100%;
          display: block;
          margin: 0 3.25rem 0.5rem;
        }

        ${MEDIA_QUERY_IS_MOBILE_XS} {
          margin: 0 1.25rem 0.5rem;
        }
      }
    `)}
`;

export const CardBody = styled.div`
  flex: 1 1 auto;
  min-height: 32rem;
  padding: 0.75rem 1.25rem;

  ${MEDIA_QUERY_IS_MOBILE} {
    padding: 0.75rem 0;
  }
`;

export const OtherSpan = styled.span`
  opacity: 0.75;
  font-size: 0.75em;
  margin-top: 0.05em;
  margin-left: 0.45em;
`;

// =======================================
// Advanced story specific
// =======================================

const SPIN_LOGO = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

const SPIN_ANIMATION_CSS = css`animation: ${SPIN_LOGO} infinite 8s linear;`;

export const OptionContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const OptionName = styled.span`
  color: #515151;
  font-size: 1em;
  font-weight: 600;
  margin-left: 2px;
  margin-bottom: 1px;
  letter-spacing: .01em;
`;

export const OptionImg = styled.img<{ isDisabled?: boolean }>`
  height: 30px;
  border-style: none;
  display: inline-block;
  ${({ isDisabled }) => (!isDisabled && SPIN_ANIMATION_CSS)}
`;

export const ChevronDownSvg = styled.svg<{ menuOpen: boolean }>`
  width: 14px;
  height: 14px;
  fill: currentColor;
  transition: transform 0.25s ease-in-out;
  ${({ menuOpen }) => menuOpen && 'transform: rotate(180deg);'}
`;