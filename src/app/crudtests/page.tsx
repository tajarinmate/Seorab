'use client';

import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ChangeEvent, FormEvent, useCallback } from 'react';

axios.defaults.baseURL = 'http://localhost:3001';

interface Content {
  title: string;
  text: string;
  category_id: number;
}

const InitContent = {
  title: '',
  text: '',
  category_id: 3,
};

interface ModifyContent {
  id: string;
  text: string;
}

export default function Home() {
  const queryClient = useQueryClient();
  const [content, setContent] = useState<Content>(InitContent);
  const [removeId, setRemoveId] = useState<string>('');
  const [modifyInfo, setModifyInfo] = useState<ModifyContent>({
    id: '',
    text: '',
  });

  // GET
  const getContents = async () => {
    try {
      const response = await axios.get('/contents');
      return response.data;
    } catch (error) {
      alert('조회 에러');
    }
  };
  const {
    data: contents,
    isLoading,
    error,
    refetch,
  } = useQuery('contents', getContents);

  // POST
  const addContent = async (body: Content) => {
    try {
      const { data } = await axios.post(`/contents`, body);
      return data;
    } catch (error) {
      alert('저장 에러');
    }
  };

  const { mutate: addMutate } = useMutation(addContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
    },
  });

  const handleAddContent = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      addMutate(content);
      setContent(InitContent);
    },
    [addMutate, content]
  );

  // DELETE
  const deleteContent = async () => {
    try {
      await axios.delete(`/contents/${removeId}`);
    } catch (error) {
      alert('해당 id를 가진 content가 없습니다');
    }
  };
  const { mutate: deleteMutate } = useMutation(deleteContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
    },
  });

  const handelDeleteContent = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      deleteMutate();
      setRemoveId('');
    },
    [deleteMutate]
  );

  // PUT
  const updateText = async (modifyBody: ModifyContent) => {
    try {
      const originalData = await axios.patch(`/contents/${modifyBody.id}`);
      const updateObject = {
        ...originalData.data,
        id: modifyBody.id,
        text: modifyBody.text,
      };
      const { data } = await axios.patch(
        `/contents/${modifyBody.id}`,
        updateObject
      );
      return data;
    } catch {
      alert('수정 오류');
    }
  };

  const { mutate: updateMutate } = useMutation(updateText, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
    },
  });

  const handleUpdateText = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateMutate(modifyInfo);
      setModifyInfo({
        id: '',
        text: '',
      });
    },
    [updateMutate, modifyInfo]
  );

  return (
    <>
      {isLoading ? <p>Loading...</p> : null}
      <ul>
        {contents &&
          contents.map((content: Content, index: number) => {
            return <List key={index}>{content.text}</List>;
          })}
      </ul>
      <form onSubmit={handleAddContent}>
        <label>제목: </label>
        <input
          type='text'
          name='title'
          value={content.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContent({ ...content, [e.target.name]: e.target.value })
          }
        />
        <label>내용: </label>
        <input
          type='text'
          name='text'
          value={content.text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContent({ ...content, [e.target.name]: e.target.value })
          }
        />
        <Button type='submit'>작성</Button>
      </form>
      <form onSubmit={handelDeleteContent}>
        <label>삭제할 ID: </label>
        <input
          type='text'
          name='removeId'
          value={removeId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRemoveId(e.target.value)
          }
        />
        <Button type='submit'>삭제</Button>
      </form>
      <form onSubmit={handleUpdateText}>
        <label>수정할 ID: </label>
        <input
          type='text'
          name='id'
          value={modifyInfo.id}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setModifyInfo({ ...modifyInfo, [e.target.name]: e.target.value })
          }
        />
        <label>수정할 내용: </label>
        <input
          type='text'
          name='text'
          value={modifyInfo.text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setModifyInfo({ ...modifyInfo, [e.target.name]: e.target.value })
          }
        />
        <Button type='submit'>수정</Button>
      </form>

      {/* <AddButton onClick={handleUpdate}>컨텐츠 수정</AddButton> */}
    </>
  );
}

const Button = styled.button`
  background-color: beige;
  margin-left: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 2px solid black;
  cursor: pointer;
`;

const List = styled.li``;