<template>
    <div class="plates-menu-item" @click="handleClick">
        <header>
            <div class="header">
                {{header}}
            </div>
            <div class="description">
                {{description}}
            </div>
        </header>
        <div class="icon">
            <slot></slot>
        </div>
        <div class="footer">
            Перейти
        </div>
    </div>
</template>

<script>

    export default {
        name:  "PlatesMenuItem",
        props: ["header", "description", "path"],
        methods: {
            handleClick(){
                this.$router.push({path: this.path});
            }
        }
    }
</script>

<style scoped>
    .plates-menu-item {
        border: 2px solid #505050;
        background: #313131;
        background: linear-gradient(0deg, rgba(2, 0, 36, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%);
        padding: 15px;
        opacity: 1;
        transition: all 0.6s;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
    }

    .plates-menu-item:hover {
        opacity: 0.5;
    }

    header{
        margin: -15px;
        padding: 15px;
        margin-bottom: 10px;
        background: rgba(0, 0, 0, 0.81);
        border-bottom: 2px solid #505050;
        background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(22,22,22,1) 92%, rgba(3,3,3,1) 100%);

    }

    .header {
        text-align: center;
        text-transform: uppercase;
        font-size: 18px;
        color: white;
    }

    .description {
        text-align: center;
    }

    .icon {
        text-align: center;
        padding: 28px;
    }

    .footer {
        text-align: center;
        margin: -15px;
        padding: 7px;
        margin-top: 5px;
        text-transform: uppercase;
        border-top: 2px solid #505050;
        background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(22,22,22,1) 92%, rgba(3,3,3,1) 100%);
    }

    .icon img {
        max-width: 100%;
        height: 100px;
    }
</style>
