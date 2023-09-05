'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { MouseEvent, useCallback } from 'react';
import { Grid, Nav, AddContentModal } from '@/components/index';
import { Layouts } from 'react-grid-layout';
import useRecoilModal from '@/hooks/useRecoilModal';
import { useContentsQuery, useAddContentMutaion } from '@/hooks';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atoms';

interface Content {
  title: string;
  text: string;
  category_id: number;
}

export default function Home() {
  const userId = useRecoilValue(userState);
  const {
    data: contents,
    isLoading,
    error,
    refetch,
  } = useContentsQuery(userId);

  // PUT
  // const updateLayout = async (modifyBody: Layouts) => {
  //   try {
  //     const originalData = await axios.get(`/contents`);
  //     const updateArray: ContentProps[] = [];
  //     originalData.data.map((content: ContentProps, index: number) => {
  //       const updateObj = {
  //         ...content,
  //         x: modifyBody.lg[index].x,
  //         y: modifyBody.lg[index].y,
  //         w: modifyBody.lg[index].w,
  //         h: modifyBody.lg[index].h,
  //       };
  //       updateArray.push(updateObj);
  //     });
  //     const { data } = await axios.patch(`/contents`, updateArray);
  //     return data;
  //   } catch {
  //     alert('수정 오류');
  //   }
  // };

  // const { mutate: updateMutate } = useMutation(updateLayout, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('contents');
  //   },
  // });

  // const handleUpdateLayout = useCallback(
  //   (layouts: Layouts) => {
  //     updateMutate(layouts);
  //   },
  //   [updateMutate]
  // );

  const modal = useRecoilModal();
  const open = () => {
    modal.openModal({
      component: () => <AddContentModal />,
    });
  };

  // 브라우저 창 닫힘 이벤트
  // beforeunload
  return (
    <Container>
      <Nav />
      <Main>
        <SortButton>정렬</SortButton>
        <SortButton onClick={open}>컨텐츠 추가</SortButton>
        <Content>{contents && <Grid content={contents} />}</Content>
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
