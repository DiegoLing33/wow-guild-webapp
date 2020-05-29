<template>
    <div class="loader-screen" :hidden="hidden">
        <div class="logo-content">
            <div class="main-title">Престиж</div>
            <div class="sub-title">Получение данных World Of Warcraft</div>
        </div>
        <b-container class="loader-wrapper">
            <b-progress :max="max" :value="value" animated></b-progress>
            <div class="loader-text">{{text}}</div>
        </b-container>
        <footer class="mt-3">
            Powered and Developed by <a href="http://ling.black">Yakov Ling</a>
            with uses of <a href="http://develop.battle.net">Battle.net</a> (BLIZZARD ENTERTAINMENT, INC) API
            <br />
            All Rights Reserved &copy; 2020
        </footer>
    </div>
</template>

<script>

    export default {
        name:    "LoaderScreen",
        data() {
            return {
                max:    1,
                value:  1,
                text:   "Получение данных",
                hidden: true,
            }
        },
        async mounted() {

        },
        methods: {
            updateBar(step, max, text) {
                this.hidden = false;
                this.max   = max;
                this.value = step;
                this.text  = text;
            },

            display(visible) {
                this.hidden = !visible;
            }
        }
    }
</script>

<style scoped>
    .loader-screen {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #212121;
        z-index: 100000;
    }

    .logo-content {
        text-align: center;
        margin-top: 100px;
    }

    .main-title {
        font-size: 40px;
        text-transform: uppercase;
        font-weight: 100;
        color: white;
    }

    .sub-title {
        text-align: center;
        color: #e7e7e7;
    }

    .loader-text {
        color: #e7e7e7;
    }

    .loader-wrapper {
        margin-top: 10px;
        max-width: 600px;
    }
</style>
