
$('form').on('submit', e => {
  e.preventDefault()

  const info = {
    username: $('.username').val(),
    password: $('.password').val(),
    rpassword: $('.rpassword').val(),
    nickname: $('.nickname').val()
  }

  if (!info.username || !info.password || !info.rpassword || !info.nickname){
    $('.error').html("请完整填写，便于您注册哦")
    $('.error').css('display','block')
    return
  }

  if (info.password !== info.rpassword){
    $('.error').html("俩次密码不一样哦，细心一些")
    $('.error').css('display','block')
    return
  }

  $.ajax({
    url: 'http://localhost:8888/users/register',
    method: 'POST',
    data: info,
    success (res) {
      if (res.code === 0 ) {
        $('.error').html("注册失败, 该用户名已经被占用, 请重试")
        $('.error').css('display','block')
      } else {
        let i = 3
        let timer =  setInterval(() => {
          $('.error').html(`注册成功, ${ i-- }s后自动跳转登录页`)
        }, 1000);
        $('.error').css('display','block')
        setTimeout(() => {
          clearTimeout(timer)
          window.location.href = './login.html'
        }, 3000);
      }
    }
  })
})

