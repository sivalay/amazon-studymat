
export const cart = []

export function addToCart(productId){
    let matchItem
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchItem = cartItem
        }
    })
    if(matchItem){
      matchItem.quantity +=1
    } else{
        cart.push({
            productId,
            quantity : 1
        })
    }
  }