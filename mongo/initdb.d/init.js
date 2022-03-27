const users = [
  {
    user: "user",
    pwd: "user",
    roles: [
      {
        role: "readWrite",
        db: "user",
      },
    ],
  },
  {
    user: "chat",
    pwd: "chat",
    roles: [
      {
        role: "readWrite",
        db: "chat",
      },
    ],
  },
];

users.forEach((v) => {
  db = db.getSiblingDB(v.roles[0].db);
  db.createUser(v);
});