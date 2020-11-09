<template>
  <div>
    <b-container>
      <players-table-filter :handler="handleFilterChanges" class="mb-3"></players-table-filter>
      <div class="my-3">
        Отображено результатов: <b>{{ items.length }}</b>
      </div>
      <b-table :busy="busy" bordered :items="items" :fields="fields">
        <template v-slot:cell(name)="row">
          <player-name :player="row.item"></player-name>
        </template>
        <template v-slot:cell(rank.id)="row">
          {{ row.item.rank.title }}
        </template>
        <template v-slot:cell(class)="row">
          {{ row.item.class.title }}
        </template>
        <template v-slot:cell(spec)="row">
          <img class="spec-image" :src="row.item.role.image"/>
          {{ row.item.specialization.title }}
        </template>
        <template v-slot:cell(gear)="row">
          {{ row.item.gear }}
        </template>
        <template v-slot:cell(activity)="row">
          <b-progress max="1" :value="playerActivity(row.item)"/>
        </template>
        <template v-slot:cell(realname)="row">
          {{ row.item.raw.realname }}
        </template>
      </b-table>
      <margin top="20" bottom="20" class="text-muted">
        Мета информация:
      </margin>
      <b-textarea readonly v-model="metaText" rows="6"/>
    </b-container>
  </div>
</template>

<script>
import shield from "@/assets/types/security.svg";
import heal from "@/assets/types/health.svg";
import swords from "@/assets/types/sword.svg";
import bow from "@/assets/types/bow-and-arrow.svg";
import PlayersTableFilter from "@/components/PlayersTableFilter";
import Guild from "@/app/Guild";
import PlayerName from "../player/PlayerName";
import PlayersButch from "@/app/butches/PlayersButch";
import Margin from "@/components/utils/Margin";

export default {
  name: "PlayersPage",
  components: {PlayerName, PlayersTableFilter, Margin},
  data() {
    return {
      busy: false,
      metaText: '...',
      items: [],
      filter: {
        specs: [
          PlayersButch.Filter.TANKS, PlayersButch.Filter.HEALERS,
          PlayersButch.Filter.RANGED, PlayersButch.Filter.MILLIE
        ],
        etc: [
          PlayersButch.Filter.IN_GUILD, PlayersButch.Filter.MAX_LEVEL_ONLY
        ],
        name: "",
      },
      images: {
        shield,
        bow,
        heal,
        swords
      },
      fields: [
        {key: "level", label: "Уровень", sortable: true},
        {key: "name", label: "Имя"},
        {key: "rank.id", label: "Ранг", sortable: true},
        {key: "class", label: "Класс"},
        {key: "activity", label: "Активность", sortable: true},
        {key: "realname", label: "Заметка", sortable: true}
      ]
    }
  },
  mounted() {
    Guild.shared.wait(this.applyTable.bind(this));
  },
  methods: {
    applyTable() {
      this.busy = true;
      this.items = Guild.shared.createPlayersButch()
          .filter(
              ...this.filter.specs,
              ...this.filter.etc
          )
          .sort(
              PlayersButch.Sorting.FIRST_HIGH_RANK,
              PlayersButch.Sorting.FIRST_HIGH_LEVEL,
              PlayersButch.Sorting.ALPHABETIC
          )
          .getButchWithName(this.filter.name);
      this.countMetaData();
      this.busy = false;
    },

    playerActivity(player) {
      const total = (player.guildScore.lastWeek || 0) +
          (player.guildScore.thisWeek || 0);
      return Math.round(total / Guild.shared.maxActivity);
    },

    countMetaData() {
      this.metaText = '';
      this.items.forEach(player => {
        this.metaText += player.name + '-Гордунни|';
        this.metaText += player.role.title + '-' + Math.floor(player.gear) + " ";
        if (player.raw.realname) this.metaText += `(${player.raw.realname})`;
        this.metaText += "\n";
      });
    },

    handleFilterChanges(specs, etc, name) {
      this.filter.specs = specs;
      this.filter.etc = etc;
      this.filter.name = name;
      this.applyTable();
    },
  },
}
</script>

<style>
textarea {
  background-color: #2a2a2a !important;
  border-color: #16181b !important;
  color: #b5b5b5 !important;
}
</style>