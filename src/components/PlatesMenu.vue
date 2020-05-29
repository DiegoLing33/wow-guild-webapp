<template>
    <div class="plates-menu">
        <b-row>
            <b-col md="6" class="mb-4">
                <plates-menu-item header="Информация"
                                  description="Основная информация о гильдии"
                                  path="/info"
                >
                    <img :src="antique" alt="Info icon" />
                </plates-menu-item>
            </b-col>
            <b-col md="6" class="mb-4">
                <plates-menu-item
                        header="Игроки"
                        description="Выборка игроков гильдии"
                        path="/players"
                >
                    <img :src="miscellaneous" alt="Warriors icon" />
                </plates-menu-item>
            </b-col>
            <b-col md="6" class="mb-4">
                <plates-menu-item
                        header="Подземелья"
                        description="Кто куда ходил?"
                >
                    <img :src="dungeon" alt="Dungeon icon" />
                </plates-menu-item>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import PlatesMenuItem from "@/components/PlatesMenuItem";
    import dungeon from "@/assets/dungeon.png";
    import antique from "@/assets/antique.svg";
    import miscellaneous from "@/assets/miscellaneous.svg";

    export default {
        name: "PlatesMenu",
        components: {PlatesMenuItem},
        data(){
            return {
                dungeon,
                antique,
                miscellaneous
            }
        }
    }
</script>

<style scoped>
    .plates-menu{
        width: 700px;
        margin: 20px auto;
        margin-top: 20px;
    }
</style>
