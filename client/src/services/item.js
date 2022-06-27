import api from './api';

export const itemCreate = (item) => {
  return api.post('/item', item).then((response) => response.data);
};

export const loadItems = (id) => {
  return api.get(`/item/${id}`).then((response) => response.data);
};

export const addBookmark = (id, selectedLibraryName) => {
  return api
    .post(`/${id}/bookmark`, { selectedLibraryName })
    .then((response) => console.log(response.data));
};

export const loadLibraries = () => {
  return api.get('/libraries').then((response) => response.data);
};

export const libraryCreate = (library) => {
  return api.post('/libraries', library).then((response) => response.data);
};
