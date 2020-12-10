$(function(){
    let list = null

    const list_info = {
        cat_one: 'all',
        cat_two: 'all',
        sort_method: '综合',
        sort_type: 'ASC',
        current: 1,
        pagesize: 12
    }
    //一级分类
    getCatOne()
    async function getCatOne(){
        
        const cat_one_list = await $.get('./server/getCateOne.php',null,null,'json')
        
        let str = `<span data-type="all" class="active">全部</span>`
        cat_one_list.list.forEach(item => {
            str += `
            <span data-type="${ item.cat_one_id }">${ item.cat_one_id }</span>
            `
        })

        $('.cateOneBox > .right').html(str)

    }

    //二级分类
    async function getCateTwo(){
        const cate_two_list = await $.get('./server/getCateTwo.php',{ cat_one:list_info.cat_one },null,'json')
        let str = '<span data-type="all" class="active">全部</span>'
        cate_two_list.list.forEach(item => {
            str += `<span data-type="${ item.cat_two_id }">${ item.cat_two_id }</span>`
        })
        $('.catTwoBox .right').html(str)
    }

    //分页信息
    getTotalPage()
    async function getTotalPage(){
        //分页数据
        const totalInfo = await $.get('./server/getTotalPage.php',list_info,null,'json')
        //分页渲染
        $('.pagination').pagination({
            pageCount: 50,
            jump: true,
            mode: 'fixed',
            coping: true,
            homePage: '首页',
            endPage: '末页',
            prevContent: '上页',
            nextContent: '下页',
            pageCount: totalInfo.total,
            callback (index) {
                list_info.current = index.getCurrent()
                // 从新请求商品列表
                getShopList()
            }
        })

    }

    getShopList()
    async function getShopList(){
        const shopList = await $.get('./server/getShopList.php',list_info,null,'json')
        
        list = shopList.list

        // 渲染页面
        let str = ''
        shopList.list.forEach(item =>{
            str += `
            <li class="thumbnail">
                <img data-id="${ item.shop_id }" src="${ item.shop_big_logo }" alt="...">
                <div class="caption">
                    <h3 data-id="${ item.shop_id }">${ item.shop_name }</h3>
                    <p class="price">￥<span class="text-danger">${ item.shop_price }</span></p>
                    <p>
                        <a href="javascript:;" class="btn btn-danger addCart" role="button" data-id="${ item.shop_id }">加入购物车</a>
                        <a href="./cart.html" class="btn btn-warning" role="button">去结算</a>
                    </p>
                </div>
            </li>
            `
        })
        $('.goodsList > ul').html(str)
    }

    //一级分类点击事件
    $('.cateOneBox').on('click','span', function(){
        
        $(this).addClass('active').siblings().removeClass('active')

        const type = $(this).data('type')

        //修改 list_info
        list_info.cat_two = 'all'
        list_info.cuttent = 1
        list_info.cat_one = type

        getTotalPage()
        getShopList()

        //判断 type 是否为 all
        if(type === 'all'){
            $('.catTwoBox .right').html('<span data-type="all" class="active">全部</span>')
        }else{
            getCateTwo()
        }
    })

    //二级分类点击事件
    $('.catTwoBox').on('click','span',  function(){
        const type = $(this).data('type')
        $(this).addClass('active').siblings().removeClass('active')
        list_info.current = 1
        list_info.cat_two = type

        getTotalPage()
        getShopList()  

        
    })

    //排序
    $('.sortBox').on('click','span', function(){
        const method = $(this).attr('data-method')
        const type = $(this).attr('data-type')

        $(this).addClass('active').siblings().removeClass('active')
        list_info.sort_method = method
        list_info.sort_type = type

        getTotalPage()
        getShopList()
        
        $(this)
        .attr('data-type',type === 'ASC'? 'DESC' : 'ASC')
        .siblings()
        .attr('data-type','ASC')
    })

    //跳转到详情页
    $('.goodsList ul').on('click','img',function(){
        const id = $(this).data('id')
        setCookie('shop_id',id)
        // console.log(id)
        window.location.href = './detail.html'

    })

    //假如购物车
    $('.goodsList').on('click', '.addCart', function(){
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []
        const id = $(this).data('id')
        console.log(id)
        const flag = cart.some(item => item.shop_id == id)
        if(flag){
            const cart_shop = cart.filter(item => item.shop_id == id)[0]
            cart_shop.cart_number = cart_shop.cart_number - 0 + 1
        }else{
            const info = list.filter(item => item.shop_id == id)[0]
            info.cart_number = 1
            cart.push(info)
        }

        window.localStorage.setItem('cart',JSON.stringify(cart))
    })

})