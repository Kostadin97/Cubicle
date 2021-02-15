const { Router } = require("express");
const authService = require("../services/authService");
const router = Router();
const cookieName = "USER_SESSION";

const isGuest = require("../middlewares/isGuest");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/login", isGuest, (req, res) => {
  res.render("login", { title: "Login Page" });
});

router.get("/register", isGuest, (req, res) => {
  res.render("register", { title: "Register Page" });
});

router.post("/register", isGuest, async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  const passwordMessage = "Passwords must be the same!";

  if (password !== repeatPassword) {
    return res.render("register", { title: "Register Page", error: passwordMessage });
  }

  try {
    let user = await authService.register({ username, password });

    res.redirect("/auth/login");
  } catch (error) {
    res.render("register", { title: "Register Page", error: passwordMessage });
  }
});

router.post("/login", isGuest, async (req, res) => {
  const { username, password } = req.body;

  try {
    let token = await authService.login({ title: "Login Page", username, password });
    res.cookie(cookieName, token);
    res.redirect("/");
  } catch (error) {
    res.render("login", { error });
  }
});

router.get("/logout", isAuthenticated, (req, res) => {
  res.clearCookie(cookieName);
  res.redirect("/");
});
module.exports = router;
