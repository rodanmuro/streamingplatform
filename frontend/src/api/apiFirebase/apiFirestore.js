import sweetAlert from './sweetAlert';
import { firebaseApp } from './apiConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDoc, getDocs, doc, addDoc, updateDoc,  query, where} from 'firebase/firestore';
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const apiFirestore = {
    signInWithEmailAndPass: async (email, password ) => {
      await signInWithEmailAndPassword(auth, email, password).catch( error => sweetAlert.showErrores(error) );
    },
    createUserInFirestore: async (email, password, nombre) => {
        let uid = '';
        await createUserWithEmailAndPassword(auth, email, password).then( async response => {
          await addDoc(collection(db, 'usuarios'), {
            email: email,
            nombre: nombre,
            uid: '',
            password: password,
            fecha_creacion: new Date(),
            mispeliculas: []
          }).then( async response => {
            uid = response._key.path.segments[1];
            await updateDoc(doc(db, 'usuarios', response._key.path.segments[1]), {
              uid: response._key.path.segments[1]
            });
          }).catch( error => console.log(error) );
        }).catch( error => sweetAlert.showErrores(error) );

        return uid;
    },
    getDataUser: async ({ email }) => {
        const q = query(collection(db, "usuarios"), where('email', "==", email) );
        const querySnapshot = await getDocs(q);
        let dataUser = '';
      
        querySnapshot.forEach((doc) => {
          dataUser = doc.data();
        });

        return ({
            email: dataUser.email,
            nombre: dataUser.nombre,
            uid: dataUser.uid,
            mispeliculas: dataUser.mispeliculas,
        });
    },
    getMisPeliculas: async ({ uid }) => {
        const alquiladas = await getDoc(doc(db, 'usuarios', uid));
        return alquiladas.exists() ? alquiladas.data().mispeliculas : 'No existe el documento';
    },
    addMisPeliculas: async ({ user, movie, misPeliculas }) => {
        let alquiladas = misPeliculas.find( element => element['id'] == movie['id'] );

        if(alquiladas && alquiladas.id){
            sweetAlert.showMovieAlquilada(movie, true);
            return misPeliculas;
        } else {
            await updateDoc(doc(db, 'usuarios', user.uid), {
                 mispeliculas: [...misPeliculas, movie]
            });
            sweetAlert.showMovieAlquilada(movie, false);
            return ([...misPeliculas, movie])
        }
    },
    deleteOfMisPeliculas: async ({ user, movie, misPeliculas }) => {
        let alquiladas = misPeliculas.filter( element => element['id'] !== movie['id'] );

        await updateDoc(doc(db, 'usuarios', user.uid), {
            mispeliculas: alquiladas
        });
        return alquiladas;
    }
}

export default apiFirestore;