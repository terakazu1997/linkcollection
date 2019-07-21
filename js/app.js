var links=null;
var headComponent = {
    props: ['keyword'],
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
                                        v-bind:value="keyword"
                                        v-on:input="$emit('input', $event.target.value)"
                                        v-focus></li>
                            <li class="search"><a href="#"><img src="img/search.svg"></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    `
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
    mounted(){
        axios
            .get("../asset/link.json")
            .then(response => (links =this.linkLists= response.data.links))
    },
    components:{
        'head-component':headComponent
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