import bcrypt from "bcryptjs";

const password = "abc"; // The password you want to hash
const saltRounds = 10; // Adjust the cost factor as needed

bcrypt
  .hash(password, saltRounds)
  .then((hash) => {
    console.log("Hashed password:", hash);
  })
  .catch((err) => {
    console.error("Hashing error:", err);
  });
