import styled from 'styled-components';
import Image from 'next/image';
import { useRef } from 'react';
import Link from 'next/link';

// category data 불러와서 뿌리기
interface Props {
  isOpen: Boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SideBar({ isOpen, setIsOpen }: Props) {
  const outside = useRef<any>();
  const toggleSide = () => {
    setIsOpen(false);
  };

  return (
    <CategoryWrap id='sidebar' ref={outside} className={isOpen ? 'open' : ''}>
      <CategoryTitle>Category</CategoryTitle>
      <ExitButton onClick={toggleSide}>
        <Image src='/close.png' alt=' 닫기' width={20} height={20} />
      </ExitButton>
      <Ul>
        <CategoryName>
          <NameLink href='/'>Recent</NameLink>
        </CategoryName>
        <CategoryName>
          <NameLink href='/'>to-do list</NameLink>
        </CategoryName>
        <CategoryName>
          <NameLink href='/'>fashion</NameLink>
        </CategoryName>
        <CategoryName>
          <NameLink href='/'>drawing</NameLink>
        </CategoryName>
        <CategoryName>
          <NameLink href='/'>assignment</NameLink>
        </CategoryName>
      </Ul>
      <AddButton>Add Category</AddButton>
    </CategoryWrap>
  );
}

const CategoryWrap = styled.div`
  background-color: #ffffff;
  z-index: 5;
  position: fixed;
  height: 100%;
  width: 20%;
  left: -20%;
  transition: 0.5s ease;
  &.open {
    left: 0;
    transition: 0.5s ease;
  }
  display: flex;
  flex-flow: column nowrap;
  padding: 35px;
`;

const ExitButton = styled.button`
  /* background-color: lightslategray; */
  position: absolute;

  right: 15px;
`;

const CategoryTitle = styled.h2`
  /* background-color: antiquewhite; */
  text-align: left;
  color: #151757;
  font-size: 32px;
  margin-bottom: 45px;
  padding-left: 10px;
`;

const Ul = styled.ul`
  display: block;
  list-style-type: none;
  :hover {
    background-color: #ffe674;
  }
`;

const CategoryName = styled.li`
  display: block;
  text-align: left;
  color: black;
  font-size: 24px;
  padding: 12px;
  cursor: pointer;
`;

const NameLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const AddButton = styled.button`
  background-color: #151757;
  color: #ffe674;
  position: absolute;
  bottom: 45px;
  width: 82%;
  height: 105.79px;
  font-size: 32px;
`;
