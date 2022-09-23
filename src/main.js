const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)  //  parse()把字符串变成对象
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn'},
    { logo: 'B', url: 'https://bilibili.com'}
]


//URL简化  清除 https://  及www.开头的字母
const simplifyUrl = (url)=>{
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/,'') //删除 / 开头的内容
}

    const render = () => {
        $siteList.find('li:not(.last)').remove()
        hashMap.forEach((node,index) => {
            const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-Close"></use>
</svg>
</div>
</div>    
</li>`).insertBefore($lastLi)
            $li.on('click', ()=>{
                window.open(node.url)
            })
            $li.on('click','.close',(e)=>{
                e.stopPropagation() //阻止冒泡
                console.log(hashMap);
                hashMap.splice(index, 1)
                render()
            })
        })
}


render()

$('.addButton').on('click', ()=>{
    let url = window.prompt('请问你要添加的网址是什么？')
    if(url.indexOf('http')!==0){
        url = 'https://' + url
    }
    console.log(url)

    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    });

    render()
});
window.onbeforeunload = () =>{
    console.log('页面要关闭了')
    const string = JSON.stringify(hashMap)  //JSON.stringify()可以把对象变成字符串
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e)=>{
    const {key} = e
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})