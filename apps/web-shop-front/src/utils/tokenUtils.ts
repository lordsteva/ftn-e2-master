export function getUserFromToken(token: string | null): { id: string; email: string } {
  if (!token) {
    return { id: '', email: '' };
  }
  try {
    const { id, email } = JSON.parse(atob(token.split('.')[1]));
    return { id, email };
  } catch (error) {
    return { id: '', email: '' };
  }
}
