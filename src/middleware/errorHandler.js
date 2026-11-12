export const notFound = (req, res) => {
    res.status(404).json({ error: 'Route not found' });
};

export const errorHandler = (err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Invalid JSON body' });
    }
    if (err.code === '23505') {
    return res.status(409).json({ error: 'A show with that name already exists' });
    }
    if (process.env.NODE_ENV !== 'test') console.error(err);
    const status = err.status || 500;
    res.status(status).json({
        error: status === 500 && process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : err.message,
    });
};