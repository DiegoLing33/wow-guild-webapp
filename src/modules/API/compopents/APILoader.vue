<template>
    <div class="frame" :hidden="!$store.getters.shouldLoaderDisplay">
        <div class="m-title">Престиж</div>
        <div class="s-title">Получение данных World Of Warcraft</div>
        <div class="loader-text">
            {{ $store.getters.loaderText }} {{ $store.getters.loaderCurrent }} / {{ $store.getters.loaderMax }}
        </div>
        <b-progress
            :max="$store.getters.loaderMax"
            :value="$store.getters.loaderCurrent"
            animated></b-progress>
    </div>
</template>

<script>
export default {
    name: "APILoader"
}
</script>

<style scoped lang="scss">
@-webkit-keyframes fadeInFromNone {
    0% {
        opacity: 0.7;
    }

    50% {
        opacity: 0.86;
    }

    100% {
        opacity: 0.7;
    }
}

@-moz-keyframes blink {
    0% {
        opacity: 0.7;
    }

    50% {
        opacity: 0.86;
    }

    100% {
        opacity: 0.7;
    }
}

@-o-keyframes blink {
    0% {
        opacity: 0.7;
    }

    50% {
        opacity: 0.86;
    }

    100% {
        opacity: 0.7;
    }
}

@keyframes blink {
    0% {
        opacity: 0.7;
    }

    50% {
        opacity: 0.86;
    }

    100% {
        opacity: 0.7;
    }
}

.frame {
    opacity: 0.6;
    position: fixed;
    bottom: 15px;
    right: 15px;
    width: 400px;
    background-color: #16181b;
    padding: 15px;
    box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.5);

    -webkit-animation: blink 2s infinite;
    -moz-animation: blink 2s infinite;
    -o-animation: blink 2s infinite;
    animation: blink 2s infinite;
    z-index: 99999;
}

.m-title {
    font-size: 30px;
    text-transform: uppercase;
    font-weight: 100;
    color: white;
}

.s-title {
    color: #e7e7e7;
    margin-bottom: 10px;
}

.loader-text {
    color: #e7e7e7;
}

.loader-wrapper {
    margin-top: 10px;
    max-width: 600px;
}
</style>