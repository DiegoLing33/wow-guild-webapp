<template>
  <div :style="getStyle()">
    <slot></slot>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
class Margin extends Vue{
  @Prop({default: 0}) top;
  @Prop({default: 0}) bottom;
  @Prop({default: 0}) left;
  @Prop({default: 0}) right;

  getStyle(){
      return {
          marginTop: this.top + 'px',
          marginBottom: this.bottom + 'px',
          marginLeft: this.left + 'px',
          marginRight: this.right + 'px',
      }
  }

}

export default Margin;
</script>

<style scoped>

</style>