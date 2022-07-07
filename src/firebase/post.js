import {
    db, addDoc, collection, getDocs, query, where, auth, orderBy, doc, getDoc, setDoc, deleteDoc, arrayUnion
  } from './init.js';
  
  //Llama array con todo los post
  const getAllPosts = async () => {
    try {
      const postsArray = []; //array vacio donde quedaran los post.
      const getAllPostsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));//consulta a db.
      const allPostsSnapshot = await getDocs(getAllPostsQuery);// espera obtener los datos.
      allPostsSnapshot.forEach((doc) => {

        const postId = doc.id // sadkfhasjehauihfdsajelskfkdalsjfkasr
        const postData = doc.data() 

        /* 
          {
            text
            postType
            timestamp
            likes
            id: hjksdafhioerjkhauifieasjfhdsaoe
          }
        
        */

        const post = {   
          ...postData,
          id: postId
        }

        postsArray.push(post);//.data(), toma data especifica de nuestra coleccion.
      });

      return postsArray;
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentUserPosts = async () => {
    try {
      const postsArray = [];
      const user = auth.currentUser.uid;//propiedad para obtener el usuario que accedio si no accede nadie es null

      const getCurrentUserPostsQuery = query(collection(db, 'posts'), where('idUser', '==', user), orderBy('createdAt', 'desc'));//metodo where recibe 3 parametros uno para filtrar uno para comparar y el valor
      const postsSnapshot = await getDocs(getCurrentUserPostsQuery);
      postsSnapshot.forEach((doc) => {
        const postId = doc.id
        const postData = doc.data()

        const post = {
          id: postId,
          ...postData
        }


        postsArray.push(post);//data adjunta el array que trae postsSnapshot
      });
      return postsArray;
    } catch (error) {
      console.log(error);
    }
  };

  const getOnePost = async (idPost) => {
    try {
      const docRef = doc(db, 'posts', idPost)
      const docSnapshot = await getDoc(docRef)

      return docSnapshot.data()
    } catch(error) {
      console.log
    }
  } 
  
  //Crea en la coleccion de la db
  const createPost = async (dataPost) => {
    try {
      const user = auth.currentUser.uid;
      const secondsTimestamp = Math.floor(Date.now() / 1000)
      await addDoc(collection(db, 'posts'), {
        ...dataPost,
        idUser: user, 
        createdAt: secondsTimestamp, 
        likes: [] 
      }); //... agrega otro elemento en un mismo objeto.
      console.log(dataPost)
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (dataPost) => {
    try {
      console.log(dataPost)
      const postRef = doc(db, 'posts', dataPost.id)
      await setDoc(postRef, dataPost, { merge: true })

      window.location.href = '#/userProfile'
      console.log('actualizado')
    } catch(error) {
      console.log(error)
    }
  }

  const deletePost = async (idPost) => {
    alert('Estás seguro de que Deseas Eliminar éste Post?');
    try {
      const postRef = doc(db, 'posts', idPost)

      await deleteDoc(postRef)

      window.location = '#/userProfile'
      console.log('post eliminado')
    } catch(error) {
      console.log(error)
    }
  }

  const handleLikePost = async (idPost, idUser) => {
    try {
      const postRef = doc(db, 'posts', idPost)

      const dataPostSnapshot = await getDoc(postRef)
      const dataPost = dataPostSnapshot.data()

      await setDoc(postRef, {
        ...dataPost,
        likes: arrayUnion(idUser)
      }, { merge: true })

      window.location.reload()
    } catch(error) {
      console.log(error)
    }
  }
  
export { createPost, getCurrentUserPosts, getAllPosts, getOnePost, updatePost, deletePost, handleLikePost };