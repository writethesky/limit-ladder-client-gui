<template>
    <div class="rule-page">
        <div class="tip">*规则修改后重启方可生效</div>
        <div class="rules">
            <div class="rule-row" :class="[rule.ruleClass]" :key="i" v-for="(rule, i) in rules" @dragstart="drag(i)" @dragover="allowDrop($event, i)" @drop="drop(i)" :draggable="0 != i">
                <div v-if="'view' == rule.type" class="rule">{{rule.content}}</div>
                <div v-if="'edit' == rule.type" class="rule np">
                    <input type="" name="" placeholder="*代表通配，如：*.google.com" v-model="rule.content">
                </div>
                <div class="rule-tool" :class="[rule.spread]">
                    <div v-if="'view' == rule.type" @click="remove(i)">删除</div>
                    <div v-if="'edit' == rule.type" @click="save(i)">保存</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'rule',
    data(){
        return {
            rules: [
                {
                    content: "",
                    spread: '',
                    ruleClass: '',
                    type: "edit",
                },
            ],
            dragIndex: 0,
        }
    },
    created(){
        window.getRules((data) => {
            let arr = data.split("\n")
            for(let i in arr){
                this.rules.push({
                    content: arr[i],
                    spread: '',
                    ruleClass: '',
                    type: "view",
                })
            }
        })
    },
    methods: {
        spreading(i){
            this.rules[i].spread = 'spread'
            setTimeout(() => {
                this.rules[i].spread = ''
            }, 500)
        },
        save(i){
            this.spreading(i)
            let tmp = this.rules.shift();
            let nRule = {
                content: tmp.content,
                spread: '',
                ruleClass: 'from-top',
                type: "view"
            }
            this.rules.unshift(nRule)

            tmp.content = "";
            this.rules.unshift(tmp)
            this.submit()
            setTimeout(()=>{
                nRule.ruleClass = "";
            }, 500)
        },
        remove(i){
            this.rules[i].ruleClass = 'to-right'
            setTimeout(() => {
                this.rules.splice(i, 1)
                this.submit()
            }, 500)
        },
        drag(i){
            // alert(i)
            this.dragIndex = i;
        },
        allowDrop(ev, i){
            if(0 != i && this.dragIndex != i){
                ev.preventDefault();
            }
        },
        drop(i){
            let tmp = this.rules[this.dragIndex]
            this.rules.splice(this.dragIndex, 1)
            this.rules.splice(i, 0, tmp)
            setTimeout(()=>{
                this.submit()
            }, 0)
        },
        submit(){
            let rulesString = "";
            for(let i in this.rules){
                if (0 == i) {
                    continue;
                }

                rulesString += this.rules[i].content

                if (i != this.rules.length - 1){
                    rulesString += "\n"
                }
            }

            window.setRules(rulesString)
        }
    }
}
</script>

<style type="text/css" scoped="" lang="scss">
.tip {
    height: 10px;
    font-size: 10px;
    margin-top: -14px;
    margin-bottom: 4px;
    color: #ffae74;
}
.rules {
    height: 380px;
    overflow: auto;
    .rule-row {
        width: 260px;
        margin: auto;
        overflow: hidden;
        .rule, .rule-tool {
            float: left;
            height: 20px;
            line-height: 20px;
            margin: 4px 0;
            background: #f3f3f3;
            font-size: 12px;
        }
        .rule {
            width: 210px;
            cursor: move;
            overflow: auto;
            white-space: nowrap;
            padding: 0 4px;
            &.np {
                padding: 0;
            }
            input {
                background: #f3f3f3;
                height: 100%;
                width: 100%;
                display: block;
                float: left;
                border: 1px dashed #ccc;
                outline: none;
                padding: 0 4px;
                &:focus {
                    border-color: #41b982;
                }
            }
        }
        .rule-tool {
            width: 49px;
            font-size: 10px;
            margin-left: 1px;
            cursor: pointer;
            user-select: none;
        }
    }
}
</style>