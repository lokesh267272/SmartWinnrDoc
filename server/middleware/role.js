module.exports = function (roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'No user found' });
        }

        if (!roles.includes(req.user.role)) {
        

            return res.status(403).json({ 
            message: ` you don't have the required permissions. Required role: ${roles.join(' or ')}, Your role: ${req.user.role}` 
            });
        }

        next();
    };
};
