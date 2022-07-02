import api from "./api";

export const followUser = (id) =>
  api.post(`/profile/${id}/follow`).then((response) => response.data);

export const followedLoad = (id) =>
  api.get(`/profile/${id}/followed`).then((response) => response.data);

export const followerLoad = (id) =>
  api.get(`/profile/${id}/follower`).then((response) => response.data);

export const unFollowUser = (id) =>
  api.delete(`/profile/${id}/unfollow`).then((response) => response.data);
