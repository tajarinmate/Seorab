export type ContentProps = {
  i: string;
  title: string;
  text: string;
  category_id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  userId: number;
};

export type ModalProps = {
  key?: string;
  type?: string;
  title?: string;
  message?: string;
  btnText?: string;
  close?: () => void;
  confirm?: () => void;
  component?: () => JSX.Element;
};

export type Modals = Map<string, ModalProps>;
