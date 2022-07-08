import api from './api';

export const listLibraries = (userId) => {
  return api.get(`/library/${userId}/list`).then((response) => response.data);
};

export const listMyLibraries = (userId) => {
  return api
    .get(`/library/${userId}/my-libraries`)
    .then((response) => response.data);
};

export const libraryCreate = (library) => {
  return api.post(`/library/create`, library).then((response) => response.data);
};

export const libraryEdit = (id, library) => {
  return api.patch(`/library/${id}`, library).then((response) => response.data);
};

export const libraryDelete = (id) => {
  return api.delete(`/library/${id}`).then((response) => response.data);
};

export const loadLibrary = (id) => {
  return api.get(`/library/${id}`).then((response) => response.data);
};

export const removeFromLibrary = (id, soundToRemove) => {
  return api
    .patch(`/library/${id}/my-libraries`, { id, soundToRemove })
    .then((response) => response.data);
};
