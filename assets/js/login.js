/* ==========================================================================
   Taza Khamar — Login / Signup page
   ========================================================================== */

function switchAuthTab(tab) {
  document.querySelectorAll(".auth-tabs button").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  document.getElementById("loginForm").style.display = tab === "login" ? "block" : "none";
  document.getElementById("signupForm").style.display = tab === "signup" ? "block" : "none";
  const switchText = document.querySelector(".js-auth-switch-text");
  const switchLink = document.getElementById("authSwitchLink");
  if (tab === "login") {
    switchText.setAttribute("data-i18n", "auth.noaccount");
    switchLink.setAttribute("data-i18n", "auth.signup");
    switchLink.dataset.goto = "signup";
  } else {
    switchText.setAttribute("data-i18n", "auth.hasaccount");
    switchLink.setAttribute("data-i18n", "auth.login");
    switchLink.dataset.goto = "login";
  }
  applyI18n();
}

function initLogin() {
  document.getElementById("whatsappLoginBtn").prepend(
    Object.assign(document.createElement("span"), { innerHTML: icon("whatsapp"), style: "margin-right:.4rem;display:inline-flex" })
  );

  document.querySelectorAll(".auth-tabs button").forEach((b) => b.addEventListener("click", () => switchAuthTab(b.dataset.tab)));
  document.getElementById("authSwitchLink").addEventListener("click", (e) => {
    e.preventDefault();
    switchAuthTab(e.target.dataset.goto || "signup");
  });

  ["loginForm", "signupForm"].forEach((id) => {
    document.getElementById(id).addEventListener("submit", (e) => {
      e.preventDefault();
      localStorage.setItem("tk_user", JSON.stringify({ name: "Nusrat Jahan", loggedInAt: Date.now() }));
      window.location.href = "account.html";
    });
  });
}

document.addEventListener("DOMContentLoaded", initLogin);
