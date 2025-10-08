export function tempDataMiddleware(req, res, next) {
    Object.defineProperty(req, 'tempData', {
        set(values) {
            req.session.tempData = values;
        },
        get() {
            // TODO Fix getter
            return req.session.tempData;
        }
    });

    if (!req.session.tempData) {
        return next();
    }

    Object.assign(res.locals, req.session.tempData);

    req.session.tempData = null;

    next();
}
