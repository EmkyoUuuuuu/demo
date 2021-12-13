const id = window.localStorage.getItem('id')
const token = window.localStorage.getItem('token')

if (!id) {
    $('.on').addClass('active')
    $('.off').removeClass('active')
  }
  
$.ajax({              //登陆验证
  url: 'http://localhost:8888/users/info?id=' + id,
  headers: {'authorization':token },
  success (res) {
    if (res.code !== 1) {
      $('.on').addClass('active')
      $('.off').removeClass('active')
    } else {
      $('.nickname').html(res.info.nickname)
      $('.on').removeClass('active')
      $('.off').addClass('active')
    }
}
})

$('.logout').on('click', async () => {        
    const res = await $.ajax({         
      url: 'http://localhost:8888/users/logout',
      data: { id },
    })
    
    if (res.code === 1) {
      window.localStorage.removeItem('id')
      window.localStorage.removeItem('token')
      window.location.replace('./login.html')
    }
  })

getCarList()
async function getCarList() {    //JQ也可以使用promise的两种形式
  const res = await $.ajax({
        url: `http://localhost:8888/cart/list`,
        data: {
          id,
        },
        headers: {'authorization':token },
    })
    
    if (res.code === 401) {
    alert('请登陆后查看您的购物车，谢谢合作')
    return
    }

    if (res.code === 1) {
        console.log(res)
        if(!res.cart.length){
            $('.info').html('购物车空空如也,点击<a href="./index.html">首页</a>Go Shopping吧!')
            $('.clear').css('display','none')
        }else{
          let str = ''
          res.cart.forEach(item => {
                str += `
                <p>
                <img src="${ item.img_small_logo }" alt="">
                <span class="title">描述:${ item.title }</span>
                <span class="price">价格:${ item.price }</span>
                </p>
                `
              })
              $('.container').html(str)
              $('.clear').css('display','block')
          }
    }
}

$('.clear').on('click',function(){
    clearCar()
    async function clearCar() {
      const res = await $.ajax({
        url: 'http://localhost:8888/cart/clear',
        data:{
            id 
        },
        headers: { 'authorization': token }
      })
    
      if (res.code === 401) {
        alert('请先登录')
        window.location.href = './login.html'
        return
    }
      if (res.code === 1) {
        alert('清空购物车成功')
        window.location.reload()
      }
  }
})