export const buildApiUrl = (resource, id = "") => {
  let url = `https://www.swapi.tech/api/${resource}/`;
  if (id) {
    url += `${id}/`;
  }
  return url;
};