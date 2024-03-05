export class CartModel{
    constructor(){
        this.cartProducts = [];
        this.productsCount = 0;
    }

    addProduct(product, count){
        var productIndex = -1;

        for (var index = 0; index < this.cartProducts.length;index++){
            if (this.cartProducts[index].product.id == product.id){
                productIndex = index;
                break
            }
        }

        if (productIndex < 0){
            var newCartEntry = new CartEntry(product, count);
            this.cartProducts.push(newCartEntry);
            this.productsCount += count;
            return;
        }

        this.cartProducts[productIndex].count += count;
        this.productsCount += count;
    }

    decreaseProductCount(product, count){
        var productIndex = -1;

        for (var index = 0; index < this.cartProducts.length;index++){
            if (this.cartProducts[index].product.id == product.id){
                productIndex = index;
                break
            }
        }

        if (productIndex < 0){
            return;
        }

        this.cartProducts[productIndex].count -= count;
        this.productsCount -= count;

        if (this.cartProducts[productIndex].count <= 0) {
            this.cartProducts.splice(productIndex,1);
        }
    }

    deleteProduct(product){
        var productIndex = -1;

        for (var index = 0; index < this.cartProducts.length;index++){
            if (this.cartProducts[index].product.id == product.id){
                productIndex = index;
                break
            }
        }

        if (productIndex < 0){
            return;
        }

        this.productsCount -= this.cartProducts[productIndex].count;
        this.cartProducts.splice(productIndex,1);
    }

    setProductCount(product, newCount){
        var productIndex = -1;

        for (var index = 0; index < this.cartProducts.length;index++){
            if (this.cartProducts[index].product.id == product.id){
                productIndex = index;
                break
            }
        }

        if (productIndex < 0){
            return;
        }

        if (newCount <= 0){
            this.productsCount -= this.cartProducts[productIndex].count;
            this.cartProducts.splice(productIndex,1);
            return;
        }

        var countDifference = newCount - this.cartProducts[productIndex].count;
        this.cartProducts[productIndex].count += countDifference;
        this.productsCount += countDifference;
    }
}

export class CartEntry{
    constructor(product, count){
        this.product = product;
        this.count = count;
    }

    updateCount(value){
        this.count = value;
    }
}