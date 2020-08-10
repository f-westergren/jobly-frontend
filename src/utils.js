export  const getUserFromToken = token => {
  if (token) {
    try {
      return JSON.parse(atob(token.split('.')[1])).username
    } catch (error) {
      // ignore
    }
  }
  return null;
}