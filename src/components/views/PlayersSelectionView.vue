<template>
    <div>
        <b-form-group>
            <b-form-tags v-model="value" class="mt-3" no-outer-focus
                         style="background-color: transparent;border: none;padding: 0;">
                <template v-slot="{ tags, disabled, addTag, removeTag }">
                    <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                        <li v-for="tag in tags" :key="tag" class="list-inline-item">
                            <b-form-tag
                                    @remove="removeTag(tag)"
                                    :title="tag"
                                    :disabled="disabled"
                                    variant="info"
                            >{{ tag }}
                            </b-form-tag>
                        </li>
                    </ul>

                    <b-dropdown size="sm" variant="primary" block menu-class="w-100">
                        <template v-slot:button-content>
                            <b-icon-people-fill></b-icon-people-fill>
                            Выбрать участников гильдии
                        </template>
                        <b-dropdown-form @submit.stop.prevent="() => {}">
                            <b-form-group
                                    label-for="tag-search-input"
                                    label="Имя игрока"
                                    label-cols-md="auto"
                                    class="mb-0"
                                    label-size="sm"
                                    :description="searchDesc"
                                    :disabled="disabled"
                            >
                                <b-form-input
                                        :autofocus="true"
                                        v-model="search"
                                        id="tag-search-input"
                                        type="search"
                                        size="sm"
                                        autocomplete="off"
                                ></b-form-input>
                            </b-form-group>
                        </b-dropdown-form>
                        <b-dropdown-divider></b-dropdown-divider>
                        <div style="max-height: 300px; overflow-y: scroll">
                            <b-dropdown-item-button
                                    v-for="option in availableOptions"
                                    :key="option"
                                    @click="onOptionClick({ option, addTag })"
                            >
                                {{ option }}
                            </b-dropdown-item-button>
                        </div>
                        <b-dropdown-text v-if="availableOptions.length === 0">
                            Не выбран ни один участник гильдии
                        </b-dropdown-text>
                    </b-dropdown>
                </template>
            </b-form-tags>
        </b-form-group>
    </div>
</template>

<script>
    import Guild from "@/app/Guild";
    import StringUtils from "@/app/utils/StringUtils";

    export default {
        name:     "PlayersSelectionView",
        data() {
            return {
                options: [],
                search:  '',
                value:   []
            }
        },
        watch:    {
            value() {
                this.$emit("selected", this.value);
            }
        },
        mounted() {
            Guild.shared.wait(this.update.bind(this));
        },
        computed: {
            criteria() {
                return this.search.trim().toLowerCase()
            },
            availableOptions() {
                const criteria = this.criteria
                const options  = this.options.filter(opt => this.value.indexOf(opt) === -1)
                if (criteria) {
                    return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
                }
                return options
            },
            searchDesc() {
                if (this.criteria && this.availableOptions.length === 0) {
                    return 'Участники гильдии не найдены по критериям запроса'
                }
                return ''
            }
        },
        methods:  {
            onOptionClick({option, addTag}) {
                addTag(option)
                this.search = ''
            },
            update() {
                this.options = Guild.shared.getPlayersNamesList().map(StringUtils.title);
            }
        }
    }
</script>

<style scoped>

</style>
