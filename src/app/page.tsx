'use client';

import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ChangeEvent, FormEvent, useCallback } from 'react';
import Link from 'next/link';
import Grid from '@/components/Grid';

export default function Home() {
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
          <Grid />
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
  // 공통 스타일
  color: black;
  text-decoration: none;
`;

const Button = styled.button`
  // 공통 스타일
  all: unset;
  cursor: pointer;

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
  // 공통 스타일
  all: unset;
  cursor: pointer;
  background-color: lightsalmon;
`;

const Content = styled.div`
  background-color: lightcyan;
  margin-top: 60px;
  height: 100%;
`;
