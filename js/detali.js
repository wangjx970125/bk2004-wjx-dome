$(function(){
    let info = null
    const id = getCookie('shop_id')
    
    getShopInfo()
    async function getShopInfo(){
        const shopInfo = await $.get('./server/getShopInfo.php/',{ shop_id:id },null,'json')
        
        bindHtml(shopInfo.info)
        info = shopInfo.info
    }

    function bindHtml(info){
        
        //渲染放大镜位置
        $('.enlargeBox').html(
            `
            <div class="show hizoom gakki">
                <img src="${ info.shop_big_logo }" alt="">
            </div>
            <div class="list">
                <p class="active">
                <img src="${ info.shop_small_logo1 }" alt="">
                </p>
                <p>
                <img src="${ info.shop_small_logo2 }" alt="">
                </p>
            </div>
            `
        )
        $('.gakki').hiZoom({
            width: 400,
            position: 'right'
          });
          $('.ldy').hiZoom({
            width: 500,
            position: 'left'
          });      


        $('.goodsInfo').html(`
            <p class="desc">${ info.shop_name }</p>
            <div class="btn-group size">
                <button type="button" class="btn btn-default">S</button>
                <button type="button" class="btn btn-default">M</button>
                <button type="button" class="btn btn-default">L</button>
                <button type="button" class="btn btn-default">XL</button>
            </div>
            <p class="price">
                <span class="text-danger">${ info.shop_price }</span>
            </p>
            <div class="num">
                <button class="subNum">-</button>
                <input type="text" value="1" class="cartNum">
                <button class="addNum">+</button>
            </div>
            <div>
                <button class="btn btn-success addCart">加入购物车</button>
                <button class="btn btn-warning continue"><a href="./list.html">继续去购物</a></button>
            </div>
        `)

        //商品参数渲染
        $('.goodsDesc').html(info.shop_introduce)
    }
    

    //加入购物车
    $('.goodsInfo').on('click', '.addCart', function(){
        
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []
        const flag = cart.some(item => item.shop_id === id)
        if(flag){
            const cart_shop = cart.filter(item => item.shop_id === id)[0]
            cart_shop.cart_number = cart_shop.cart_number - 0 + ($('.cartNum').val() - 0)
        }else{
            info.cart_number = 1
            cart.push(info)
        }

        window.localStorage.setItem('cart',JSON.stringify(cart))
        
    })
    
    $('.goodsInfo')
    .on('click','.subNum',function(){
        let num = $('.cartNum').val() - 0 
        if(num === 1) return
        $('.cartNum').val(num - 1)
    })
    .on('click','.addNum',function(){
        let num = $('.cartNum').val() - 0 
        $('.cartNum').val(num + 1)
    })
})