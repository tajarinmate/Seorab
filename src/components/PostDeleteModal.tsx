import styled from 'styled-components';

export function PostDeleteModal() {
  return <Container>
    <button>삭제</button>
    <button>수정</button>
  </Container>;
}

const Container = styled.div`
  background-color: lightseagreen;
  width: 128px;
  height: 86px;
`;
