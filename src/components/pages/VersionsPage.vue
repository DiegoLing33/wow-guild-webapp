<template>
    <div>
        <b-container>
            <b-card v-for="v of versions" :footer="v.date" :title="(`Версия: ${v.version}`)" :key="v.version" class="mb-2">
                <template v-if="v.updates && v.updates.length > 0">
                    <div class="my-2">Нововведения:</div>
                    <ul style="margin: 0;">
                        <li style="list-style: none;" v-for="(update, index) of v.updates" :key="update[0]">
                            <template v-if="update[0].toString().startsWith('-')">
                                <b class="mt-3 d-block">{{update[1]}}</b>
                            </template>
                            <template v-else>
                            <b-badge variant="primary">{{update[0]}}d{{((index+1).toString().padStart(4, "0"))}}</b-badge>
                            {{update[1]}}
                            </template>
                        </li>
                    </ul>
                </template>
                <template v-if="v.fixes && v.fixes.length > 0">
                    <div class="my-2">Исправления:</div>
                    <ul>
                        <li v-for="(update) of v.fixes" :key="update[0]">
                            <b-badge variant="warning">{{update[0]}}</b-badge>
                            {{update[1]}}
                        </li>
                    </ul>
                </template>
                <template v-if="v.bags && v.bags.length > 0">
                    <div class="my-2">Ошибки:</div>
                    <ul>
                        <li v-for="(update, index) of v.bags" :key="update[0]">
                            <b-badge variant="danger">{{update[0]}}e{{((index+1).toString().padStart(4, "0"))}}</b-badge>
                            {{update[1]}}
                        </li>
                    </ul>
                </template>
            </b-card>
            <!--            <b-card title="Версия 0.5-alpha" class="mb-2">-->
            <!--                <div class="my-2">Нововведения</div>-->
            <!--                <ul>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="primary">5d0459</b-badge>-->
            <!--                        Добавлена полоса навигации-->
            <!--                    </li>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="primary">5d0455</b-badge>-->
            <!--                        Добавлена страница ушедших из ГИ-->
            <!--                    </li>-->
            <!--                </ul>-->
            <!--                <div class="my-2">Исправления</div>-->
            <!--                <ul>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="warning">1f0001</b-badge>-->
            <!--                        Время мификов отображается корректно-->
            <!--                    </li>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="warning">1f0002</b-badge>-->
            <!--                        Покинувшие гильдию участники больше не отображаются в общем списке-->
            <!--                    </li>-->
            <!--                </ul>-->
            <!--                <div class="text-muted">23.05.2020</div>-->
            <!--            </b-card>-->
            <!--            <b-card title="Версия 0.4-alpha" class="mb-2">-->
            <!--                <div class="my-2">Нововведения</div>-->
            <!--                <ul>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="primary">4d0001</b-badge>-->
            <!--                        Загрузка приложения ускорена в 38 раз-->
            <!--                    </li>-->
            <!--                </ul>-->
            <!--                <div class="text-muted">22.05.2020</div>-->
            <!--            </b-card>-->
            <!--            <b-card title="Версия 0.3-alpha" class="mb-2">-->
            <!--                <div class="my-2">Нововведения</div>-->
            <!--                <ul>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="primary">3d0001</b-badge>-->
            <!--                        Добавлены новые фильтры в раздел <b>Mythic+</b>-->
            <!--                    </li>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="primary">3d0002</b-badge>-->
            <!--                        В раздлах <b>Mythic+</b> и <b>Игроки</b> имена теперь активны, нажмите на них, чтобы перейти в профиль!-->
            <!--                    </li>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="primary">3d0010</b-badge>-->
            <!--                        Добавлены профили игроков-->
            <!--                    </li>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="primary">3d2032</b-badge>-->
            <!--                        Добавлена "Сподка по мификам" в раздел <b>Игроки</b>. Теперь можно посмотреть - кто ходит с ГИ, а кто добирает ;)-->
            <!--                    </li>-->
            <!--                </ul>-->
            <!--                <div class="my-2">Исправления</div>-->
            <!--                <ul>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="warning">0e0002</b-badge>-->
            <!--                        Теперь можно отправлять ссылку на что-либо в веб-приложении. Навигация настроена!-->
            <!--                    </li>-->
            <!--                </ul>-->
            <!--                <div class="text-muted">21.05.2020</div>-->
            <!--            </b-card>-->
            <!--            <b-card title="Версия 0.2-alpha" class="mb-2">-->
            <!--                <div class="my-2">Нововведения</div>-->
            <!--                <ul>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="primary">2d1600</b-badge>-->
            <!--                        Добавлен раздел "Mythic+"-->
            <!--                    </li>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="primary">2d1443</b-badge>-->
            <!--                        Добавлен раздел "Версии"-->
            <!--                    </li>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="primary">2d1330</b-badge>-->
            <!--                        Добавлена общая загрузка в начале работы web-приложения-->
            <!--                    </li>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="primary">2d1202</b-badge>-->
            <!--                        Выполнен полный редизайн-->
            <!--                    </li>-->
            <!--                </ul>-->
            <!--                <div class="my-2">Ошибки</div>-->
            <!--                <ul>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="danger">0e0002</b-badge>-->
            <!--                        Копировать ссылку невозможно-->
            <!--                    </li>-->
            <!--                </ul>-->
            <!--                <div class="text-muted">20.05.2020</div>-->
            <!--            </b-card>-->
            <!--            <b-card title="Версия 0.1-alpha">-->
            <!--                <div class="my-2">Нововведения</div>-->
            <!--                <ul>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="primary">1d1024</b-badge>-->
            <!--                        Добавлен раздел "Игроки"-->
            <!--                    </li>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="primary">1d1010</b-badge>-->
            <!--                        Добавлен раздел "Информация"-->
            <!--                    </li>-->
            <!--                </ul>-->
            <!--                <div class="my-2">Ошибки</div>-->
            <!--                <ul>-->
            <!--                    <li>-->
            <!--                        <b-badge variant="danger">0e0001</b-badge>-->
            <!--                        Раздел "Игроки" мог начать загружаться позже-->
            <!--                    </li>-->
            <!--                </ul>-->
            <!--                <div class="text-muted">19.05.2020</div>-->
            <!--            </b-card>-->
        </b-container>
    </div>
</template>

<script>
    import {VERSION_LOGS} from "@/app/VersionsLogger";

    export default {
        name: "VersionsPage",
        data() {
            return {
                versions: VERSION_LOGS,
            }
        }
    }
</script>

<style scoped>

</style>
