export function getUserFromToken(token: string | null): { id: string; email: string } {
  const user = { id: '', email: '' };
  if (!token) {
    return user;
  }
  try {
    const { id, email } = JSON.parse(atob(token.split('.')[1]));
    return { id, email };
  } catch (error) {
    return user;
  }
}
