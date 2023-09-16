import axios from 'axios';
import { useQuery } from 'react-query';
import { ContentProps } from '@/types';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atoms';

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

const getContent = async (id: number, i: string) => {
  try {
    const response = await axios.get(`/users/${id}/contents?i=${i}`);
    return response.data;
  } catch (error) {
    alert('조회 에러');
  }
};

export function useContentQuery(id: number, i: string) {
  return useQuery<ContentProps[], boolean>(['content'], () =>
    getContent(id, i)
  );
}

// PUT
// const updateText = async (modifyBody: ModifyContent) => {
//   try {
//     const originalData = await axios.patch(`/contents/${modifyBody.id}`);
//     const updateObject = {
//       ...originalData.data,
//       id: modifyBody.id,
//       text: modifyBody.text,
//     };
//     const { data } = await axios.patch(
//       `/contents/${modifyBody.id}`,
//       updateObject
//     );
//     return data;
//   } catch {
//     alert('수정 오류');
//   }
// };

// const { mutate: updateMutate } = useMutation(updateText, {
//   onSuccess: () => {
//     queryClient.invalidateQueries('contents');
//   },
// });

// const handleUpdateText = useCallback(
//   (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     updateMutate(modifyInfo);
//     setModifyInfo({
//       id: '',
//       text: '',
//     });
//   },
//   [updateMutate, modifyInfo]
// );
