const token = window.localStorage.getItem("token");

if (!token) {
    window.location.replace("login.html");
  };


  const elUserComList = document.querySelector('.comment__list');
  const elUserComTemplate = document.querySelector("#user__comment").content;


  const renderComments = (array, node) => {
    node.innerHTML = null;
    const commentFragment = document.createDocumentFragment();
    array.forEach((row) => {
      const commentTemplate = elUserComTemplate.cloneNode(true);
      commentTemplate.querySelector(".com__user__name").textContent = row.name;
      commentTemplate.querySelector(".com__user__link").href = "mailto:" + row.email;
      commentTemplate.querySelector(".com__user__link").textContent = row.email;

      commentTemplate.querySelector(".com__user__body").textContent = row.body;
  
      commentFragment.appendChild(commentTemplate);
      
    });
    node.appendChild(commentFragment);
  };


  fetch("https://jsonplaceholder.typicode.com/comments")
  .then((response) => response.json())
  .then((data) => {

    let dataLocal = window.localStorage.getItem('userId');
    let filteredCommentUser = data.filter(element => element.postId == dataLocal)

    console.log(filteredCommentUser);

    if (filteredCommentUser?.length > 0) {
      renderComments(filteredCommentUser, elUserComList);
    } 
  });
