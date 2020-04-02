import FeedbackController from '../controllers/FeedbackController';
import Auth from '../middlewares/Auth';

export default function() {
    this.post('/feedback', Auth(false), FeedbackController.addFeedback);
    this.put('/feedback/:id', Auth(false), FeedbackController.editFeedback);
    this.delete('/feedback/:id', Auth(false), FeedbackController.deleteFeedback);
}
