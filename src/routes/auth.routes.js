const Router = require("express");
const {register,login, loginAdmin} = require("../controllers/user.controller");
const validate = require("../middlewares/validate.middleware");
const { registerValidationSchema,loginValidationSchema } = require("../validation/auth.validation");

const router = Router();

router.post("/register", validate(registerValidationSchema), register);

router.post('/login', validate(loginValidationSchema), login);

router.post('/login-admin', validate(loginValidationSchema), loginAdmin);

module.exports = router;
