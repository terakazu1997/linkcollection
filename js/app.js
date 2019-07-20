var links=null;
Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
    }
})
var app  = new Vue({
    el:"#app",
    data:{
        keyword:'',
        linkLists:null
    },      
    watch: {
        keyword: function() {
            this.getResult()
        }
    },
    mounted(){
        axios
            .get("../asset/link.json")
            .then(response => (links =this.linkLists= response.data.links))
    },
    methods:{
        getResult(){
            this.linkLists = [];
            if(this.keyword === ''){
                this.linkLists = links;
                return
            }
            for(var i =0;i<links.length;i++){
                var replaceKeyword = this.replaceText(this.keyword);
                var replaceLinkTitle = this.replaceText(links[i].linkTitle);
                if(replaceLinkTitle.match(replaceKeyword)){
                    this.linkLists.push(links[i])
                }
            }
        },
        replaceText:function(str){
            return str.replace(/[\u30a1-\u30f6Ａ-Ｚａ-ｚ０-９]/g, function(match) {
                var chr = str.match(/[\u30a1-\u30f6]/g)?match.charCodeAt(0) - 0x60 : match.charCodeAt(0) - 0xFEE0;
                return String.fromCharCode(chr)
            })
        }
    }
})