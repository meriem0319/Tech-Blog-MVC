const signupForm = async function (e) {
  e.preventDefault();

  const usernameElement = document.querySelector("#username-input-signup");
  const passwordElement = document.querySelector("#password-input-signup");

  fetch("/api/user", {
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

document.querySelector("#signup-form").addEventListener("submit", signupForm);
