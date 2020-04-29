import Auth from '../middlewares/Auth'
import RolikController from "../controllers/RolikController";

export default function() {
    this.get('/roliks', RolikController.getRoliks);
    this.post('/rolik', Auth(true), RolikController.postRolik);
    this.get('/rolik/:id', RolikController.getRolik);
    this.delete('/rolik/:id', Auth(true), RolikController.deleteRolik);
    this.put('/rolik/:id', Auth(true), RolikController.editRolik);
}
