import { getOnePost, updatePost, deletePost } from "../../firebase/post.js";

export const editPost = (queryParams) => {
    const id = queryParams.id
    const userData = JSON.parse(localStorage.getItem('userData'))

    const divEditPost = document.createElement('div')
    divEditPost.setAttribute('id', 'containerEditPost')
    const viewEditPost = `
    <div class="menu__side" id="menu_side">
    <div id="containImg">
        <img src="img/logo2.png" id="logo2">
    </div>
    <div class="options__menu">	
        <a href="#/userProfile" class="selected">
            <div class="option">
                <i class="fa-solid fa-circle-user fa-xl" title="Perfil" ></i>
            <h4> Mi Perfil</h4>
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
    <a href="">
        <div class="option">
            <i class="fa-solid fa-arrow-right-from-bracket fa-xl" title="Cerrar sesión"></i>
            <h4>Cerrar cesion</h4>
        </div>
    </a>
    </div>
</div>
<div class="postMain">
    <div class="userHeader">
        <div class="userIcon">
            <i class="fa-solid fa-circle-user fa-6x"></i>
        </div>
        <div class="userName" id="nameHeader">
            <p>${userData?.username}</p>
        </div>
        <div class="userTitle" id="titleHeader">
            <h3>${userData?.userType}</h3>
        </div>
    </div>
    <div class="createPostFlex">
        <p>Mis Publicaciones:</p>
    </div>
    <div class="postBody">

    </div>
</div>
`
    divEditPost.innerHTML = viewEditPost;
    const postBody = divEditPost.querySelector('.postBody')


    getOnePost(id).then(post => {
        postBody.innerHTML = `
        <div class="userNav">
                <div class="userIcon">
                    <i class="fa-solid fa-circle-user fa-3x"></i>
                </div>
                <div class="userName">
                    <p>${userData?.username}</p>
                </div>
                <div class="userTitle">
                    <p>${userData?.userType}</p>
                </div>
            </div>

            <div class="post">
                <input class="editPostTextInput" value="${post.text}" />
            </div>

            <div class="optionsPost">
                <div class="divOptionsBt">
                <button id="deletePostButton" class="buttons">Eliminar</button>
                <button class="buttonGreen">Publicar</button>
                <a href="#/userProfile" class="buttons">Cancelar</a>
            </div>
        </div>`


        const updateButton = postBody.querySelector('.buttonGreen')
        const deleteButton = postBody.querySelector('#deletePostButton')

        updateButton.addEventListener('click', () => {
            const editPostTextInputValue = postBody.querySelector('.editPostTextInput').value

            const dataPost = {
                ...post,
                id: id,
                text: editPostTextInputValue
            }

            updatePost(dataPost)
        })

        deleteButton.addEventListener('click', () => deletePost(id))
        
    })
    return divEditPost;
};
