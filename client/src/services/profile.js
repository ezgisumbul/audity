import api from './api';

export const profileLoad = (id) => {
  return api.get(`/profile/${id}`).then((response) => response.data);
};

export const profileEdit = (profile) => {
  return api.patch(`/profile`, profile).then((response) => response.data);
};

export const profileSearch = (term) => {
  return api
    .get(`/profile/search?term=${term}`)
    .then((response) => response.data);
};
