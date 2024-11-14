const jwt = require('jsonwebtoken');

// Middleware สำหรับตรวจสอบ token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.render('error', { status: 'Token is missing. Please login.', path: '/login' }); 
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.render('error', { status: 'Invalid token. Please login again.', path: '/login' });
        }

        req.user = decoded;
        next();
    });
};


const verifyUserOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'user' || req.user.role === 'admin')) {
        return next(); 
    } else {
        return res.render('error', { status: "You do not have permission to contact the system administrator.", path: '/' });
    }
};

// Middleware สำหรับตรวจสอบว่า user เป็น admin
const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next(); 
    } else {
        return res.render('error', { status: "Admin Only. Please contact Admin.", path: '/' });
    }
};

module.exports = { verifyToken, verifyUserOrAdmin, verifyAdmin };
