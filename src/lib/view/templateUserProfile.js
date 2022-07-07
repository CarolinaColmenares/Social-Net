import { logout } from '../../firebase/auth.js';
import { getCurrentUserPosts } from '../../firebase/post.js';
import { getUserPostData } from '../../firebase/users.js';

export const userProfile = (queryParams) => {

  console.log(queryParams)
  const divUserProfile = document.createElement('div');
  divUserProfile.setAttribute('id', 'containerUserProfile');
  const userData = JSON.parse(localStorage.getItem('userData'))
  const viewUserProfile = `
    <div class="menu__side" id="menu_side">
    <div id="containImg">
        <img src="img/logo2.png" id="logo2">
    </div>
    <div class="options__menu">
        <a href="#/userProfile" class="selected">
            <div class="option">
                <i class="fa-solid fa-circle-user fa-xl" title="Perfil" ></i>
            <h4> nombre usuario titulo</h4>
        </div>
    </a>
    <a href="#/home">
        <div class="option">
            <i class="fa-solid fa-house fa-xl" title="Inicio"></i>
            <h4>Inicio</h4>
        </div>
    </a>
    <a href="#/search">
        <div class="option">
            <i class="fa-solid fa-magnifying-glass fa-xl" title="Buscar"></i>
            <h4>Buscar</h4>
        </div>
    </a>
    <a id="logoutButton">
        <div class="option">
            <i class="fa-solid fa-arrow-right-from-bracket fa-xl" title="Cerrar sesión"></i>
            <h4>Cerrar cesion</h4>
        </div>
    </a>
    </div>
</div>
<div class="postMain">
    <div class="userHeader">
        <div class="item1">
            <i class="fa-solid fa-circle-user fa-6x"></i>
        </div>
        <div class="item2" id="nameHeader">
            <h2>${userData?.username ? userData?.username : 'INVITADO'}</h2>
        </div>
        <div class="item3" id="titleHeader">
            <h3>${userData?.userType ? userData?.userType : 'INVITADO'}</h3>
        </div>
    </div>
    <div class="createPostFlex">
        <p>Mis Publicaciones:</p>
        <a href="#/createPost" class="buttonGreen">Crea un Post</a>
    </div>
    <div class="postBody">
        
    </div>
</div>
`;
  divUserProfile.innerHTML = viewUserProfile;

  const btn = divUserProfile.querySelector('#logoutButton')
  const postBody = divUserProfile.querySelector('.postBody');

    // getName()
    // .then((names) => {
    //     names(users.username)
    //     console.log(users)
    //     .then((username) => {
    //         console.log(username)
    //     })
    // })

 
  getCurrentUserPosts()
    .then((postsResponse) => {
        postsResponse.forEach((post) => {
            getUserPostData(post.idUser)
                .then((idUser) => { 
                    const date = new Date(Number(post.createdAt) * 1000).toLocaleDateString()
                    const postHTML = document.createElement('div');
                    postHTML.innerHTML = `        
                            <div class="userNav">
                                <div class="item1">
                                    <i class="fa-solid fa-circle-user fa-3x"></i>
                                </div>
                            
                                <div class="item2">
                                    <p>${idUser.username}</p>
                                </div>
                            
                                <div class="item3">
                                    <p>${idUser.userType}</p>
                                    <p class="date">${date}</p>

                                </div>
                            </div>
                            
                            <div class="post">
                                <h2>${post.text}</h2> 
                            </div>
                            <div class="like">
                                <div>
                                    <img src="img/cuplike.png" class ="cupcakeImg" alt="cuplike">
                                </div>
                                <div class="pencilIcon">
                                    <a href="#/editPost?id=${post.id}" <i class="fa-solid fa-pencil fa-2xl"></i> </a>
                                </div>
                            </div>`;
                    postBody.appendChild(postHTML);
        });
     });
    });


  btn.addEventListener('click', () => {
    logout()
  })
  return divUserProfile;
};
