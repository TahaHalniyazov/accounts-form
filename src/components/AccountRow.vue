<template>
  <div class="account-row">

    <el-input
      v-model="labelInput"
      placeholder="Метка"
      maxlength="50"
      :class="{ 'invalid': errors.labels }"
      @blur="onLabelBlur"
      style="width: 180px"
    />


    <el-select
      v-model="type"
      placeholder="Тип"
      style="width: 120px"
      @change="onTypeChange"
    >
      <el-option label="Локальная" value="local" />
      <el-option label="LDAP" value="ldap" />
    </el-select>


    <el-input
      v-model="login"
      placeholder="Логин"
      maxlength="100"
      :class="{ 'invalid': errors.login }"
      @blur="validateAndSave"
      style="width: 180px"
    />

   
    <el-input
      v-if="type === 'local'"
      v-model="password"
      placeholder="Пароль"
      type="password"
      maxlength="100"
      show-password
      :class="{ 'invalid': errors.password }"
      @blur="validateAndSave"
      style="width: 180px"
    />


    <el-button type="danger" @click="remove" circle>
  <el-icon><Delete /></el-icon>
</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Account } from '@/stores/accounts'
import { Delete } from '@element-plus/icons-vue'

const props = defineProps<{
  modelValue: Account
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: Account): void
  (e: 'remove'): void
}>()


const labelInput = ref(props.modelValue.labels.map(l => l.text).join('; '))
const type = ref(props.modelValue.type)
const login = ref(props.modelValue.login)
const password = ref(props.modelValue.password ?? '')

const errors = ref({
  labels: false,
  login: false,
  password: false,
})


watch(() => props.modelValue, (val) => {
  labelInput.value = val.labels.map(l => l.text).join('; ')
  type.value = val.type
  login.value = val.login
  password.value = val.password ?? ''
})


function parseLabels(input: string) {
  return input
    .split(';')
    .map(v => v.trim())
    .filter(Boolean)
    .map(text => ({ text }))
    .slice(0, 50)
}


function validateAndSave() {
  let valid = true

  errors.value.labels = false
  if (labelInput.value.length > 50) {
    errors.value.labels = true
    valid = false
  }


  errors.value.login = false
  if (!login.value || login.value.length > 100) {
    errors.value.login = true
    valid = false
  }


  errors.value.password = false
  if (type.value === 'local' && (!password.value || password.value.length > 100)) {
    errors.value.password = true
    valid = false
  }

  if (valid) {
  
    emits('update:modelValue', {
      ...props.modelValue,
      labels: parseLabels(labelInput.value),
      type: type.value,
      login: login.value,
      password: type.value === 'local' ? password.value : null,
    })
  }
}


function onLabelBlur() {
  validateAndSave()
}


function onTypeChange() {
  if (type.value === 'ldap') {
    password.value = ''
  }
  validateAndSave()
}


function remove() {
  emits('remove')
}
</script>

<style scoped>
.account-row {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 8px;
}
.invalid input,
.invalid .el-input__inner {
  border-color: #f56c6c !important;
}
</style>
