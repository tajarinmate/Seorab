import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useAddContentMutaion } from '@/hooks';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atoms';
import { useContentQuery } from '@/hooks';
import { Editor, PostDeleteModal } from '@/components/index';
import useRecoilModal from '@/hooks/useRecoilModal';
import Image from 'next/image';

type DetailProp = {
  i: string;
};

export function DetailContentModal({ i }: DetailProp) {
  const modal = useRecoilModal();
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

  const handleOpen = () => {
    modal.openModal({
      component: () => <PostDeleteModal />,
    });
  };

  return (
    <ContentModal>
      <Menu>
        <Button>
          <Image
            priority={true}
            src='/expand.png'
            alt='자세히보기'
            width={20}
            height={20}
          />
        </Button>
        <Button onClick={() => handleOpen()}>
          <Image
            priority={true}
            src='/dots.png'
            alt='더보기'
            width={25}
            height={25}
          />
        </Button>
      </Menu>
      <Form>
        <TitleLabel className='a11y-hidden'>제목</TitleLabel>
        <TitleInput
          type='text'
          placeholder='제목'
          onChange={handleTitleChange}
          value={title}
        ></TitleInput>
        <Editor init={text} />
      </Form>
    </ContentModal>
  );
}

const ContentModal = styled.div`
  border-radius: 12px;
`;

const Menu = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const Button = styled.button`
  border-radius: 1px;
  width: 50px;
  height: 50px;
  text-align: center;
  opacity: 50%;
`;

const Form = styled.form`
  height: 90%;
  display: flex;
  flex-flow: column nowrap;
`;

const TitleLabel = styled.label``;

const TitleInput = styled.input`
  cursor: auto;
  height: 10%;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
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
