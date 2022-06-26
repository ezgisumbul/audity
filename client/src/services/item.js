import api from './api';

export const itemCreate = (item) => {
  return api.post('/item', item).then((response) => response.data);
};

export const loadItems = (id) => {
  return api.get(`/item/${id}`).then((response) => response.data);
};

export const setBookmark = (id) => {
  return api.post(`/${id}/bookmark`).then((response) => response.data);
};
