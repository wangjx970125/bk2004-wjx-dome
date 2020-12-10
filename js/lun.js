
    const ol = document.querySelector('ol')
    
    const inp = document.querySelector('input')

    inp.addEventListener('input', function () {
        const value = this.value.trim()
        if(!value) return

        const scr = document.createElement('script')
        const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1450,33058,31660,32970,33099,33101,32938,26350,33198&wd=${ value }&req=2&csor=5&pwd=aiqi&cb=bindHtml&_=1607346293628`
        scr.src = url
        document.body.appendChild(scr)

        scr.remove()
    })

    function bindHtml(res){
        if(!res.g){
            ol.classList.remove('active')
            return
        } 

        let str = ''
        for(let i = 0 ; i < res.g.length; i++){
            str +=`
                <li>${ res.g[i].q }</li>
            `
        }
        ol.innerHTML = str
        ol.classList.add('active')
    }