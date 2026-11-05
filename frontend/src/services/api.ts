const API_URL = import.meta.env.VITE_API_URL;

// Register
export async function registerUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof data?.detail === "string"
        ? data.detail
        : data?.detail
          ? JSON.stringify(data.detail)
          : "Registration failed. Please try again.";

    throw new Error(message);
  }

  return data;
}

// Login
export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: email,
      password: password,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      typeof data?.detail === "string"
        ? data.detail
        : "Login failed. Please check your details."
    );
  }

  return data;
}

// Get Posts
export async function getPosts() {
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    throw new Error("You need to log in first.");
  }

  const response = await fetch(`${API_URL}/posts/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      typeof data?.detail === "string"
        ? data.detail
        : "Failed to fetch posts."
    );
  }

  return data;
}

// Create Post
export async function createPost(title: string, content: string) {
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    throw new Error("You need to log in first.");
  }

  const response = await fetch(`${API_URL}/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      content,
      published: true,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      typeof data?.detail === "string"
        ? data.detail
        : "Failed to create post."
    );
  }

  return data;
}