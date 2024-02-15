export const setUser = () => {
  window.localStorage.setItem('loggedInUser', true);
};

export const getStatus = () => {
  return window.localStorage.getItem('loggedInUser');
};

export const removeUser = () => {
  window.localStorage.removeItem('loggedInUser');
};
