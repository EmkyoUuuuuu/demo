
const id = window.localStorage.getItem('id')
const token = window.localStorage.getItem('token')

if (!id) {
  $('.on').addClass('active')
  $('.off').removeClass('active')
}

$.ajax({              //首页登陆验证
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

console.log($GLOBAL_HOME)
const result = $GLOBAL_HOME['goodsFloorData']
$('#navul').html(`<li>${ result[1]['body']['floor_name'] }<div id="nav1"></div></li>
<li>${ result[2]['body']['floor_name'] }<div id="nav2"></div></li>
<li>${ result[3]['body']['floor_name'] }<div id="nav3"></div></li>
<li>${ result[4]['body']['floor_name'] }<div id="nav4"></div></li>
<li>${ result[6]['body']['floor_name'] }<div id="nav5"></div></li>
<li>${ result[7]['body']['floor_name'] }<div id="nav6"></div></li>
<li>${ result[8]['body']['floor_name'] }<div id="nav7"></div></li>
<li>${ result[10]['body']['floor_name'] }<div id="nav8"></div></li>`
)

for(let i = 1 ; i < 2 ; i++){
  let string1 = ''
  for(let j = 0 ; j < 6 ; j++){
    string1 +=`<p data-a="${ i }" data-b="${ j }" data-id="${ result[i]['body']['product_list'][j]['product_id'] }"><img src="${ result[i]['body']['product_list'][j]['img_url'] }"><span>${ result[i]['body']['product_list'][j]['product_name'] }</span></p>`  //导航页页数据来源本地
  }
  $(`#nav${ i }`).html(string1)
}
for(let i = 2 ; i < 5 ; i++){
  let string1 = ''
  for(let j = 0 ; j < 6 ; j++){
    string1 +=`<p data-a="${ i }" data-b="${ j }" data-id="${ result[i]['body']['tab_content'][0]['product_list'][j]['product_id'] }"><img src="${ result[i]['body']['tab_content'][0]['product_list'][j]['img_url'] }"><span>${ result[i]['body']['tab_content'][0]['product_list'][j]['product_name'] }</span></p>`  //导航页页数据来源本地
  }
  $(`#nav${ i }`).html(string1)
}
for(let i = 6 ; i < 9 ; i++){
  let string1 = ''
  for(let j = 0 ; j < 6 ; j++){
    string1 +=`<p data-a="${ i }" data-b="${ j }" data-id="${ result[i]['body']['tab_content'][0]['product_list'][j]['product_id'] }"><img src="${ result[i]['body']['tab_content'][0]['product_list'][j]['img_url'] }"><span>${ result[i]['body']['tab_content'][0]['product_list'][j]['product_name'] }</span></p>`  //导航页页数据来源本地
  }
  $(`#nav${ i-1 }`).html(string1)
}
for(let i = 10 ; i < 11 ; i++){
  let string1 = ''
  for(let j = 0 ; j < 6 ; j++){
    string1 +=`<p data-a="${ i }" data-b="${ j }" data-id="${ result[i]['body']['tab_content'][0]['product_list'][j]['product_id'] }"><img src="${ result[i]['body']['tab_content'][0]['product_list'][j]['img_url'] }"><span>${ result[i]['body']['tab_content'][0]['product_list'][j]['product_name'] }</span></p>`  //导航页页数据来源本地
  }
  $(`#nav${ i-2 }`).html(string1)
}
const videoAll = $GLOBAL_HOME['goodsFloorData'][11]['body']
let string2 =`
<span>${ videoAll['floor_name'] }</span>
`
$('.top').html(string2)
let string3 = ''
videoAll['items'].forEach(item => {
  string3 +=`
    <div><video class="four_video" src="${ item['video_url'] }" poster="${ item['img_url'] }"></video></div>  
  `
})
$('.bottom').html(string3)
$('.four_video').on({
  mouseover:function(){
    $(this).attr('controls','true')
  },
  mouseout:function(){
    $(this).removeAttr('controls')
  }
})




$.ajax({
    url: 'https://floor.jd.com/recommend-v20/focus_monetize/get',
    data:{
      'source':'pc-home',
    },
    dataType:'Jsonp',
    success (res) {    //轮播图8张
      let j = 1
      for(let i in res.data){
        let str = ''
        str =`<a href=""><img src="${ res.data[i][0]['src'] }"></a>`  //详情页数据来源网址
        $('.swiper-slide').eq(j++).html(str)
      }
    }
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


//页面导航
$(window).on('scroll',() => {
  if($(window).scrollTop() > 400){
    $('.pos').css('display','block')
  }else{
    $('.pos').css('display','none')
  }
})

$('.pos').on('click','li',function(){
  if($(this).html() == '返回顶部'){
    $('html,body').animate({scrollTop:0},500)
  }
  if($(this).html() == '手机专区'){
    $('html,body').animate({scrollTop:950},500)
  }
  if($(this).html() == '手表专区'){
    $('html,body').animate({scrollTop:2080},500)
  }
  if($(this).html() == '电视专区'){
    $('html,body').animate({scrollTop:3210},500)
  }
  if($(this).html() == '生活专区'){
    $('html,body').animate({scrollTop:4340},500)
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
    <div id="bannertop">
        <div>
            <span id="caption"></span>
        </div>
    </div>
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

//分区渲染页面
const phoneInfo = {
  current: 1,
  pagesize: 8,
  filter: '',
  sortType: 'id',
  sortMethod: 'ASC',
  category: '手机相机'
}
const watchInfo = {
  current: 1,
  pagesize: 8,
  filter: '',
  sortType: 'id',
  sortMethod: 'ASC',
  category: '钟表眼镜'
}
const tvInfo = {
  current: 1,
  pagesize: 8,
  filter: '',
  sortType: 'id',
  sortMethod: 'ASC',
  category: '大家电'
}
const lifeInfo = {
  current: 1,
  pagesize: 8,
  filter: '',
  sortType: 'id',
  sortMethod: 'ASC',
  category: '邮币乐器'
}

getGoodsList(phoneInfo)
getGoodsList(watchInfo)
getGoodsList(tvInfo)
getGoodsList(lifeInfo)
function getGoodsList(goodslist) {
  $.ajax({
    url: `http://localhost:8888/goods/list`,
    data: goodslist,
    success (res) {
      let str = ''
      res.list.forEach(item => {
      str += `
        <li data-id="${ item.goods_id }">
          <div class="show">
            <img src="${ item.img_big_logo }" alt="">
          </div>
          <div class="info">
            <p class="title">
              ${ item.title }
            </p>
            <p class="price">
                ￥${ item.current_price }
            </p>
            <p class="add">
              <button data-id="${ item.goods_id }">加入购物车</button>
            </p>
          </div>
        </li>
      `
    })
    switch (goodslist){
      case phoneInfo:
        $('.phonelist').html(str);
        $('.left').eq(0).attr('class',phoneInfo.current === 1 ? 'left disable' : 'left')
        $('.right').eq(1).attr('class',phoneInfo.current === res.total ? 'right disable' : 'right')
        $('.total').eq(0).html(phoneInfo.current + ' / ' + res.total)
        $('.goto').eq(0).val(phoneInfo.current)
        $('.goto').eq(0).attr('data-all',res.total)
        break
      case watchInfo:
        $('.watchlist').html(str);
        $('.left').eq(1).attr('class',watchInfo.current === 1 ? 'left disable' : 'left')
        $('.right').eq(3).attr('class',watchInfo.current === res.total ? 'right disable' : 'right')
        $('.total').eq(1).html(watchInfo.current + ' / ' + res.total)
        $('.goto').eq(1).val(watchInfo.current)
        $('.goto').eq(1).attr('data-all',res.total)
        break
      case tvInfo:
        $('.tvlist').html(str);
        $('.left').eq(2).attr('class',tvInfo.current === 1 ? 'left disable' : 'left')
        $('.right').eq(5).attr('class',tvInfo.current === res.total ? 'right disable' : 'right')
        $('.total').eq(2).html(tvInfo.current + ' / ' + res.total)
        $('.goto').eq(2).val(tvInfo.current)
        $('.goto').eq(2).attr('data-all',res.total)
        break
      case lifeInfo:
        $('.lifelist').html(str);
        $('.left').eq(3).attr('class',lifeInfo.current === 1 ? 'left disable' : 'left')
        $('.right').eq(7).attr('class',lifeInfo.current === res.total ? 'right disable' : 'right')
        $('.total').eq(3).html(lifeInfo.current + ' / ' + res.total)
        $('.goto').eq(3).val(lifeInfo.current)
        $('.goto').eq(3).attr('data-all',res.total)
        break
    }
    }
  })
}


//手机分区事件委托
$('.func').eq(0).on('click',function(e){
  if(e.target.className == "psort_item"){
    $('.psort_item').removeClass('active')
    e.target.classList.add('active')

    phoneInfo.sortMethod = e.target.dataset.method

    getGoodsList(phoneInfo)
  }

  if (e.target.className === 'right') {
    phoneInfo.current++
    getGoodsList(phoneInfo)
  }

  if (e.target.className === 'left') {
    phoneInfo.current--
    getGoodsList(phoneInfo)
  }

  if (e.target.className === 'go') {
    let page = e.target.previousElementSibling.value - 0
    const total = e.target.previousElementSibling.dataset.all - 0

    if (!page) page = 1
    if (page < 1) page = 1
    if (page >= total) page = total
    page = parseInt(page)

    phoneInfo.current = page

    getGoodsList(phoneInfo)
  }
})




//手表分区事件委托
$('.func').eq(1).on('click',function(e){
  if(e.target.className == "wsort_item"){
    $('.wsort_item').removeClass('active')
    e.target.classList.add('active')

    watchInfo.sortMethod = e.target.dataset.method

    getGoodsList(watchInfo)
  }

  if (e.target.className === 'right') {
    watchInfo.current++
    getGoodsList(watchInfo)
  }

  if (e.target.className === 'left') {
    watchInfo.current--
    getGoodsList(watchInfo)
  }

  if (e.target.className === 'go') {
    let page = e.target.previousElementSibling.value - 0
    const total = e.target.previousElementSibling.dataset.all - 0

    if (!page) page = 1
    if (page < 1) page = 1
    if (page >= total) page = total
    page = parseInt(page)

    watchInfo.current = page

    getGoodsList(watchInfo)
  }
})


//电视分区事件委托
$('.func').eq(2).on('click',function(e){
  if(e.target.className == "tsort_item"){
    $('.tsort_item').removeClass('active')
    e.target.classList.add('active')

    tvInfo.sortMethod = e.target.dataset.method

    getGoodsList(tvInfo)
  }

  if (e.target.className === 'right') {
    tvInfo.current++
    getGoodsList(tvInfo)
  }

  if (e.target.className === 'left') {
    tvInfo.current--
    getGoodsList(tvInfo)
  }

  if (e.target.className === 'go') {
    let page = e.target.previousElementSibling.value - 0
    const total = e.target.previousElementSibling.dataset.all - 0

    if (!page) page = 1
    if (page < 1) page = 1
    if (page >= total) page = total
    page = parseInt(page)

    tvInfo.current = page

    getGoodsList(tvInfo)
  }
})

//生活分区事件委托
$('.func').eq(3).on('click',function(e){
  if(e.target.className == "lsort_item"){
    $('.lsort_item').removeClass('active')
    e.target.classList.add('active')

    lifeInfo.sortMethod = e.target.dataset.method

    getGoodsList(lifeInfo)
  }

  if (e.target.className === 'right') {
    lifeInfo.current++
    getGoodsList(lifeInfo)
  }

  if (e.target.className === 'left') {
    lifeInfo.current--
    getGoodsList(lifeInfo)
  }

  if (e.target.className === 'go') {
    let page = e.target.previousElementSibling.value - 0
    const total = e.target.previousElementSibling.dataset.all - 0

    if (!page) page = 1
    if (page < 1) page = 1
    if (page >= total) page = total
    page = parseInt(page)

    lifeInfo.current = page

    getGoodsList(lifeInfo)
  }
})

//事件委托到详情页面
$('#navul').on('click','p',function(e){
  const goodsId = this.dataset.id
  const a = this.dataset.a
  const b = this.dataset.b
  console.log(goodsId)
  console.log(a)
  console.log(b)
  window.sessionStorage.setItem('goodsId', goodsId)
  window.sessionStorage.setItem('a', a)
  window.sessionStorage.setItem('b', b)
  window.location.href = './detail.html'
})
$('#catelist').on('click','ol',function(e){
  const goodsId = this.dataset.id
  console.log(goodsId)
    window.sessionStorage.setItem('goodsId', goodsId)
    window.location.href = './detail.html'
})
$('.phonelist').on('click','li',function(e){
  const goodsId = this.dataset.id
    window.sessionStorage.setItem('goodsId', goodsId)
    window.location.href = './detail.html'
})
$('.watchlist').on('click','li',function(e){
  const goodsId = this.dataset.id
    window.sessionStorage.setItem('goodsId', goodsId)
    window.location.href = './detail.html'
})
$('.tvlist').on('click','li',function(e){
  const goodsId = this.dataset.id
    window.sessionStorage.setItem('goodsId', goodsId)
    window.location.href = './detail.html'
})
$('.lifelist').on('click','li',function(e){
  const goodsId = this.dataset.id
    window.sessionStorage.setItem('goodsId', goodsId)
    window.location.href = './detail.html'
})





//点击加入购物车
$('.phonelist,.watchlist,.tvlist,.lifelist').on('click','button',function(e){
  e.stopPropagation()
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
      if (res.code === 401 ||  res.code === 0) {
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
            if(res.code === 1){
              alert('添加商品成功')
            }
          }
        })
      }
    }
  })
})



//五秒后缩小到右下方
setTimeout(() => {
  $('.video').animate({
    width:200,
    height:118,
    right:132,
    top:815
  },2000,'linear')
}, 7000);


