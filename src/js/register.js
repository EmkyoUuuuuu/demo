
$('form').on('submit', e => {
  e.preventDefault()

  const info = {
    username: $('.username').val(),
    password: $('.password').val(),
    rpassword: $('.rpassword').val(),
    nickname: $('.nickname').val()
  }

  if (!info.username || !info.password || !info.rpassword || !info.nickname) return alert('请完整填写表单')

  if (info.password !== info.rpassword) return alert('两次密码不一样')

  $.ajax({
    url: 'http://localhost:8888/users/register',
    method: 'POST',
    data: info,
    success (res) {
      if (res.code === 0 ) {
        $('.error').style.display = 'block'
      } else {
        alert('注册成功, 点击确定跳转到登录页')
        window.location.href = './login.html'
      }
    }
  })
})
