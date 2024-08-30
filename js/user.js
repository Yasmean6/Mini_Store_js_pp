let links = document.getElementById("links");
let user_info = document.getElementById("user_info");
let userDom = document.getElementById("user");
let logout = document.getElementById("logout");

if (localStorage.getItem("username")) {
  links.remove();
  user_info.style.display = "flex";
  userDom.innerHTML = `<i class="fa-solid fa-user mr-1"></i>${localStorage.getItem("username")}`;
}

// ------------ logout--------------

logout.addEventListener("click", (e) => {
  e.preventDefault();
  setTimeout(() => {
    localStorage.clear();
    window.location = "../register.html";
  }, 1000);
});
