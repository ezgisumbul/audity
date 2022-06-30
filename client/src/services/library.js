import api from './api';

export const listLibraries = () => {
  return api.get('/library/list').then((response) => response.data);
};

export const libraryCreate = (library) => {
  return api.post('/library/list', library).then((response) => response.data);
};

export const loadLibrary = (id) => {
  return api.get(`/library/${id}`).then((response) => response.data);
};

export const removeFromLibrary = (id, soundToRemove) => {
  return api
    .post(`/library/${id}`, { soundToRemove })
    .then((response) => response.data);
};