import {db, doc, auth, getDoc} from './init.js';
  
  const getUserData = async () => {
    try {
      const user = auth.currentUser;
      const getUserDataDoc = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(getUserDataDoc);

      return userDocSnapshot.data();
    } catch (err) {
      console.log(err);
    }
  };
  
  const getUserPostData = async (uid) => {
    try {
      const getUserDataDoc = doc(db, 'users', uid);
      const userDocSnapshot = await getDoc(getUserDataDoc);
      return userDocSnapshot.data(); //data from firebase/collection/users/ANYid)
    } catch (err) {
      console.log(err);
    }
  };
  
  export { getUserPostData, getUserData };