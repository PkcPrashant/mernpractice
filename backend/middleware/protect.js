import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verifiy(token, process.env.JWT_SECRET_TOKEN);
            //   req.user = await User.findById(decoded.id).select('-password');
            console.log('decoded');
            next();
        }
        catch (err) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
}