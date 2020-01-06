import Vue from 'vue'
import marked from 'marked'
import hljs from 'highlight.js'
// import '@/assets/css/monokai_sublime.css'
import 'highlight.js/styles/atom-one-dark.css'
// import javascript from 'highlight.js/lib/languages/javascript';
// hljs.registerLanguage('javascript', javascript);
// import '@/assets/css/googlecode.css'

Vue.directive('highlight',function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block)=>{
      hljs.highlightBlock(block)
    })
})

var rendererMD = new marked.Renderer()
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code,lang) {
        return hljs.highlightAuto(code).value;
    }
})

export default marked
