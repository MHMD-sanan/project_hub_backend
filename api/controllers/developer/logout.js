/* eslint-disable consistent-return */
const DeveloperSchema = require('../../models/developer/developerSchema');

const handleLogout = async (req, res) => {

    const { cookies } = req;
    if (!cookies?.Dev_jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.Dev_jwt;
    // Is refreshToken in db?
    const foundUser = await DeveloperSchema.findOne({ refreshToken }).exec();
    if (!foundUser) {
        // if refresh token not present
        res.clearCookie('Dev_jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    await foundUser.save();

    res.clearCookie('Dev_jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports =  handleLogout