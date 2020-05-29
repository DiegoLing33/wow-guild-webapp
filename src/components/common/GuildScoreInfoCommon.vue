<template>
    <div class="mb-3">
        <b-button block v-b-toggle.what-is-gs>Что такое Guild Score?</b-button>
        <b-collapse id="what-is-gs" class="mt-2">
            <b-card>
                <h3>Терминология</h3>
                <ul>
                    <li>
                        <b>Guild Score (GS)</b> - гильдейские очки, которые участник гильдии получают во время игры в гильдии
                    </li>
                    <li>
                        <b>Week Guild Score (WGS)</b> - количество гильдейских очков, которые участник гильдии получили на этой неделе
                    </li>
                    <li>
                        <b>Most Valuable Guild Player (MVGP)</b> - игрок, который получил наибольшее количество гильдейских очков за активную неделю
                    </li>
                </ul>

                <h3 class="mt-3">Как получить Guild Score?</h3>
                <ul>
                    <li>
                        Проходите подземелья сложности Mythic+! Достигайте новых высот, закрывая подземелья в более сложном режиме. Играйте с гильдейской командой, так вы сможете получить больше гильдейский очков
                    </li>
                    <li>
                        Учавствуйте в гильдейских походах и прохождении актуала в определенном статике или общем
                    </li>
                    <li>
                        Вкладывайте в банк ГИ полезные ресурсы
                    </li>
                </ul>
            </b-card>
        </b-collapse>
    </div>
</template>

<script>
    export default {
        name: "GuildScoreInfoCommon"
    }
</script>

<style scoped>

</style>
