'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { MouseEvent, useCallback } from 'react';
import { Grid, Nav } from '@/components/index';
import { getAllContents } from '@/utils/index';
import { Layouts } from 'react-grid-layout';

axios.defaults.baseURL = 'http://localhost:3001';

interface Content {
  title: string;
  text: string;
  category_id: number;
}

type ContentProps = {
  i: string;
  title: string;
  text: string;
  category_id: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

interface ModifyContent {
  id: string;
  text: string;
}

export default function Home() {
  const queryClient = useQueryClient();
  const {
    data: contents,
    isLoading,
    error,
    refetch,
  } = useQuery<ContentProps[], boolean>('contents', getAllContents);

  // POST
  const addContent = async (body: ContentProps) => {
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
    (e: MouseEvent) => {
      e.preventDefault();
      const randomI = Math.random().toString().substr(2, 8);
      const content = {
        i: randomI,
        title: `id${randomI}번`,
        text: `id${randomI}번 입니다`,
        category_id: 2,
        id: randomI,
        x: 5,
        y: 0,
        w: 1,
        h: 1,
      };
      addMutate(content);
    },
    [addMutate]
  );

  // PUT
  const updateLayout = async (modifyBody: Layouts) => {
    try {
      const originalData = await axios.get(`/contents`);
      const updateArray: ContentProps[] = [];
      originalData.data.map((content: ContentProps, index: number) => {
        const updateObj = {
          ...content,
          x: modifyBody.lg[index].x,
          y: modifyBody.lg[index].y,
          w: modifyBody.lg[index].w,
          h: modifyBody.lg[index].h,
        };
        updateArray.push(updateObj);
      });
      const { data } = await axios.patch(`/contents`, updateArray);
      return data;
    } catch {
      alert('수정 오류');
    }
  };

  const { mutate: updateMutate } = useMutation(updateLayout, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
    },
  });

  const handleUpdateLayout = useCallback(
    (layouts: Layouts) => {
      updateMutate(layouts);
    },
    [updateMutate]
  );

  // 브라우저 창 닫힘 이벤트
  // beforeunload

  return (
    <Container>
      <Nav />
      <Main>
        <SortButton>정렬</SortButton>
        <Content>
          {contents && (
            <Grid
              content={contents}
              handleAddContent={handleAddContent}
              handleUpdateLayout={handleUpdateLayout}
            />
          )}
        </Content>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Main = styled.main`
  background-color: antiquewhite;
  display: flex;
  flex-flow: column nowrap;
`;

const SortButton = styled.button`
  background-color: lightsalmon;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
`;

const Content = styled.div`
  background-color: lightcyan;
  min-height: 80vh;
  margin-top: 60px;
`;
