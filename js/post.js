const token = window.localStorage.getItem("token");
if (!token) {
    window.location.replace("login.html");
  };

const elPostsList = document.querySelector('.post__list');
const elPostTemplate = document.querySelector("#post__template").content;

const renderUsers = (array, node) => {
    node.innerHTML = null;
    const postFragment = document.createDocumentFragment();
    array.forEach((row) => {
      const postTemplate = elPostTemplate.cloneNode(true);
      postTemplate.querySelector(".post__title").textContent = row.title;
      postTemplate.querySelector(".post__body").textContent = row.body;

      let commentLink =  postTemplate.querySelector(".post__button");

      commentLink.dataset.uuid = row.userId


    commentLink.addEventListener('click', (e) => {
      window.location.replace('comment.html')
      localStorage.setItem("userId", e.target.dataset.uuid)
    })
  
      postFragment.appendChild(postTemplate);
    });
    node.appendChild(postFragment);
  };


  fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {

    let dataLocal = window.localStorage.getItem('id');
    let filteredUser = data.filter(element => element.userId == dataLocal)


    if (filteredUser?.length > 0) {
      renderUsers(filteredUser, elPostsList);
    } 
  });

