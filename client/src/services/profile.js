import api from './api';

export const profileLoad = (id) => {
  return api.get(`/profile/${id}`).then((response) => response);
};
