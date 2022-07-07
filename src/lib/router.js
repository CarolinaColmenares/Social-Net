import { createUser } from './view/templateCreateUser.js';
import { logInTemplate } from './view/templateLogIn.js';
import { home } from './view/templateHome.js';
import { error404Template } from './view/template404.js';
import { userProfile } from './view/templateUserProfile.js';
import { searchPost } from './view/templateSearch.js';
import { editPost } from './view/templateEditPost.js';
import { newPost } from './view/templateCreatePost.js';
import { auth, onAuthStateChanged, logout } from '../firebase/auth.js';
import { query } from '../firebase/init.js';

export const showTemplates = () => {
  const containerRoot = document.querySelector('#root');
  containerRoot.innerHTML = '';

  // Se SubDivide EL URL COMPLETO EN 2 PARTES
  // url = http://127.0.0.1:5500/src/#/search?query=value
  // [#/search, query=value]

  // Desestructuramos el array en dos valores (hash y queryParamsString)
  // window.location.hash ==> '[#/search] | ? | [query=value&query2=value2........]'
  const [hash, queryParamsString] = window.location.hash.split('?')
  
  // A su vez manipulamos el queryParamsString y los subdividimos en un array con multiples valores del tipo ['query1=value1', 'query2=value2', ...]
  // query=value | & | query2=value2 | & | query3=value3....
  const rawQueryParams = queryParamsString?.split('&')

  // Declaramos el objeto que va a almacenar las llaves / valor de los query params
  let queryParamsMap = {}

  // Por cada valor del tipo 'query1=value1', los separamos en base al simbolo '=' y obtenemos la llave (query1) y el valor (value1)

  // ['query1=value1', 'query2=value2', ...]
  rawQueryParams?.forEach(query => {
    const [key, value] = query.split('=')

    // Verificamos que esa llave no exista en el objeto que almacenara nuestras query params y lo agregamos con su respectivo valor
    if (!queryParamsMap[key]) {
      queryParamsMap[key] = value
    }
  })

  // RESULTADO:
  /* 
    {
        query1: value1,
        query2: value2
        ...
    } 
    Finalmente obtenemos un objeto con todos los query params que podemos utilizar para compartir informacion entre paginas
  */

  onAuthStateChanged(auth, (user) => {
    if (!user && hash === '#/createNewUser') {
      containerRoot.appendChild(createUser());
      return;
    }

    if (!user) {
      containerRoot.appendChild(logInTemplate());
    } else {
      switch (hash) {
        case '#/home':
          containerRoot.appendChild(home());
          break;
        case '#/userProfile':
          containerRoot.appendChild(userProfile());
          break;
        case '#/search':
          containerRoot.appendChild(searchPost());
          break;
        case '#/editPost':
          // Enviamos el queryParamsMap a nuestro template de edit post, para que pueda acceder a valores proveidos por la pagina anterior (en este caso, necesitamos el id del post)
          containerRoot.appendChild(editPost(queryParamsMap));
          break;
        case '#/createPost':
          containerRoot.appendChild(newPost());
          break;
        default:
          containerRoot.appendChild(error404Template());
      }
    }
  });
};
