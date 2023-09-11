import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ContentProps } from '@/types';

const addContent = async (body: ContentProps) => {
  try {
    const { data } = await axios.post(`/contents`, body);
    return data;
  } catch (error) {
    alert('저장 에러');
  }
};

export function useAddContentMutaion() {
  const queryClient = useQueryClient();

  return useMutation(addContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
    },
  });
}
