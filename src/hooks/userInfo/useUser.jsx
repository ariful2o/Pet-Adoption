
import auth from '../../firebase/firebase.conf';

export default function useUser() {
    const user = auth?.currentUser;

    // The user object has basic properties such as display name, email, etc.
    const displayName = user?.displayName;
    const email = user?.email;
    const photoURL = user?.photoURL;
    return { displayName, email, photoURL }
}
