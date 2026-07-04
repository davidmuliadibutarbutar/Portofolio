<template>
  <div class="panel relative overflow-hidden p-5">
    <div class="absolute inset-0 grid-surface opacity-30"></div>
    <div class="relative rounded-lg border border-emerald-900/10 bg-white/80 p-4">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex gap-2">
          <span class="h-3 w-3 rounded-full bg-rose-300"></span>
          <span class="h-3 w-3 rounded-full bg-amber-300"></span>
          <span class="h-3 w-3 rounded-full bg-emerald-300"></span>
        </div>
        <span class="rounded-md bg-emerald-100 px-2 py-1 text-xs text-emerald-700">live systems</span>
      </div>

      <div class="grid gap-3">
        <div class="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-sm font-semibold text-emerald-900">Portfolio API</p>
              <p class="mt-1 text-xs text-slate-500">Express · JWT · JSON Storage</p>
            </div>
            <Server class="h-6 w-6 text-emerald-700" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div v-for="item in nodes" :key="item.label" :class="['rounded-lg border p-3', item.class]">
            <component :is="item.icon" class="h-5 w-5" />
            <p class="mt-3 text-sm font-semibold text-slate-950">{{ item.label }}</p>
            <p class="mt-1 text-xs text-slate-500">{{ item.caption }}</p>
          </div>
        </div>

        <div class="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <div class="mb-2 flex items-center justify-between text-xs text-amber-800">
            <span>Query optimization</span>
            <span>85%</span>
          </div>
          <div class="h-2 rounded-full bg-amber-100">
            <div class="h-2 w-[85%] rounded-full bg-amber-500"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Database, GitBranch, LayoutDashboard, Server } from 'lucide-vue-next';

const nodes = [
  { label: 'Frontend', caption: 'Vue · Next.js', icon: LayoutDashboard, class: 'border-teal-200 bg-teal-50 text-teal-700' },
  { label: 'Database', caption: 'SQL Server · PostgreSQL', icon: Database, class: 'border-sky-200 bg-sky-50 text-sky-700' },
  { label: 'Workflow', caption: 'Approval · Reporting', icon: GitBranch, class: 'border-rose-200 bg-rose-50 text-rose-700' },
  { label: 'Integration', caption: 'RFID · API · Devices', icon: Server, class: 'border-emerald-200 bg-emerald-50 text-emerald-700' }
];
</script>
