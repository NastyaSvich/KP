import Auth from '../middlewares/Auth'
import FilmController from "../controllers/FilmController";

export default function() {
    this.get('/films', FilmController.getFilms);
    this.post('/film', Auth(true), FilmController.postFilm);
    this.get('/film/:id', FilmController.getFilm);
    this.delete('/film/:id', Auth(true), FilmController.deleteFilm);
    this.put('/film/:id', Auth(true), FilmController.editFilm);
}
