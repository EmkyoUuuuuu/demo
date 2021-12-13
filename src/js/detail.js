
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
    if (res.code === 401 ||  res.code === 5 ) {
      $('.on').addClass('active')
      $('.off').removeClass('active')
    } else {
      $('.nickname').html(res.info.nickname)
      $('.on').removeClass('active')
      $('.off').addClass('active')
    }
  }
})

$('.logout').on('click', async () => {         //首页注销登录
  const res = await $.ajax({         //需要封装成Promise形式
    url: 'http://localhost:8888/users/logout',
    data: { id },
  })
  
  if (res.code === 1) {
    window.localStorage.removeItem('id')
    window.localStorage.removeItem('token')
    window.location.replace('./login.html')
  }
})

const result = $GLOBAL_HOME['goodsFloorData']
$('#navul').html(`<li id="all">全部商品<ul id="catelist"></ul></li>
<li>${ result[1]['body']['floor_name'] }<div id="nav1"></div></li>
<li>${ result[2]['body']['floor_name'] }<div id="nav2"></div></li>
<li>${ result[3]['body']['floor_name'] }<div id="nav3"></div></li>
<li>${ result[4]['body']['floor_name'] }<div id="nav4"></div></li>
<li>${ result[6]['body']['floor_name'] }<div id="nav5"></div></li>
<li>${ result[7]['body']['floor_name'] }<div id="nav6"></div></li>
<li>${ result[8]['body']['floor_name'] }<div id="nav7"></div></li>
<li>${ result[10]['body']['floor_name'] }<div id="nav8"></div></li>`
)

console.log(result[1]['body']['product_list'])
for(let i = 1 ; i < 2 ; i++){
  let string1 = ''
  for(let j = 0 ; j < 6 ; j++){
    string1 +=`<p data-id="${ result[i]['body']['product_list'][j]['product_id'] }"><img src="${ result[i]['body']['product_list'][j]['img_url'] }"><span>${ result[i]['body']['product_list'][j]['product_name'] }</span></p>`  //导航页页数据来源本地
  }
  $(`#nav${ i }`).html(string1)
}
for(let i = 2 ; i < 5 ; i++){
  let string1 = ''
  for(let j = 0 ; j < 6 ; j++){
    string1 +=`<p data-id="${ result[i]['body']['tab_content'][0]['product_list'][j]['product_id'] }"><img src="${ result[i]['body']['tab_content'][0]['product_list'][j]['img_url'] }"><span>${ result[i]['body']['tab_content'][0]['product_list'][j]['product_name'] }</span></p>`  //导航页页数据来源本地
  }
  $(`#nav${ i }`).html(string1)
}
for(let i = 6 ; i < 9 ; i++){
  let string1 = ''
  for(let j = 0 ; j < 6 ; j++){
    string1 +=`<p data-id="${ result[i]['body']['tab_content'][0]['product_list'][j]['product_id'] }"><img src="${ result[i]['body']['tab_content'][0]['product_list'][j]['img_url'] }"><span>${ result[i]['body']['tab_content'][0]['product_list'][j]['product_name'] }</span></p>`  //导航页页数据来源本地
  }
  $(`#nav${ i-1 }`).html(string1)
}
for(let i = 10 ; i < 11 ; i++){
  let string1 = ''
  for(let j = 0 ; j < 6 ; j++){
    string1 +=`<p data-id="${ result[i]['body']['tab_content'][0]['product_list'][j]['product_id'] }"><img src="${ result[i]['body']['tab_content'][0]['product_list'][j]['img_url'] }"><span>${ result[i]['body']['tab_content'][0]['product_list'][j]['product_name'] }</span></p>`  //导航页页数据来源本地
  }
  $(`#nav${ i-2 }`).html(string1)
}

$("#all").on({
    mousemove:function(){
        $('#catelist').css('display','block')
    },
    mouseout:function(){
        $('#catelist').css('display','none')
    }
})

$.ajax({
    url: 'http://localhost:8888/goods/category',
    success (res) {    //轮播图上面分类数据
      let str = ''
      for(let i = 2 ; i <= 11 ; i++){
        str +=`<li>${ res.list[i] }</li>`  
      }
      str+=`
      <div class="bannerlist">
      <div id="bannerbottom">
        <img src="https://misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/img/2ff7a1a01305c5081d75f15fa6f9b223.gif" alt="">
      </div>
  </div>`
      $('#catelist').html(str)
    }
  })
  
  $('#catelist').on('mouseover','li',function(e){
    const info = e.target.innerHTML
    $('#caption').html(info)
  
    $.ajax({
      url: `http://localhost:8888/goods/list`,
      data: {
        current: 1,
        pagesize: 12,
        category: info,
      },
      headers: {'authorization':token },
      success (res) {
        let str = ''
        for(let i in res.list){
          str +=`<ol data-id="${ res.list[i]['goods_id'] }">
                  <img src="${ res.list[i]['img_big_logo'] }">
                  <span>${ res.list[i]['title'] }</span>
                </ol>`
        }
        $('#bannerbottom').html(str)
      }
    })
  })

//搜索引擎
$('input').on('keyup',function(e){
  if(!e.target.value) {
    $('#search').css('display','none')
    return
  }

  const val = e.target.value
  $.ajax({
    url: `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=35264,35105,31254,35239,35456,34584,34505,26350,35209,35311&wd=${ val }&req=2&csor=1&`,
    dataType:'Jsonp',
    success (res) {
      let str = ''
      for(let i in res.g){
        str +=`<li>${ res.g[i]['q'] }</li>`
      }
      $('#search').html(str).css('display','block')

    }
})
})

