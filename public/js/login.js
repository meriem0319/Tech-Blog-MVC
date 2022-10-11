const loginForm = async function (e) {
  e.preventDefault();

  const usernameElement = document.querySelector("#username-input-login");
  const passwordElement = document.querySelector("#password-input-login");

  fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      username: usernameElement.value,
      password: passwordElement.value,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then(function () {
      document.location.replace("/dashboard");
    })
    .catch((err) => console.log(err));
};

document.querySelector("#login-form").addEventListener("submit", loginForm);
