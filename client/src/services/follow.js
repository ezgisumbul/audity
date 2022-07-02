import api from "./api";

export const followUser = (id) =>
  api.post(`/profile/${id}/follow`).then((response) => response.data);

export const followedLoad = (id) =>
  api.get(`/profile/${id}/followed`).then((response) => response.data);

export const followerLoad = (id) =>
  api.get(`/profile/${id}/follower`).then((response) => response.data);

export const unFollowUser = (id) =>
  api.delete(`/profile/${id}/unfollow`).then((response) => response.data);

// export const soundEdit = (id, sound) =>
//   api.patch(`/sound/${id}/edit`, sound).then((response) => response.data);

// export const soundList = () =>
//   api.get('/sound/list').then((response) => response.data);

// export const soundSearch = (query) =>
//   api
//     .get(`/sound/search?${new URLSearchParams(query).toString()}`)
//     .then((response) => response.data);

// export const addBookmark = (id, selectedLibraryName) => {
//   return api
//     .post(`/sound/${id}/bookmark`, { selectedLibraryName })
//     .then((response) => response.data);
// };
