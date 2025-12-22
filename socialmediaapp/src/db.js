import Dexie from "dexie";

export const db = new Dexie("LocalSocialApp");

// bump the version number if you change schema after data exists
db.version(1).stores({
  users: "++id, name, email, password, image",
  friendRequests: "++id, senderId, receiverId, status", // pending | accepted | rejected
  posts: "++id, userId, content, image, createdAt"
});
