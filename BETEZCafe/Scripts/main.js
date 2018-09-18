
$(document).ready(function () {
    $.ajax({
        url: "/Data_Demo/data.json", success: function (result) {
            console.log(result);
            drinks.data = result;
            drinks.displayOnMenu();
        }
    });
})

var drinks = {

    sampleDrinkUI: '\
        <div class="product">\
            <div class="product-thumbnail">\
                <button class="thumbnail-overlay">\
                    <p>\
                        Đặt hàng\
                    </p>\
                </button>\
            </div>\
            <div class="product-price">\
                <p>\
                </p>\
            </div>\
            <p class="product-name">\
            </p>\
        </div >\
    ',

    getDrinkThumbnailFullPath: function (img) {
        return '/content/images/products/' + img;
    },

    makeDrinkUI: function(i){
        var drink = this.data[i];
        drink.imgUrl = this.getDrinkThumbnailFullPath(drink.img);
        var drinkUI = $(this.sampleDrinkUI);

        drinkUI.find('.product-thumbnail').css({'background-image': 'url("' + drink.imgUrl + '")'});
        drinkUI.find('.thumbnail-overlay').prop('value', i);
        drinkUI.find('.thumbnail-overlay').click(cart.add);
        drinkUI.find('.product-price > p').html(drink.price + 'k');
        drinkUI.find('.product-name').html(drink.name);

        return drinkUI;
    },

    displayOnMenu: function () {
        for (var i = 0; i < this.data.length; i++) {
            drinkUI = this.makeDrinkUI(i);
            $(".menu-content").append(drinkUI);
        }
    }
}

var cart = {
    orderedDrinks: {},
    orderedDrinkUIs: {},
    
    sampleDrinkInCartUI: '\
    <div class="cart-product">\
        <div class="cart-product-thumbnail"></div>\
        <p class="cart-product-name">\
        </p>\
        <div class="cart-product-quantity">15\
        </div>\
    </div>\
    ',

    makeDrinkInCartUI: function (i) {
        var drinkInCartUI = $(this.sampleDrinkInCartUI);
        var drink = drinks.data[i];
        drink.imgUrl = drinks.getDrinkThumbnailFullPath(drink.img);

        drinkInCartUI.find('.cart-product-thumbnail').css({'background-image': 'url("' + drink.imgUrl + '")'});
        drinkInCartUI.find('.cart-product-name').html(drink.name);
        drinkInCartUI.prop('value', i);
        drinkInCartUI.click(cart.remove);

        return drinkInCartUI;
    },

    add: function () {
        targetHTMLElem = $(this);
        drinkIndex = targetHTMLElem.prop('value');
        
        if(cart.orderedDrinks.hasOwnProperty(drinkIndex)){
            cart.orderedDrinks[drinkIndex]++;
        }else{
            cart.orderedDrinks[drinkIndex] = 1;
        }

        cart.reloadUI();
    },

    remove: function () {
        targetHTMLElem = $(this);
        drinkIndex = targetHTMLElem.prop('value');

        cart.orderedDrinks[drinkIndex]--;
        if(!cart.orderedDrinks[drinkIndex]){
            delete cart.orderedDrinks[drinkIndex];
        }

        cart.reloadUI();
    },
    
    convertToSubmit: function () {
        submitData = {};
        for (const drinkIndex in this.orderedDrinks) {
            quantity = this.orderedDrinks[drinkIndex];
            drink = drinks.data[drinkIndex];
            submitData[drink.id] = quantity;
        }
        return submitData;
    },
    
    submit: function () {
        submitData = this.convertToSubmit();
        console.log(submitData);
    },
    
    reloadUI: function () {
        if(jQuery.isEmptyObject(this.orderedDrinks)){
            $('.cart').animate({width: 'hide'}, 300);
        } else {
            $('.cart').animate({width: 'show'}, 300);

            for (drinkIndex in cart.orderedDrinks) {
                if(cart.orderedDrinkUIs.hasOwnProperty(drinkIndex)){
                    quantity = this.orderedDrinks[drinkIndex];
                    if(quantity > 1){
                        cart.orderedDrinkUIs[drinkIndex].find('.cart-product-quantity').html(quantity);
                        cart.orderedDrinkUIs[drinkIndex].find('.cart-product-quantity').animate({opacity: 'show'}, 300);                      
                    }else {
                        cart.orderedDrinkUIs[drinkIndex].find('.cart-product-quantity').animate({opacity: 'hide'}, 300);                      
                    }

                }else{
                    drinkInCartUI = cart.makeDrinkInCartUI(drinkIndex)
                    cart.orderedDrinkUIs[drinkIndex] = drinkInCartUI;
                    $('.cart-products').append(drinkInCartUI);
                    drinkInCartUI.animate({height: 'show', opacity: 'show'}, 300);
                }
            }

            for(drinkIndex in cart.orderedDrinkUIs){
                if(!cart.orderedDrinks.hasOwnProperty(drinkIndex)){
                    removedDrink = cart.orderedDrinkUIs[drinkIndex]
                    removedDrink.animate({height: 'hide', opacity: 'hide'}, 300, ()=>{removedDrink.remove()});
                    delete cart.orderedDrinkUIs[drinkIndex];
                }
            }
        }
    }
}
