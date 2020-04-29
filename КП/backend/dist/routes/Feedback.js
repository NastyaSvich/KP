"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FeedbackController_1 = __importDefault(require("../controllers/FeedbackController"));
const Auth_1 = __importDefault(require("../middlewares/Auth"));
function default_1() {
    this.post('/feedback', Auth_1.default(false), FeedbackController_1.default.addFeedback);
    this.put('/feedback/:id', Auth_1.default(false), FeedbackController_1.default.editFeedback);
    this.delete('/feedback/:id', Auth_1.default(false), FeedbackController_1.default.deleteFeedback);
}
exports.default = default_1;
//# sourceMappingURL=Feedback.js.map