import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ModalProps } from '@/types';

const Modal = ({ component, close }: ModalProps) => {
  const [zIndex, setZIndex] = useState(0);

  useEffect(() => {
    setZIndex(new Date().getTime());
  }, []);

  return (
    <Wrapper>
      <Overlay zIndex={zIndex} onClick={close}></Overlay>
      <Content zIndex={zIndex}>{component && component()}</Content>
    </Wrapper>
  );
};

export default Modal;

const Wrapper = styled.div``;
const Overlay = styled.div<{ zIndex: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: ${(props) => props.zIndex};
  cursor: pointer;
`;
const Content = styled.div<{ zIndex: number }>`
  position: fixed;
  display: grid;
  gap: 16px;
  top: 50%;
  left: 50%;
  padding: 50px;

  width: 50vw;
  height: 85vh;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  transform: translate(-50%, -50%);
  z-index: ${(props) => props.zIndex};
`;
