import UserController from '../controllers/UserController';
import Auth from '../middlewares/Auth';

export default function() {
    this.post('/registration', UserController.registerUser);
    this.post('/login', UserController.loginUser);
    this.put('/user', Auth(false), UserController.editUser)
}
