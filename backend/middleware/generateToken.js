import jwt from 'jsonwebtoken';

export default (id) => {
    jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
}