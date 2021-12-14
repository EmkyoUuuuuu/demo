
$('form').on('submit', e => {
  e.preventDefault()

  const name = $('.username').val()
  const pwd = $('.password').val()
  if (!name || !pwd) {
    $('.error').html("请完整填写表单")
    $('.error').css('display','block')
  }

  const info = {
    username:name,
    password:pwd
  }

  $.ajax({
    url: 'http://localhost:8888/users/login',
    method: 'POST',
    data: info,
    success (res) {
      if (res.code === 0 ) {
        $('.error').html("用户名或密码输入错误")
        $('.error').css('display','block')
      } else {
        window.localStorage.setItem('id', res.user.id)
        window.localStorage.setItem('token', res.token)
        let i = 3
        let timer =  setInterval(() => {
          $('.error').html(`登录成功, ${ i-- }s后自动跳转首页`)
        }, 1000);
        $('.error').css('display','block')
        setTimeout(() => {
          clearTimeout(timer)
          window.location.href = './index.html'
        }, 3000);
      }
    }
  })
})
  