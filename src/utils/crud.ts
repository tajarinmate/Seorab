import axios from 'axios';

type ContentProps = {
  i: string;
  title: string;
  text: string;
  category_id: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

export async function getAllContents() {
  try {
    const response = await axios.get('/contents');
    return response.data;
  } catch (error) {
    alert('조회 에러');
  }
}

export async function addContent(id: number, body: ContentProps) {
  try {
    const { data } = await axios.post(` /contents/${id}`, body);
    return data;
  } catch (error) {
    alert('저장 에러');
  }
}
