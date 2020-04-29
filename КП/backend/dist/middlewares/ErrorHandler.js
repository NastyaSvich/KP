"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, req, res, next) => {
    res.status(err.status || 500);
    if (typeof err.message === "string") {
        res.json({ message: err.message });
    }
    else {
        res.json(err.message);
    }
    if (!err.status)
        next(err);
};
//# sourceMappingURL=ErrorHandler.js.map