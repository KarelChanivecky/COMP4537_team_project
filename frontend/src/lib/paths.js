const Paths = {
  LOGIN: () => "/",
  REGISTER: () => "/register",
  ADMIN: () => "/admin",
  LISTS: () => "/lists",
  ITEMS: (listId) => `/lists/${listId}/items`
};