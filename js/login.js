$(function (){
    //使用valid阿塔
    $('#login').validate({
        rules:{
            username:{
                required:true,
                minlength:5,
                maxlength:10
            },
            password:{
                required:true,
                minlength:6,
                maxlength:18
            },
            checkbox:{
                required:true
            }
        },
        messages:{
            username:{
                required:'请填写用户名',
                minlength:'不得少 5 个字符',
                maxlength:'不得多于 10 个字符'
            },
            password:{
                required:'请填写密码',
                minlength:'不得少 6 个字符',
                maxlength:'不得多于 18 个字符'
            },
            checkbox:{
                required:'请同意'
            }
        },
        submitHandler(form){
            //表单提交
            const info = $(form).serialize()
            
            //发送请求到后端
            $.post('./server/login.php',info,null,'json').then(res => {

                if(res.code === 0){
                    $('.login_error').removeClass('hide')
                }else if(res.code === 1){

                    setCookie('nickname',res.nickname,60 * 60 * 24 * 7)
                    
                    window.location.href = './index.html'

                }

            })
        }
    })
})