import { getAllCustomers } from "./CustomerController.js"; 
import { getAllItems, updateItemStock } from "./ItemController.js"; // Stock update කිරීමට
import { saveOrderData, getAllOrders, generateNextOrderId } from "../model/OrderModel.js";

let cart = [];