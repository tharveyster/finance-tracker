const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  const errorMessage = document.querySelector("#errorMessage");

  if (!username) {
    errorMessage.textContent = "You must enter a username!";
    return;
  }

  if (!password) {
    errorMessage.textContent = "You must enter a password!";
    return;
  }

  if (password.length > 0 && password.length < 8) {
    errorMessage.textContent = "Your password must be at least 8 characters!";
    return;
  }

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the home page
      document.location.replace("/");
    } else {
      //alert(response.statusText);
      errorMessage.textContent = "Login failed!";
      return;
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
