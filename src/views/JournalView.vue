<script setup>
import { ref, computed } from 'vue'
import CodeBadge from '../components/atoms/CodeBadge.vue'
import GlowDot from '../components/atoms/GlowDot.vue'
import { DIMENSIONS } from '../data/dimensions'
import { useProfile } from '../stores/profile'
const profile = useProfile()
const filter = ref(null)
const draft = ref('')

const visible = computed(() =>
  filter.value ? profile.journal.filter(e => e.tag === filter.value) : profile.journal
)

function addEntry() {
  if (!draft.value.trim()) return
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
  profile.addJournal({ date: today, body: draft.value, tag: filter.value || 'inner-speech' })
  draft.value = ''
}
function dimFor(id) { return DIMENSIONS.find(d => d.id === id) }
</script>
<template>
  <div style="height:100%; overflow:auto; padding:32px 56px 80px">
    <div style="max-width:1100px; margin:0 auto">
      <div style="margin-bottom:48px">
        <div class="micro" style="margin-bottom:14px">JOURNAL · NOTICE & NOTE · {{ profile.journal.length }} ENTRIES</div>
        <h1 class="serif" style="margin:0; font-size:64px; font-weight:400; letter-spacing:-0.022em; line-height:1">
          The atlas <em style="color: var(--warm)">updates</em><br/>when you notice.
        </h1>
        <p style="margin-top:18px; font-size:17px; color: var(--text-mute); max-width:620px">
          Catch the inner monologue mid-sentence. Notice an image that wouldn't form. Tag it. Over time, patterns emerge.
        </p>
      </div>

      <div class="card" style="padding:28px; margin-bottom:32px">
        <div class="micro" style="margin-bottom:12px">NEW NOTE</div>
        <textarea v-model="draft" placeholder="Just now I noticed…"
          style="width:100%; min-height:100px; padding:0; background:transparent; border:0; outline:0; resize:vertical;
            color: var(--text); font: 400 22px var(--font-serif); line-height:1.5"></textarea>
        <hr class="rule" style="margin:16px 0"/>
        <div style="display:flex; align-items:center; gap:12px">
          <span class="micro">TAG</span>
          <div style="display:flex; gap:6px; flex-wrap:wrap">
            <button v-for="d in DIMENSIONS" :key="d.id"
              @click="filter = (filter === d.id ? null : d.id)"
              :style="{
                padding:'6px 12px', borderRadius:'9999px', border:'1px solid',
                borderColor: filter === d.id ? 'oklch(82% 0.14 ' + d.hue + ')' : 'var(--border)',
                background: filter === d.id ? 'oklch(82% 0.14 ' + d.hue + ' / 0.15)' : 'transparent',
                color: filter === d.id ? 'oklch(90% 0.14 ' + d.hue + ')' : 'var(--text-mute)',
                cursor:'pointer', fontSize:'12px', fontFamily:'var(--font-mono)', letterSpacing:'0.04em',
              }">
              {{ d.code }} · {{ d.name }}
            </button>
          </div>
          <button class="btn btn-primary" style="margin-left:auto" @click="addEntry" :disabled="!draft.trim()">Save note</button>
        </div>
      </div>

      <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px">
        <span class="micro">FILTER</span>
        <button @click="filter = null"
          :style="{ background: filter==null ? 'var(--bg-elev)' : 'transparent', border:'1px solid var(--border)',
            borderRadius:'9999px', padding:'6px 14px', color:'var(--text-mute)', cursor:'pointer', fontSize:'12.5px' }">
          All ({{ profile.journal.length }})
        </button>
        <button v-for="d in DIMENSIONS" :key="d.id" @click="filter = (filter === d.id ? null : d.id)"
          :style="{ background: filter === d.id ? 'oklch(82% 0.14 ' + d.hue + ' / 0.12)' : 'transparent',
            border: '1px solid ' + (filter === d.id ? 'oklch(82% 0.14 ' + d.hue + ')' : 'var(--border)'),
            borderRadius:'9999px', padding:'6px 12px', cursor:'pointer',
            display:'inline-flex', alignItems:'center', gap:'6px', fontSize:'12px',
            color: 'var(--text-mute)', fontFamily:'var(--font-mono)' }">
          <GlowDot :size="5" :hue="d.hue"/> {{ d.code }} {{ profile.journal.filter(e => e.tag === d.id).length }}
        </button>
      </div>

      <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:18px">
        <div v-for="(e,i) in visible" :key="i" class="card" style="padding:28px; position:relative">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px">
            <div style="display:flex; align-items:center; gap:10px">
              <CodeBadge :code="dimFor(e.tag).code" :hue="dimFor(e.tag).hue" size="sm"/>
              <span style="font-size:13px; color: var(--text-mute)">{{ dimFor(e.tag).name }}</span>
            </div>
            <span class="mono" style="font-size:11px; color: var(--text-dim)">{{ e.date }}</span>
          </div>
          <p class="serif" style="margin:0; font-size:21px; line-height:1.45; letter-spacing:-0.005em">{{ e.body }}</p>
          <div style="display:flex; gap:10px; margin-top:20px">
            <button class="btn btn-ghost" style="padding:6px 12px; font-size:12px">Re-tag</button>
            <button class="btn btn-ghost" style="padding:6px 12px; font-size:12px">Link to result</button>
          </div>
        </div>
        <div v-if="visible.length === 0" class="card" style="padding:56px; grid-column:1/-1; text-align:center">
          <p class="serif" style="font-size:22px; color: var(--text-mute); margin:0">
            <em>No notes tagged here yet.</em>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
