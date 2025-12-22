export function startSession(user) {
  const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes
  localStorage.setItem("sessionUser", JSON.stringify(user));
  localStorage.setItem("sessionExpiry", expiry);
  document.cookie = `user=${user.email}; max-age=300; path=/`;
}

export function getSession() {
  const expiry = localStorage.getItem("sessionExpiry");
  if (!expiry || Date.now() > expiry) {
    clearSession();
    return null;
  }
  return JSON.parse(localStorage.getItem("sessionUser"));
}

export function clearSession() {
  localStorage.removeItem("sessionUser");
  localStorage.removeItem("sessionExpiry");
  document.cookie = "user=; Max-Age=0; path=/;";
}
