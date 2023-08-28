import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { SideBar } from '@/components/SideBar/SideBar';

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSide = () => {
    setIsOpen(true);
  };

  return (
    <Header>
      <Button onClick={toggleSide}>
        <Image src='/more.png' alt='더보기' width={50} height={50} />
      </Button>
      {/* <SideBar isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      <Title href='/'>서랍</Title>
      <Button>
        <Image src='/mypage.png' alt='마이페이지' width={40} height={40} />
      </Button>
    </Header>
  );
}

const Header = styled.header`
  width: auto;
  background-color: #ffd100;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  text-align: center;
`;

const Title = styled(Link)`
  font-size: 32px;
  color: black;
  text-decoration: none;
  margin: auto 0;
`;

const Button = styled.button`
  border-radius: 1px;
  width: 50px;
  height: 50px;
  :hover {
    background-color: #ffb800;
  }
`;
