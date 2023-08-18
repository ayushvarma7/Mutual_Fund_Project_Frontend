

document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.querySelector(".sign-in-form");
    const signInButton = document.querySelector("#sign-in-btn");
  
    signInForm.addEventListener("submit", (event) => {
      event.preventDefault();
      signIn();
    });
  
    signInButton.addEventListener("click", signIn);
  
    function signIn() {
      const emailInput = document.querySelector('input[type="text"]');
      const passwordInput = document.querySelector('input[type="password"]');
  
      // Perform validation and authentication here
      const username = emailInput.value;
      const password = passwordInput.value;
  
      if (username === 'admin' && password === 'password') {
        animateTransition();
        setTimeout(() => {
          window.location.href = "portfolio_dashboard.html";
        }, 1500); // Delay for animation
      } else {
        alert("Invalid credentials");
      }
    }
  
    function animateTransition() {
      const container = document.querySelector(".container");
      container.classList.add("sign-up-mode");
      setTimeout(() => {
        container.classList.remove("sign-up-mode");
      }, 1500); // Duration of the animation
    }
  });
  
