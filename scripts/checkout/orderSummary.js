import { cart,removeFromCart,updateDeliveryOption } from "../../data/cart.js";
import { products,getProduct } from "../../data/products.js";
import { currencyFormat } from "../utils/money.js"
import { deliveryOptions,getDeliveryOption } from "../../data/deliveryOptions.js"
import { renderPaymentSummary } from "./paymentSummary.js";
// import {hello} from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js"
// import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"



export function renderOrderSummary(){

    let cartSummaryHTML = ''
    cart.forEach((cartItem) => {
        const productId = cartItem.productId

        const matchProduct = getProduct(productId)

        const deliveryOptionId = cartItem.deliveryOptionId

        let deliveryOption = getDeliveryOption(deliveryOptionId)
        
        const today = dayjs()
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
        const dateString = deliveryDate.format('YYYY, MMMM D')


        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchProduct.name}
                    </div>
                    <div class="product-price">
                        ${currencyFormat(matchProduct.priceCents)}
                    </div>
                    <div class="product-quantity js-product-quantity-${matchProduct.id}">
                        <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                        Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchProduct.id}" data-product-id="${matchProduct.id}">
                        Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchProduct, cartItem)}
                </div>
            </div>
        </div>
        `
    })

    function deliveryOptionsHTML(matchProduct, cartItem){
        let html = ''

        deliveryOptions.forEach((deliveryOption) => {

            const today = dayjs()
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
            const dateString = deliveryDate.format('YYYY, MMMM D')

            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${currencyFormat(deliveryOption.priceCents)}`

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId

            html += `<div class="delivery-option js-delivery-option" data-product-id="${matchProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} - Shipping
                    </div>
                </div>
            </div>`
        })
        return html
    }

    const orderSummary = document.querySelector('.order-summary')
    orderSummary.innerHTML = cartSummaryHTML

    document.querySelectorAll('.js-delete-link').forEach((link) =>{
        link.addEventListener('click', () => {
            const productId = link.dataset.productId
            removeFromCart(productId)

            const container = document.querySelector(`.js-cart-item-container-${productId}`)
            container.remove()

            renderPaymentSummary()
        })
    })

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset
            updateDeliveryOption(productId, deliveryOptionId)
            renderOrderSummary()

            renderPaymentSummary()
        })
    })
}

