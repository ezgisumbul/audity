import api from "./api";

export const soundCreate = (sound) =>
  api.post("/sound/create", sound).then((response) => response.data);

export const soundEdit = (id, sound) =>
  api.patch(`/sound/${id}/edit`, sound).then((response) => response.data);

export const soundLoad = (id) =>
  api.get(`/sound/${id}`).then((response) => response.data);

export const soundList = () =>
  api.get("/sound/list").then((response) => response.data);

export const houseSearch = (filters) =>
  api
    .get(`/house/search?${new URLSearchParams(filters).toString()}`)
    .then((response) => response.data);

export const soundSearch = (query) =>
  api
    .get(`/sound/search?${new URLSearchParams(query).toString()}`)
    .then((response) => response.data);
