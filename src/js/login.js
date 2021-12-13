
$('form').on('submit', e => {
  e.preventDefault()

  const name = $('.username').val()
  const pwd = $('.password').val()
  if (!name || !pwd) return alert('请完整填写表单')

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
        $('.error').css('display','block')
      } else {
        window.localStorage.setItem('id', res.user.id)
        window.localStorage.setItem('token', res.token)
        alert('注册成功, 点击确定跳转到登录页')
        window.location.href = './index.html'
      }
    }
  })
})
  