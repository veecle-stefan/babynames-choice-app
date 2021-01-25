<template>
<div class="q-gutter-y-md column personinput no-wrap justify-center items-center content-center" >
  <div class="input-hint">
    {{$t(`${labels}.hint`)}}
  </div>
  <img class="person" :src="`/icons/person/${personIcon()}.png`" />
  <q-input dense filled :placeholder="$t(`${labels}.placeholder`)" v-model="_person.name" :label="$t(`${labels}.label`)" :suffix="suffix" :error-message="$t(`${labels}.err`)" :error="error">
    <template v-if="editable" v-slot:append>
              <q-btn dense icon="person_remove" @click="$emit('remove')" color="primary" />
    </template>
</q-input>
<gender-picker v-if="editable" v-model="_person.gender" />
</div>
</template>

<script lang="ts">
import { Person } from 'src/babynames'
import { Vue, Component, Prop, ModelSync } from 'vue-property-decorator'
import GenderPicker from './gender-picker.vue'

@Component({
  components: { GenderPicker }
})
export default class PersonInput extends Vue {
  @Prop({ required: true }) readonly labels!: string
  @Prop({ required: false, default: '' }) readonly suffix!: string
  @Prop({ required: false, default: 'family' }) readonly type!: string
  @Prop({ required: false, default: false }) readonly editable!: boolean
  @Prop({ required: false, default: false }) readonly error!: boolean
  @ModelSync('value', 'input', { type: Person }) readonly _person!: Person

  personIcon (): string {
    if (this.editable) {
      return `${this.type}-${this._person.gender}`
    } else {
      return this.type
    }
  }
}
</script>

<style lang="scss">
.personinput {
  border-radius: 10px;
  //border: 1px dotted rgba(255,255,255,0.4);
  box-shadow: 0px 0px 40px rgba(0,255,255,0.4);
  margin: 5px;
  padding: 5px;
}

.person {
  width: 70px;
}

.input-hint {
  font-size: 9pt;
  color: #888888;
}
</style>
