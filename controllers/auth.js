const User = require('../models/User')

exports.register = async (req, res) => {
    try {
        const { name, tel, email, password, role } = req.body;
        const user = await User.create({ name, tel, email, password, role });
        sendTokenResponse(user, 200, res);
    } catch (err) { res.status(400).json({ success: false }); }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false });
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ success: false });
    sendTokenResponse(user, 200, res);
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ success: true, token });
};

exports.logout = async (req, res) => {
    res.status(200).json({ success: true, data: {} });
};