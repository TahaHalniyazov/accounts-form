<template>
  <div>
    <h2>Учетные записи</h2>
    <el-button type="primary" @click="addAccount">+</el-button>
    <el-alert type="info" :closable="false" show-icon class="mt-3 mb-3">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </el-alert>
  
    <div class="account-labels-row">
      <span class="account-label">Метки</span>
      <span class="account-label type">Тип записи</span>
      <span class="account-label">Логин</span>
      <span class="account-label">Пароль</span>
      <span class="account-label" style="width:40px"></span>
    </div>

    <AccountRow
      v-for="account in accounts"
      :key="account.id"
      :model-value="account"
      @update:model-value="updateAccount"
      @remove="removeAccount(account.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'
import { computed } from 'vue'
import AccountRow from './AccountRow.vue' 

const store = useAccountsStore()
const accounts = computed(() => store.accounts)

function addAccount() {
  store.addAccount()
}

function removeAccount(id: number) {
  store.removeAccount(id)
}

function updateAccount(updated) {
  store.updateAccount(updated)
}
</script>

<style scoped>
.mt-3 { margin-top: 12px; }
.mb-3 { margin-bottom: 12px; }
.account-labels-row {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #888;
  margin-bottom: 4px;
  margin-left: 2px;
}
.account-label {
  width: 180px;
  display: inline-block;
}
.account-label.type {
  width: 120px;
}
.account-label:last-child {
  width: 40px;
}
</style>
