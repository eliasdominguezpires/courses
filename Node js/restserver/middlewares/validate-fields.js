const { validationResult } = require("express-validator");


const validateFields = (req, res, next) => {
    const validation = validationResult(req);
    console.log(validation);
    if (!validation.isEmpty()) {
        return res.status(400).json({
            msg: "Errores de validacion",
            validation
        })
    }

    next();
}

module.exports = {
    validateFields,
}