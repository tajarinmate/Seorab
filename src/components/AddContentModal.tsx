import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useAddContentMutaion } from '@/hooks';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atoms';

export function AddContentModal() {
  const [value, setValue] = useState<string>('');
  const userId = useRecoilValue(userState);
  const { mutate: addMutate } = useAddContentMutaion();

  const handleAddContent = useCallback(() => {
    const randomI = Math.random().toString().substr(2, 8);
    const content = {
      i: randomI,
      title: `id${randomI}번`,
      text: `${value}`,
      category_id: 2,
      id: randomI,
      x: 5,
      y: 0,
      w: 1,
      h: 1,
      userId: userId,
    };
    addMutate(content);
  }, [addMutate, userId, value]);

  const handleSaveContent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleAddContent();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <ContentModal>
      <Form>
        <ContentLabel className='a11y-hidden'>내용</ContentLabel>
        <ContentInput
          type='text'
          placeholder='내용'
          onChange={handleChange}
        ></ContentInput>
        <SaveButton type='submit' onClick={handleSaveContent}>
          save
        </SaveButton>
      </Form>
    </ContentModal>
  );
}

const ContentModal = styled.div`
  border-radius: 12px;
`;

const Form = styled.form`
  height: 90%;
`;

const ContentLabel = styled.label``;

const ContentInput = styled.input`
  cursor: auto;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  padding-left: 24px;

  &focus {
    border-color: rgba(0, 0, 0, 0.5);
  }
  ::placeholder {
    background-color: lightpink;
    position: absolute;
    top: 20px;
    left: 10px;
  }
`;

const SaveButton = styled.button`
  width: 136px;
  height: 53px;
  border-radius: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: 300;
  margin-top: 26px;
  background-color: #797c94;
  color: #ffffff;
  position: fixed;
  right: 50px;
`;
