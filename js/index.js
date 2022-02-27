const elUserList = document.querySelector(".user__list");
const elUserTemplate = document.querySelector("#user__template").content;
const token = window.localStorage.getItem("token");
const elLogOutBtn = document.querySelector(".log-out__btn");
const postBtn = document.querySelector('.post-btn');

if (!token) {
  window.location.replace("login.html");
};

elLogOutBtn.addEventListener("click", () => {
  window.localStorage.removeItem("token");
  window.location.replace("index.html");
});

const renderUsers = (array, node) => {
  node.innerHTML = null;
  const userFragment = document.createDocumentFragment();
  array.forEach((row) => {
    const userTemplate = elUserTemplate.cloneNode(true);
    userTemplate.querySelector(".user__name").textContent = row.name;
    userTemplate.querySelector(".user__username").textContent = row.username;
    userTemplate.querySelector(".user__link").textContent = row.email;
    userTemplate.querySelector(".user__link").href = "mailto:" + row.email;
    userTemplate.querySelector(".address__street").textContent = row.address.street;
    userTemplate.querySelector(".address__suite").textContent = row.address.suite;
    userTemplate.querySelector(".address__city").textContent = row.address.city;
    userTemplate.querySelector(".post-btn").dataset.uuid = row.id;
    let test =  userTemplate.querySelector(".post-btn")

    test.addEventListener('click', (e) => {
      
      window.localStorage.setItem('id', e.target.dataset.uuid);

      window.location.replace('post.html')
    })

    userFragment.appendChild(userTemplate);
  });
  node.appendChild(userFragment);
};


fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    if (data?.length > 0) {
      renderUsers(data, elUserList);
      
    } 
  });





