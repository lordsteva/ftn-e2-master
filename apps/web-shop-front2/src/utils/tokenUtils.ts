export function getUserFromToken(token: string | null): { id: string; email: string, cart_id: string } {
  const user = { id: '', email: '', cart_id: '' };
  if (!token) {
    return user;
  }
  try {
    const { id, email, cart_id } = JSON.parse(atob(token.split('.')[1]));
    return { id, email, cart_id };
  } catch (error) {
    return user;
  }
}
