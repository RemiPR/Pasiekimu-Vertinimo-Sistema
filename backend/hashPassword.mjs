import bcrypt from "bcryptjs";

const password = "slaptazodis";
const saltRounds = 10;

bcrypt
  .hash(password, saltRounds)
  .then((hash) => {
    console.log("Hashed password:", hash);
  })
  .catch((err) => {
    console.error("Hashing error:", err);
  });
