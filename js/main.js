function writeCss(prefix, code, fn){
  let domCode = document.querySelector('#code')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
    styleTag.innerHTML = prefix +  code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 70)
}
function writeMarkdown(markdown, fn){
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 35)
}

var css1 = `/* 
 * 面试官你好，我是高学威
 * 只用文字作做我介绍太单调了 (﹀_﹀)╭
 * 我就用代码来介绍吧！！！
 * 首先准备一些样式
 */
*{
  transition: all 1s;
}
html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}
/* 我需要一点代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }
/* 加一个呼吸效果 */
#code{
  animation: breath 1s infinite alternate-reverse;
  
}
/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}
#paper > .content {
 display: block;
}
/* 于是我就可以在白纸上写字了，请看右边 */
`
var css2 = `
/*
*接下来使用一个优秀的库marked.js
*把Markdown 变成 HTML
*/
`
var md =`

# 自我介绍

我叫 高学威
1995 年 9 月出生
大庆技师学院 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍
熟悉 JavaScript CSS

# 项目介绍

1. 苹果轮播
2. 网站导航
3. 网页画板
4. 自动简历
5. 网站简历

# 联系方式

- QQ 834990270 
- Email 834990270@qq.com
- 手机 1349395119

`
let css3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`

writeCss('', css1, ()=>{ // writeCss call the function
  createPaper(() => {
    writeMarkdown(md, ()=> {
      writeCss(css1, css2, ()=>{
        convertMarkdownToHtml(()=>{
          writeCss(css1 + css2, css3, ()=> {
          })
        })
      })
    })
  })
})




function createPaper(fn){
  var paper = document.createElement('div') 
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function convertMarkdownToHtml(fn){
  var div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}
