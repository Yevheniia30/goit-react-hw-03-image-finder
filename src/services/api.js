import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

// axios.defaults.baseURL = 'https://pixabay.com/api';
const key = '16825213-7fb8f93f8fb61dc742d5122ac';

export const getImagesReq = async ({
  searchQuery = '',
  page = 1,
  per_page = 12,
}) => {
  const { data } = await instance.get(
    `/?q=${searchQuery}&page=${page}&key=${key}&per_page=${per_page}`
  );
  return data;
};
