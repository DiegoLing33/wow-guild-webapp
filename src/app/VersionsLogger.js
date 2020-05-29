export const VERSION_LOGS = [
    {
        version: "0.9-alpha",
        updates: [
            addItem(-1, "Общий интерфейс"),
            addItem(10, "Добавлена цветовая маркировка имен персонажей в цвет класса (как в World Of Warcraft)"),
            addItem(10, "Добавлена карточка игрока, нажмите на имя игрока в любом месте, чтобы увидеть ее"),
            addItem(-1, "Mythic+"),
            addItem(10, "Добавлена более понятная индикация, что человек не из гильдии"),
        ],
        fixes: [
            addItem("s0e0001", "Исправлена ошибка даты покинувших гильдию. С текущего момента дата будет установлена корректная"),
        ],
        date:    "29.05.2020"
    },
    {
        version: "0.8.1-alpha",
        updates: [
            addItem(-1, "Общий интерфейс"),
            addItem(9, "Общий Guild Score гильдии отображается на главной странице веб-приложения"),
            addItem(-1, "Раздел Mythic+"),
            addItem(9, "Добавлен новый фильтр прохождений подземелий сложности М+: \"Только актуальная неделя\". С его помощью можно посмотреть, кто уже испопробовал новые аффиксы на себе. Также добавлен лейбл на карточку прохождения, указывающий на актуальность"),
            addItem(9, "Добавлено отображение очков GS в карточке прохождения подзмелья, которые получил каждый участник группы"),
            addItem(9, "Изменена стандартная сортировка отображения списка M+ (тайм): Не важно"),
            addItem(-1, "Guild Score"),
            addItem(9, "Новая неделя отсчета Guild Score теперь наступает в среду в 10:00, вместе с обновлением аффиксов"),
        ],
        date:    "27.05.2020"
    },
    {
        version: "0.8-alpha",
        updates: [
            addItem(-1, "Общий интерфейс"),
            addItem(8, "Внесены некоторые правки в общий интерфейс веб-приложения"),
            addItem(-1, "Профиль игрока"),
            addItem(8, "Отображение мификов в профиле изменено"),
            addItem(-1, "Раздел Mythic+"),
            addItem(8, "Полностью переработан раздел Mythic+"),
            addItem(8, "Добавлен поиск по игрокам в команде"),
            addItem(-1, "Guild Score"),
            addItem(8, "Добавлен новый раздел: Общий рейтинг Guild Score"),
        ],
        bags:[
            addItem("s0", "Дата в разделе \"Покинули гильдию\" отображается некорректно")
        ],
        date:    "24.05.2020"
    },
    {
        version: "0.7-alpha",
        updates: [
            addItem(7, "Добавлен новый концепт \"Guild Score\""),
            addItem(7, "Добавлена страница с описанием и рейтингами Guild Score"),
            addItem(7, "Добавлено отображение Guild Score в таблице игроков"),
            addItem(7, "Добавлен блок MVGP на главную страницу"),
            addItem(7, "Добавлено графическое смысловое оформление Mythic+ карточек (зеленый - в тайм, красный - не в тайм, синий - гильдейский марш)"),
            addItem(7, "Добавлена информацию об аффиксах в Mythic+ карточках)"),
            addItem(7, "Добавлена сортировка в раздел Mythic+"),
            addItem(7, "Добавлена информация о Guild Score в профили игроков"),
        ],
        date:    "24.05.2020"
    },
    {
        version: "0.6-alpha",
        updates: [
            addItem(6, "Добавлен поиск по имени во вкладке \"Список игроков\""),
            addItem(6, "Добавлен поиск по имени во вкладке \"Mythic+\""),
            addItem(6, "Добавлено отображение всех прохождений по вкладке \"Mythic+\""),
            addItem(6, "Добавлено отображение логотипа ГИ из BLIZZARD API"),
            addItem(6, "Добавлена адаптация цветовой гаммы из BLIZZARD API"),
        ],
        date:    "23.05.2020"
    },
    {
        version: "0.5-alpha",
        updates: [
            addItem(5, "Добавлена полоса навигации"),
            addItem(5, "Добавлена страница ушедших из ГИ"),
        ],
        fixes:   [
            addItem("1e0001", "Время мификов отображается корректно"),
            addItem("1e0002", "Покинувшие гильдию участники больше не отображаются в общем списке"),
        ],
        date:    "23.05.2020"
    },
//    {
//        version: "0.4-alpha",
//        updates:  [
//            addItem(1, "Добавлен раздел \"Игроки\""),
//            addItem(1, " Добавлена страница ушедших из ГИ"),
//        ],
//        fixes: [
//          addItem(1, "Время мификов отображается корректно"),
//          addItem(1, "Покинувшие гильдию участники больше не отображаются в общем списке"),
//        ],
//        bags: [
//            addItem(1, " Раздел \"Игроки\" мог начать загружаться позже")
//        ],
//        date: "21.05.2020"
//    }
]

function addItem(index, text) {
    return [index, text];
}
