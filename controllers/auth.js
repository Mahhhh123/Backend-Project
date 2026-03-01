const User = require('../models/Users')

exports.register = async (req, res) => {
    try {
        const { name, tel, email, password, role } = req.body;
        const user = await User.create({ name, tel, email, password, role });
        sendTokenResponse(user, 200, res);
    } catch (err) { 
        // แก้จากเดิมที่ส่งแค่ success: false ให้ส่ง message ของ Error ออกมาด้วย
        res.status(400).json({ success: false, message: err.message }); 
    }
};

exports.login = async (req, res) => {
    console.log("login-Sucessful",req.body);
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false ,message:"No User in Database"});
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ success: false,msg :"Username or Password incorrect" });
    sendTokenResponse(user, 200, res);
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ success: true, token });
};

// @desc   Get current Logged in user
// @route  POST /api/v1/auth/me
// @access Private
exports.getMe = async (req, res, next) => {
    try {
        // req.user.id จะถูกส่งมาจาก Middleware 'protect'
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'No user found with this id' });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};


exports.logout = async (req, res) => {
    res.status(200).json({ success: true, data: {} });
};