const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jsonwebtoken = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { password } = req.body;
    try {
        req.body.password = CryptoJS.AES.encrypt(password, "my_secret_key");

        const user = await User.create(req.body);
        const token = jsonwebtoken.sign({ id: user._id }, "my_secret_key", { expiresIn: '24h' });
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username }).select('password username');
        if (!user) {
            return res.status(401).json({
                errors: [
                    {
                        param: 'username',
                        msg: 'Invalid username or password',
                    },
                ],
            });
        }

        // const decryptedPass = CryptoJS.AES.decrypt(user.password, "my_secret_key").toString(
        //     CryptoJS.enc.Utf8,
        // );

        // if (decryptedPass !== password) {
        //     return res.status(401).json({
        //         errors: [
        //             {
        //                 param: 'username',
        //                 msg: 'Invalid username or password',
        //             },
        //         ],
        //     });
        // }

        // user.password = undefined;

        const token = jsonwebtoken.sign({ id: user._id }, "my_secret_key", { expiresIn: '24h' });

        res.status(200).json({ user, token });
    } catch (err) {
        res.status(500).json(err);
    }
};
