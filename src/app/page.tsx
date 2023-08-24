'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ChangeEvent, FormEvent, useCallback } from 'react';
import Link from 'next/link';
import { Grid } from '@/components/Grid/Grid';
import { Nav } from '@/components/Nav/Nav';
import Image from 'next/image';

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
};

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
    getContents();
  }, []);

  return (
    <>
      <Nav />
      <Main>
        메인입니당
        <SortButton>정렬</SortButton>
        <Content>{contents && <Grid layout={contents} />}</Content>
      </Main>
    </>
  );
}

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
