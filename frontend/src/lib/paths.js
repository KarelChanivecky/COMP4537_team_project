// const BASE_PATH = "/COMP4537_team_project";
const BASE_PATH = "";

export const Paths = {
  LOGIN: () => `${BASE_PATH}/`,
  REGISTER: () => `${BASE_PATH}/register`,
  ADMIN: () => `${BASE_PATH}/admin`,
  LISTS: () => `${BASE_PATH}/lists`,
  ITEMS: (listId) => `${BASE_PATH}/lists/${listId}/items`
};