const goods_id = window.sessionStorage.getItem('goodsId')
const a = window.sessionStorage.getItem('a')
const b = window.sessionStorage.getItem('b')
console.log(goods_id)
console.log(a)
console.log(b)
$.ajax({
  url: `http://localhost:8888/goods/item`,
  data:{id:goods_id},
  success (res) {
    if(res.code === 2){
      console.log($GLOBAL_HOME)
      const result = $GLOBAL_HOME['goodsFloorData']
        if(a === '1'){
          let str = ''
          str +=`
              <div class="left">
                  <img src="${ result[a]['body']['product_list'][b]['img_url'] }" alt="">
                  <div class="mask"></div>
                  <div class="enlarge">
                  <img src="${ result[a]['body']['product_list'][b]['img_url'] }" alt="">
                  </div>      
              </div>
              <div class="right">
                  <p class="title">${ result[a]['body']['product_list'][b]['product_name'] }</p>
                  <p class="description">${ result[a]['body']['product_list'][b]['product_brief'] }</p>
                  <div class="pay">
                      <span class="new">折扣价:￥${ result[a]['body']['product_list'][b]['product_price'] }</span>
                      <span class="old">原价:￥${ result[a]['body']['product_list'][b]['product_org_price'] }</span>
                      <span class="timer">距结束:  <span></span>天<span></span>小时<span></span>分<span></span>秒</span>
                  </div>
                  <button class="add" data-id="${ result[a]['body']['product_list'][b]['product_id'] }">添加购物车</button>
                  <button class="buy">立即购买</button>
              </div>`
              $('.goodlist').html(str)
        }else{
          let str = ''
          str +=`
              <div class="left">
                  <img src="${ result[a]['body']['tab_content'][0]['product_list'][b]['img_url'] }" alt="">
                  <div class="mask"></div>
                  <div class="enlarge">
                  <img src="${ result[a]['body']['tab_content'][0]['product_list'][b]['img_url'] }" alt="">
                  </div>      
              </div>
              <div class="right">
                  <p class="title">${ result[a]['body']['tab_content'][0]['product_list'][b]['product_name'] }</p>
                  <p class="description">${ result[a]['body']['tab_content'][0]['product_list'][b]['product_brief'] }</p>
                  <div class="pay">
                      <span class="new">折扣价:￥${ result[a]['body']['tab_content'][0]['product_list'][b]['product_price'] }</span>
                      <span class="old">原价:￥${ result[a]['body']['tab_content'][0]['product_list'][b]['product_org_price'] }</span>
                      <span class="timer">距结束:  <span></span>天<span></span>小时<span></span>分<span></span>秒</span>
                  </div>
                  <button class="add" data-id="${ result[a]['body']['tab_content'][0]['product_list'][b]['product_id'] }">添加购物车</button>
                  <button class="buy">立即购买</button>
              </div>
                  `
              $('.goodlist').html(str)

        }

      }else{
        console.log(res)
        let str = ''
        str +=`
        <div class="left">
            <img src="${ res.info.img_big_logo }" alt="">
            <div class="mask"></div>
            <div class="enlarge">
            <img src="${ res.info.img_big_logo }" alt="">
            </div>      
        </div>
        <div class="right">
            <p class="title">${ res.info.category }</p>
            <p class="description">${ res.info.title }</p>
            <div class="pay">
                <span class="new">折扣价:￥${ res.info.current_price }</span>
                <span class="old">原价:￥${ res.info.price - 100 }</span>
                <span class="timer">距结束:  <span></span>天<span></span>小时<span></span>分<span></span>秒</span>
            </div>
            <button class="add" data-id="${ res.info.goods_id }">添加购物车</button>
            <button class="buy">立即购买</button>
        </div>
            `
            let str2 = ''
            str2 += `
            <div class="intorduce">${ res.info.goods_introduce }</div>
        `
        $('.goodlist').html(str)
        $('.introduce').html(str2)
      }
    }
})

$(window).ajaxStop(function(){

  setInterval(function(){
	var timeing=new Date();
	var time=new Date(2022,0,1,0,0,0);
        var num=time.getTime()-timeing.getTime();
        
        var day=parseInt(num/(24*60*60*1000));			
        num=num%(24*60*60*1000);
        var hour=parseInt(num/(60*60*1000));            
        num=num%(60*60*1000);
        var minute=parseInt(num/(60*1000));
        num=num%(60*1000);
        var seconde=parseInt(num/1000)
        $('.timer').find('span').eq(0).html(day)
        $('.timer').find('span').eq(1).html(hour)
        $('.timer').find('span').eq(2).html(minute)
        $('.timer').find('span').eq(3).html(seconde)
        },1000)

  //点击加入购物车
$('.add').on('click',function(e){
  console.log(this.dataset.id)
  const goodsId = this.dataset.id

  if (!id) {
    alert('请登陆后进行购物,谢谢合作')
    return
  }

  $.ajax({
    url: 'http://localhost:8888/users/info?id=' + id,
    headers: {'authorization':token },
    success (res) {
      if (res.code === 401) {
        alert('登陆已过期，请重新登录后进行购物，谢谢您光临')
      } else {
        $.ajax({
          url: `http://localhost:8888/cart/add`,
          data: {
            id,
            goodsId
          },
          method:'POST',
          headers: {'authorization':token },
          success (res) {
            if(res.code === 0){
              alert('小米商品没有库存哦,别点啦')
            }
            if(res.code === 1){
              alert('添加商品成功')
            }
          }
        })
      }
    }
  })
})

//点击购买
$('.buy').on('click',function(){
  alert('假装购买成功了呗')
})
})
