import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useAddContentMutaion } from '@/hooks';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atoms';
import { useContentQuery } from '@/hooks';

type DetailProp = {
  i: string;
};

export function DetailContentModal({ i }: DetailProp) {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const userId = useRecoilValue(userState);
  const { data: content } = useContentQuery(userId, i);
  const handleSaveContent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (content) {
      setTitle(content[0].title);
      setText(content[0].text);
    }
  }, [content]);

  return (
    <ContentModal>
      <Form>
        <ContentLabel className='a11y-hidden'>제목</ContentLabel>
        <TitleInput
          type='text'
          placeholder='제목'
          onChange={handleTitleChange}
          value={title}
        ></TitleInput>
        <ContentLabel className='a11y-hidden'>내용</ContentLabel>
        <TextInput
          placeholder='내용'
          onChange={handleTextChange}
          value={text}
        ></TextInput>
        {/* <SaveButton type='submit' onClick={handleSaveContent}>
          save
        </SaveButton> */}
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

const TitleInput = styled.input`
  cursor: auto;
  width: 100%;
  height: 10%;
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

const TextInput = styled.textarea`
  resize: none;
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
