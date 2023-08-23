'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ChangeEvent, FormEvent, useCallback } from 'react';
import Link from 'next/link';
import Grid from '@/components/Grid';

axios.defaults.baseURL = 'http://localhost:3001';

interface Content {
  title: string;
  text: string;
  category_id: number;
}
type LayoutProps = {
  i: string;
  title: string;
  text: string;
  category_id: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function Home() {
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
  } = useQuery<LayoutProps[], boolean>('contents', getContents);

  useEffect(() => {
    getContents()
  }, [])

  return (
    <>
      <Header>
        <Button>더보기</Button>
        <Title href='/'>서랍</Title>
        <Button>마이페이지</Button>
      </Header>
      <Main>
        메인입니당
        <SortButton>정렬</SortButton>
        <Content>
          {contents && <Grid layout={contents}/>}
        </Content>
      </Main>
    </>
  );
}

const Header = styled.header`
  width: auto;
  background-color: #ffd100;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const Title = styled(Link)`
  font-size: 32px;
  color: black;
  text-decoration: none;
`;

const Button = styled.button`
  border-radius: 1px;
  width: 50px;
  height: 50px;
  background-color: aquamarine;
`;

const Main = styled.main`
  background-color: antiquewhite;
  height: 600px;
`;

const SortButton = styled.button`
  background-color: lightsalmon;
`;

const Content = styled.div`
  background-color: lightcyan;
  margin-top: 60px;
  height: 100%;
`;
