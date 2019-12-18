import React, { ReactNode } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Message = styled.div`
  margin-left: 1rem;
  span {
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const renderToastifyMsg = (message: string): ReactNode => (
  <Message>
    <span>{message}</span>
  </Message>
);

export const showInfoToast = (message: string): void => {
  toast.info(renderToastifyMsg(message));
};

export const showSuccessToast = (message: string): void => {
  toast.success(renderToastifyMsg(message));
};