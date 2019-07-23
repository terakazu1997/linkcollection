var links = getLinks().links;
var headComponent = {
    template: `
        <header>
            <div id ="header">
                <div id="headerInner">
                    <h1>リンク集</h1>
                    <nav>
                        <ul id="nav" class="clearfix">
                            <li class ="headLink" id = "proStart">
                                <a href="#">ヘッダーリンク1</a>
                            </li>
                            <li class ="headLink" id ="note"><a href="#">ヘッダーリンク2</a></li>
                            <li class ="headLink" id ="team"><a href="#">ヘッダーリンク3</a></li>
                            <li class="search">
                                <input id="searchText" placeholder="リンク" name="searchText" type="text" 
                                        v-model="computedKey"
                                        v-focus></li>
                            <li class="search"><a href="#"><img src="img/search.svg"></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    `,
    computed: {
        computedKey: {
            get() {
            },
            set(val) {
                this.$emit("input", val);
            }
        }

    }
}
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
    components:{
        'head-component':headComponent
    },
    mounted(){
        this.linkLists=getLinks().links
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
            return str.replace(/[\u30a1-\u30f6a-zａ-ｚ０-９]/g, function(match) {
                if(str.match(/[\u30a1-\u30f6]/g)){
                    return String.fromCharCode(match.charCodeAt(0) - 0x60)
                }
                var chr = str.match(/[a-za-z]/g)? match.charCodeAt(0) & ~32: match.charCodeAt(0) - 0xFEE0;
                return String.fromCharCode(chr)
                
            })
        }
    }
})