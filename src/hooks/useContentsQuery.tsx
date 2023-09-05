import axios from 'axios';
import { useQuery } from 'react-query';
import { ContentProps } from '@/types';

axios.defaults.baseURL = 'http://localhost:3001';
// http://localhost:3001/users/1/contents
// users의 id=1, contents에서 userId가 1인 contents들 불러옴
const getAllContents = async (id: number) => {
  try {
    const response = await axios.get(`/users/${id}/contents`);
    return response.data;
  } catch (error) {
    alert('조회 에러');
  }
};

export function useContentsQuery(id: number) {
  return useQuery<ContentProps[], boolean>(['contents'], () =>
    getAllContents(id)
  );
}
