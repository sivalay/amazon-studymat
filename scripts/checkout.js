import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// import '../data/cart-Class.js'
// import '../data/backend-practice.js'


async function loadPage(){
    await loadProductsFetch()

    await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
        
    })

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage()


// -----promise.all()-------
// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
        
//     })
// ]).then((values) => {
//     console.log(values)
//     renderOrderSummary();
//     renderPaymentSummary();
// });

// ------promise-------
// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('value1')
//     })
// }).then((value) => {
//     console.log(value)
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve()
//         })
        
//     })
// }).then(() => {
//     renderOrderSummary()
//     renderPaymentSummary()
// })

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary()
//         renderPaymentSummary()
//     }) 
// })
