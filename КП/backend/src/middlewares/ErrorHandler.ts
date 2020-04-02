export default (err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500);
    if (typeof err.message === "string") {
        res.json({message: err.message});
    } else {
        res.json(err.message);
    }
    if (!err.status) next(err);
}
