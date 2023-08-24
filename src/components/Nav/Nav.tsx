import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

export function Nav() {
  return (
    <Header>
      <Button>
        <Image src='/more.png' alt='더보기' width={50} height={50} />
      </Button>
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
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
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
