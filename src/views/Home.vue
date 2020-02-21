<template>
  <div class="home">
    <div class="switch" :class="[onOff, spread]" @click="start">
        <div></div>
    </div>
    <div class="log-box">
        <div v-bind:key="i" v-for="(log, i) in logs">{{log}}</div>
        <div v-bind:key="logs.length + j" v-for="j in 10-logs.length"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// window.start = (callback) => {
//     callback("a")
//     callback("a")
//     callback("a")
//     callback("a")
// } 
// window.stop = () => {}
export default {
    name: 'home',
    data(){
        return {
            spread: '',
            logs: [],
            allowClick: true,
        }
    },
    computed: {
        ...mapState([
            'startSwitch'
        ]),
        onOff(){
            return this.$store.state.startSwitch ? 'off': 'on'
        }
    },
    created(){
        
        for (let i in this.$store.state.settings) {
            if("" == this.$store.state.settings[i]){
                this.$router.push({
                    name: 'login'
                });
                break;
            }
        }
    },
    methods: {
        start(){
            if (!this.allowClick) {
                return
            }
            if (this.startSwitch){
                this.stop()
                return
            }

            this.spreading("off")
            window.start(this.$store.state.settings.phone, this.$store.state.settings.password, this.$store.state.settings.localPort, this.$store.state.settings.remoteIP + ":" + this.$store.state.settings.remotePort, (data) => {
                this.addLog(data)
            })
        },
        stop(){
            this.spreading("on")
            window.stop()
        },
        spreading(onOff){
            this.allowClick = false
            this.spread = 'spread'
            setTimeout(() => {
                this.spread = ''
                this.$store.state.startSwitch = 'on' == onOff ? false : true
                this.allowClick = true
            }, 500)
        },
        addLog(data){
            if(this.logs.length >= 10){
                this.logs.shift()
            }
            this.logs.push(data)
        }
    }
  
}


</script>
<style type="text/css">
* {
    box-sizing: border-box;
}
.spread {
    /*transform:scale(1.1);*/
    animation: circle-opacity .5s ease 1;
}

.flashing {
    animation: flash-opacity 1s ease 3;
}

.to-right {
    animation: to-right .5s ease 1;
}
.from-top {
    animation: from-top .5s ease 1;
}

@keyframes circle-opacity {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(2);
    }
}

@keyframes flash-opacity {
    from {
        border-color: #fff;
    }
    to {
        border-color: red;
    }
}

@keyframes to-right {
    from {
        opacity: 1;
        position: relative;
        left: 0;
    }
    to {
        opacity: 0;
        position: relative;
        left: 200px;
    }
}

@keyframes from-top {
    from {
        opacity: 0;
        position: relative;
        top: -20px;
    }
    to {
        opacity: 1;
        position: relative;
        top: 0px;
    }
}

</style>
<style scoped="" lang="scss">
.switch {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #81ff81;
    margin: 20px auto 50px;
    overflow: hidden;

    div {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #00e000;
        margin: 10px auto;
        overflow: hidden;
    }

    &.off {
        background: #ff9898;
        div {
            background: #ff3636;
        }
    }

}

.log-box {
    width: 260px;
    height: 200px;
    margin: auto;
    border: 2px dashed #bdecd2;
    div {
        height: 13.6px;
        background: #efefef;
        margin: 3px;
        display: block;
        clear: both;
        float: left;
        width: 250px;
        font-size: 10px;
        line-height: 13.6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}




</style>
