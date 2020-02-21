<template>
  <div class="about">
    <div class="local-port" :class="{flashing: flash.port}">
        <span>本地端口:</span>
        <input class="" type="" name="" placeholder="1333" v-model="settings.localPort">
    </div>
    
    <div class="ip-port">
        <div class="input ip" :class="{flashing: flash.remoteIP}">
            <span class="tip">服务器IP</span>
            <input type="" name="" placeholder="服务器IP" v-model="settings.remoteIP">
        </div>
        
        <span>:</span>
        <div class="input port" :class="{flashing: flash.remotePort}">
            <span class="tip">端口</span>
            <input type="" name="" placeholder="端口" v-model="settings.remotePort">
        </div>
        
    </div>
    
    <div class="input"  :class="{flashing: flash.phone}">
        <span class="tip">账户名</span>
        <input type="" name="" placeholder="请输入账户名" v-model="settings.phone">
    </div>

    <div class="input" :class="{flashing: flash.password}">
        <span class="tip">密码</span>
        <input type="password" name="" placeholder="请输入密码" v-model="settings.password">
    </div>
    
    
    <button @click="save" :class="[spread]">保存</button>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
export default {
    name: 'login',
    data(){
        return {
            spread: '',
            flash: {
                port: false,
                remoteIP: false,
                remotePort: false,
                phone: false,
                password: false,
            }
        }
    },
    computed: {
        ...mapState([
            'settings'
        ])
    },
    created(){
        this.flashing()
    },
    methods: {
        spreading(){
            this.spread = 'spread'
            setTimeout(() => {
                this.spread = ''
            }, 500)
        },
        flashing(){
            for (let i in this.$store.state.settings) {
                if("" == this.$store.state.settings[i]){
                    this.flash[i] = true
                }
            }
        },
        save(){
            this.spreading()
            setTimeout(() => {
                this.$router.push({
                    name: 'home'
                });
            }, 500)
        },
    }
    
}

</script>

<style scoped lang="scss">





.input{
    position: relative;
	width: 260px;
	height: 40px;
	display: block;
	margin: 10px auto;
	font-size: 14px;
    border: 1px solid #40b881;

    .tip {
        position: absolute;
        top: -4px;
        margin: 0;
        padding: 0 4px;
        font-size: 8px;
        width: unset;
        line-height: 1;
        left: 6px;
        background: #fff;
        color: #40b881;
    }
}
input{
    width: 100%;
    height: 38px;
    display: block;
    padding: 0 10px;
    font-size: 14px;
    border: none;
}

.local-port {
    overflow: hidden;
    width: 120px;
    margin: auto;
    margin-bottom: 16px;

    input {
        width: 60px;
        height: 30px;
        float: left;
        margin: 0;
        border: 0;
        padding-right: 0;
        padding-top: 8px;
        border-bottom: 1px solid #ccc;
        &:focus {
            outline: none;
        }
    }

    span {
        width: 60px;
        display: block;
        float: left;
        line-height: 40px;
    }
}

.ip-port {
    width: 260px;
    margin: auto;
    overflow: hidden;
    .input {
        float: left;

        &.ip {
            width: 170px;
        }
        &.port {
            width: 70px;
        }
    }
    span {
        display: block;
        float: left;
        width: 20px;
        text-align: center;
        line-height: 40px;
        margin-top: 10px;
    }
}

button {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	outline: none;
	margin: 10px;
	background: #40b882;
    color: #fff;
    font-size: 12px;
    border: none;
    padding: 0;
}



</style>
