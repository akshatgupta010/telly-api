export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if(!result.success) {
        return res.status(422).json({
            error: 'Validation failed',
            details: result.error.issues.map((i) => ({
                path: i.path.join('.'),
                message: i.message,
            })),
        });
    }
    req.body = result.data;
    next();
};

export const parseId = (req, res, next) => {
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ error: 'Invalid id' });
    }
    req.showId = id;
    next();
}