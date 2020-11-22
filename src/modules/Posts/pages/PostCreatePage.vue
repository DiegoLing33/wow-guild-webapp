<template>
    <BContainer v-if="postToEditNotFound || !$store.getters.authToken">
        <BCard>
            <h4>Ой, что-то не так...</h4>
            <p>
                Кажется, то, что Вы ищите находится в глубинах бездны.
            </p>
        </BCard>
    </BContainer>
    <BContainer v-else>
        <BCard no-body>
            <BCardHeader>
                <BCardTitle v-if="editId">Редактирование: {{ postTitle }}</BCardTitle>
                <BCardTitle v-else>Новая запись</BCardTitle>
                <div v-if="editId">Редактирование запии</div>
                <div v-else>Создание новой записи</div>
            </BCardHeader>
            <BCardBody>
                <BInput placeholder="Зоголовок" v-model="postTitle"/>
                <BRow class="mt-3">
                    <BCol>
                        <div class="text-muted">
                            Укажите категорию записи. В зависимости от выбранной категории,
                            запись будет добавлена в определенный раздел веб-приложения
                        </div>
                    </BCol>
                    <BCol>
                        <BSelect v-model="postCategory">
                            <BSelectOption disabled value="0">Категория записи</BSelectOption>
                            <BSelectOption :value="cat.getId()" v-for="cat in categories" :key="cat.getId()">
                                {{ cat.getTitle() }}
                            </BSelectOption>
                        </BSelect>
                    </BCol>
                </BRow>
                <BRow class="mt-3">
                    <BCol>
                        <div class="text-muted">
                            Изображение записи отображается на ее карточке в соответствующем разделе. Старайтесь сделать
                            его
                            максимально информативным и привлекательным
                        </div>
                    </BCol>
                    <BCol>
                        <BFile v-model="postImage"
                               browse-text="Выбрать изображение" placeholder="Изображение"
                        />
                    </BCol>
                </BRow>
                <ckeditor
                    class="mt-3"
                    id="e-1"
                    v-model="postContent"
                    :config="editorConfig"
                />
            </BCardBody>
            <BCardFooter>
                <BButton block variant="primary" @click="handle">
                    {{ buttonText }}
                </BButton>
            </BCardFooter>
        </BCard>
        <div>
            <hr class="my-4"/>
            <BCard
                no-body
                :img-src="imageUrl"
            >
                <BCardHeader style="position: relative">
                    <BCardTitle>
                        {{ postTitle }}
                    </BCardTitle>
                    <div class="description">
                        {{ postDate }} - {{ $store.getters.battleTag }}
                    </div>
                </BCardHeader>
                <BCardBody class="content-h" v-html="postContent"/>
            </BCard>
        </div>
    </BContainer>
</template>

<script>
import {GuildAPI} from "prestij.xyz-api";

export default {
    name: "PostCreatePage",
    components: {},
    data: () => ({
        postToEdit: null,
        postToEditNotFound: false,
        buttonText: 'Создать запись',

        // The post entity
        postContent: "",
        postTitle: '',
        postCategory: 0,
        postImage: null,
        postDate: '',

        // The data
        categories: [],
        editorConfig: {
            extraPlugins: 'uploadimage',
            uploadImageUrl: 'http://server.prestij.xyz',
            height: 500,
        },
    }),
    computed: {
        /**
         * Returns current image url
         * @return {string|null|*}
         */
        imageUrl() {
            if (this.postImage) return URL.createObjectURL(this.postImage)
            if (this.postToEdit) return this.postToEdit.raw.image;
            return null;
        },
        /**
         * Returns the edit it
         * @return {string | (string | null)[]}
         */
        editId() {
            return this.$route.query.edit;
        }
    },
    watch: {
        $route() {
            window.location.reload();
        }
    },
    methods: {
        // On button click
        async handle() {
            const __content = this.postContent;
            const __categoryId = this.postCategory;
            const __title = this.postTitle;

            if (!__content || __content.length < 3 || !__categoryId || __categoryId === 0 || !__title || __title.length < 3) {
                return this.$toast.error('Проверьте заполненность полей!');
            }

            let __imgUrl = this.postToEdit ? this.postToEdit.raw.image : '';

            if (this.postImage) {
                this.$store.commit("loader", {text: "Загрузка изображения..."});
                const images = await GuildAPI.Files.Upload([this.postImage], this.$store.getters.authToken);
                __imgUrl = images[0].file_path;
                this.$store.commit("loader", {text: "Загрузка изображения...", current: 1});
            }

            const args = {
                category_id: __categoryId,
                content: __content,
                image: __imgUrl,
                tags: '',
                title: __title,
                token: this.$store.getters.authToken,
            };


            if (!__imgUrl || __imgUrl.length < 3) {
                return this.$toast.error('Вы не выбрали изображение!');
            }

            if (this.editId) {
                try {
                    const result = await GuildAPI.Posts.EditPost(parseInt(this.editId), args);
                    if (result.detail) return this.$toast.error('Ошибка: ' + result.detail);
                    if (result) this.$toast.success('Изменения сохранены!');
                } catch (e) {
                    this.$toast.error('Ошибка: ' + e);
                }
            } else {
                try {
                    const result = await GuildAPI.Posts.AddPost(args);
                    if (result && result.raw && result.raw.id) {
                        await this.$router.push("/post/" + result.raw.id);
                        return;
                    }
                    if (result.detail) return this.$toast.error('Ошибка: ' + result.detail);
                    if (result) this.$toast.success('Запись успешно создана!');
                } catch (e) {
                    this.$toast.error('Ошибка: ' + e);
                }
            }
        },
    },
    async mounted() {
        // Loads the categories
        GuildAPI.Posts.GetCategories().then(value => this.categories = value);
        try {
            const eId = this.editId;
            if (eId) {
                this.buttonText = 'Сохранить изменения';

                this.postToEdit = await GuildAPI.Posts.GetPost(parseInt(eId));
                this.postContent = this.postToEdit.raw.content;
                this.postTitle = this.postToEdit.raw.title;
                this.postCategory = this.postToEdit.raw.category_id;
                this.postDate = this.postToEdit.raw.created;
                this.postToEditNotFound = false;
            }
        } catch (e) {
            this.postToEditNotFound = true;
            this.$toast.error('Запись для редактирования не найдена!');
        }
    }
}
</script>

<style lang="scss">
.content-h {
    table {
        border: 1px solid rgba(255, 255, 255, 0.5);
    }

    th {
        background-color: rgba(255, 255, 255, 0.2);
        color: #f3f3f3;
    }

    td, th {
        padding: 5px;
    }
}
</style>

<style lang="scss" scoped>
.description {
    opacity: 0.7;
}


</style>