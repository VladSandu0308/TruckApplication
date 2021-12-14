const validateRegister = (body) => {
    try {
        const {password, confirmation_password} = body;

        if (!confirmation_password || password !== confirmation_password) {
            throw "Passwords are not the same!";
        }

        if (password.length < 8) {
            throw "Password should have at least 8 characters!";
        }

    } catch (err) {
        return err;
    }
}

module.exports = validateRegister;