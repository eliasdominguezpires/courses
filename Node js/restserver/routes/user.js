const { Router } = require("express");
const { getUser, postUser, putUser, deleteUser, patchUser } = require("../controllers/user");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { rolValidate, existEmail, existUserById } = require("../helpers/db-validators");

const router = Router();

router.get('/', getUser)

router.post('/', [
    check('name', 'Campo nombre es requerido').not().isEmpty(),
    check('password', 'Password debe de ser mayor a 6 digitos/letras').isLength({ min: 6 }),
    check('mail', 'Correo no valido').isEmail(),
    check('mail').custom(existEmail),
    // check("rol", "Rol no valido").isIn(["ADMIN_ROLE", "USER_ROLE", "OTHER_ROLE"]),
    check('rol').custom(rolValidate),
    validateFields
], postUser)

router.put('/:id', [
    check("id", "ID no valido").isMongoId(),
    check("id").custom(existUserById),
    check('rol').custom(rolValidate),
    validateFields
], putUser)

router.delete('/:id', [
    check("id", "ID no valido").isMongoId(),
    check("id").custom(existUserById),
    validateFields
], deleteUser)

router.patch('/', patchUser)


module.exports = router;