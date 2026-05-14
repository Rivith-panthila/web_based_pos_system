import { AuthController } from "./controllers/AuthController.js";
import { CustomerController } from "./controllers/CustomerController.js";

document.addEventListener('DOMContentLoaded', function () {

    const authController = new AuthController();
    const customerController = new CustomerController();

    window.authController = authController;
    window.customerController = customerController;

});