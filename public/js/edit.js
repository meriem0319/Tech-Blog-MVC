const editForm = async function (event) {
  event.preventDefault();

  const titleElement = document.getElementById("post-title");
  const bodyElement = document.getElementById("post-body");
  const postId = document.getElementById("post-id");

  fetch("/api/post" + postId.value, {
    method: "PUT",
    body: JSON.stringify({
      title: titleElement.value,
      body: bodyElement.value,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then(function () {
      document.location.replace("/dashboard");
    })
    .catch((err) => console.log(err));
};

document.querySelector("#edit-post-form").addEventListener("submit", editForm);
