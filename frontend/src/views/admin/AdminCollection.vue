<template>
  <AdminLayout :title="title">
    <div v-if="collection === 'profile'" class="grid gap-5 lg:grid-cols-[320px_1fr]">
      <aside class="panel p-5">
        <h2 class="font-semibold text-white">Profile Preview</h2>
        <div class="mt-4 overflow-hidden rounded-lg border border-line bg-slate-950/60">
          <img v-if="draft.photo" :src="fileUrl(draft.photo)" :alt="draft.name || 'Profile photo'" class="aspect-[4/5] w-full object-cover" />
          <div v-else class="grid aspect-[4/5] place-items-center text-sm text-slate-500">No profile photo</div>
        </div>
        <div class="mt-4 space-y-2">
          <p class="text-lg font-semibold text-white">{{ draft.name || 'Profile name' }}</p>
          <p class="text-sm text-slate-400">{{ draft.title || 'Title' }}</p>
          <p class="text-sm text-slate-400">{{ draft.location || 'Location' }}</p>
        </div>
        <UploadBox label="Profile Photo" endpoint="profile" hint="Recommended: portrait photo, JPG/PNG/WebP, max 10MB." @uploaded="handleProfilePhotoUploaded" @failed="message = $event" />
        <UploadBox label="Resume PDF" endpoint="resume" hint="Upload the latest CV/resume PDF." @uploaded="handleProfileResumeUploaded" @failed="message = $event" />
      </aside>

      <section class="panel p-5">
        <h2 class="font-semibold text-white">Profile Master Data</h2>
        <p class="mt-2 text-sm text-slate-400">Manage the information shown on the public portfolio homepage, contact page, and resume button.</p>
        <DynamicForm v-model="draft" :fields="profileFields" />
        <button class="btn-primary mt-5" @click="saveProfile" :disabled="saving">Save Profile</button>
      </section>
    </div>

    <div v-else class="space-y-5">
      <div class="panel p-5">
        <h2 class="font-semibold text-white">{{ editingId ? `Edit: ${draft.title || draft.name || draft.company || editingId}` : 'Create item' }}</h2>
        <p v-if="collection === 'projects'" class="mt-2 rounded-md border border-amber-300/30 bg-amber-300/10 p-3 text-sm text-amber-100">
          Select a project with Edit before uploading an image. Uploaded images are saved to the project currently shown in this form.
        </p>
        <DynamicForm v-model="draft" :fields="fields" />
        <div v-if="collection === 'projects'" class="mt-4 grid gap-4 md:grid-cols-[280px_1fr]">
          <div class="rounded-lg border border-line bg-slate-950/60 p-3">
            <div v-if="projectImages.length" class="grid grid-cols-2 gap-2">
              <div v-for="image in projectImages" :key="image" class="group relative overflow-hidden rounded-md border border-line">
                <img :src="fileUrl(image)" :alt="draft.title || 'Project image'" class="h-24 w-full object-cover" />
                <button class="absolute right-1 top-1 rounded bg-slate-950/80 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100" @click="removeProjectImage(image)">Remove</button>
              </div>
            </div>
            <div v-else class="grid h-32 place-items-center text-sm text-slate-500">No images</div>
          </div>
          <UploadBox
            label="Project Images"
            endpoint="project"
            :disabled="!editingId"
            multiple
            :hint="editingId ? `Target project: ${draft.title || editingId}` : 'Click Edit on a project before uploading.'"
            @uploaded="handleProjectImagesUploaded"
            @failed="message = $event"
          />
        </div>
        <div class="mt-5 flex flex-wrap gap-2">
          <button class="btn-primary" @click="saveItem" :disabled="saving">{{ editingId ? 'Update' : 'Create' }}</button>
          <button class="btn-muted" @click="resetForm">Clear</button>
        </div>
      </div>

      <div class="panel overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[720px] text-left text-sm">
            <thead class="bg-slate-900 text-slate-400">
              <tr>
                <th v-for="field in visibleFields" :key="field.key" class="px-4 py-3">{{ field.label }}</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-line">
              <tr v-for="item in items" :key="item.id">
                <td v-for="field in visibleFields" :key="field.key" class="max-w-xs truncate px-4 py-3">
                  <template v-if="field.key === 'image'">
                    <img v-if="coverImage(item)" :src="fileUrl(coverImage(item))" :alt="item.title || 'Project image'" class="h-12 w-20 rounded-md object-cover" />
                    <span v-else class="text-slate-500">No image</span>
                  </template>
                  <template v-else>{{ displayValue(item[field.key]) }}</template>
                </td>
                <td class="px-4 py-3 text-right">
                  <button class="btn-muted mr-2" @click="edit(item)">Edit</button>
                  <button class="btn-muted" @click="destroy(item)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <p v-if="message" class="mt-4 rounded-md border border-cyan-300/30 bg-cyan-300/10 p-3 text-sm text-cyan-100">{{ message }}</p>
  </AdminLayout>
</template>

<script setup>
import { computed, h, onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from '../../components/admin/AdminLayout.vue';
import { api } from '../../services/api';

const route = useRoute();
const collection = computed(() => route.params.collection);
const title = computed(() => collection.value.charAt(0).toUpperCase() + collection.value.slice(1));
const items = ref([]);
const draft = ref({});
const editingId = ref('');
const saving = ref(false);
const message = ref('');

const schemas = {
  projects: ['title', 'slug', 'category', 'description:textarea', 'image', 'techStack:tags', 'featured:boolean', 'githubUrl', 'demoUrl'],
  experience: ['company', 'position', 'location', 'startDate', 'endDate', 'current:boolean', 'description:textarea', 'achievements:lines', 'techStack:tags'],
  skills: ['name', 'category', 'level:number', 'icon'],
  education: ['institution', 'degree', 'field', 'startDate', 'endDate', 'gpa', 'description:textarea'],
  publications: ['title', 'journal', 'volume', 'url', 'publishedAt', 'description:textarea'],
  certifications: ['name', 'issuer', 'issuedAt', 'url', 'description:textarea'],
  languages: ['name', 'level']
};

const profileFields = makeFields(['name', 'title', 'headline:textarea', 'bio:textarea', 'photo', 'email', 'phone', 'location', 'linkedin', 'github', 'resume']);
const fields = computed(() => makeFields(schemas[collection.value] || []));
const projectImages = computed(() => [...new Set([...(draft.value.images || []), draft.value.image].filter(Boolean))]);
const visibleFields = computed(() => {
  if (collection.value === 'projects') {
    return makeFields(['image', 'title', 'category', 'featured:boolean']);
  }
  return fields.value.slice(0, 4);
});

function makeFields(config) {
  return config.map((entry) => {
    const [key, type = 'text'] = entry.split(':');
    return { key, type, label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase()) };
  });
}

async function load() {
  message.value = '';
  if (collection.value === 'profile') {
    const { data } = await api.get('/profile');
    draft.value = data;
  } else {
    const { data } = await api.get(`/${collection.value}`);
    items.value = data;
    resetForm();
  }
}

async function saveProfile() {
  try {
    saving.value = true;
    await api.put('/profile', draft.value);
    message.value = 'Profile saved.';
  } catch (error) {
    message.value = `Profile could not be saved: ${error.response?.data?.message || error.message}`;
  } finally {
    saving.value = false;
  }
}

async function handleProfilePhotoUploaded(filePath) {
  draft.value = { ...draft.value, photo: filePath };
  await saveProfile();
  message.value = 'Profile photo uploaded and saved.';
}

async function handleProfileResumeUploaded(filePath) {
  draft.value = { ...draft.value, resume: filePath };
  await saveProfile();
  message.value = 'Resume uploaded and saved.';
}

async function saveItem() {
  saving.value = true;
  const endpoint = `/${collection.value}${editingId.value ? `/${editingId.value}` : ''}`;
  if (editingId.value) await api.put(endpoint, draft.value);
  else await api.post(endpoint, draft.value);
  saving.value = false;
  message.value = 'Content saved.';
  await load();
}

async function handleProjectImagesUploaded(filePaths) {
  if (!editingId.value) {
    message.value = 'Please click Edit on a project before uploading an image.';
    return;
  }
  const paths = Array.isArray(filePaths) ? filePaths : [filePaths];
  try {
    const images = [...new Set([...projectImages.value, ...paths])];
    draft.value = { ...draft.value, image: images[0] || '', images };
    saving.value = true;
    await api.put(`/${collection.value}/${editingId.value}`, draft.value);
    message.value = `${paths.length} image${paths.length > 1 ? 's' : ''} saved to ${draft.value.title || editingId.value}.`;
    const { data } = await api.get(`/${collection.value}`);
    items.value = data;
  } catch (error) {
    message.value = `Image uploaded but could not be saved to project: ${error.response?.data?.message || error.message}`;
  } finally {
    saving.value = false;
  }
}

async function removeProjectImage(image) {
  const images = projectImages.value.filter((item) => item !== image);
  draft.value = { ...draft.value, images, image: images[0] || '' };
  if (!editingId.value) return;
  saving.value = true;
  await api.put(`/${collection.value}/${editingId.value}`, draft.value);
  saving.value = false;
  message.value = 'Project image removed from gallery.';
  const { data } = await api.get(`/${collection.value}`);
  items.value = data;
}

async function destroy(item) {
  if (!confirm(`Delete ${item.title || item.name || item.company || item.id}?`)) return;
  await api.delete(`/${collection.value}/${item.id}`);
  message.value = 'Content deleted.';
  await load();
}

function edit(item) {
  editingId.value = item.id;
  draft.value = JSON.parse(JSON.stringify(item));
}

function resetForm() {
  editingId.value = '';
  draft.value = {};
}

function displayValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return value ?? '';
}

function fileUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  return `${api.defaults.baseURL.replace('/api', '')}${path}`;
}

function coverImage(item) {
  return item.images?.[0] || item.image || '';
}

onMounted(load);
watch(collection, load);

const DynamicForm = {
  props: ['modelValue', 'fields'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const set = (key, value, type) => {
      const next = { ...props.modelValue };
      if (type === 'tags') next[key] = value.split(',').map((item) => item.trim()).filter(Boolean);
      else if (type === 'lines') next[key] = value.split('\n').map((item) => item.trim()).filter(Boolean);
      else if (type === 'number') next[key] = Number(value);
      else if (type === 'boolean') next[key] = value;
      else next[key] = value;
      emit('update:modelValue', next);
    };
    const valueOf = (key, type) => {
      const value = props.modelValue?.[key];
      if (type === 'tags') return Array.isArray(value) ? value.join(', ') : '';
      if (type === 'lines') return Array.isArray(value) ? value.join('\n') : '';
      return value ?? '';
    };
    return () => h('div', { class: 'mt-4 grid gap-4 md:grid-cols-2' }, props.fields.map((field) => h('label', { class: field.type === 'textarea' || field.type === 'lines' ? 'block space-y-2 md:col-span-2' : 'block space-y-2' }, [
      h('span', { class: 'label' }, field.label),
      field.type === 'boolean'
        ? h('input', { type: 'checkbox', checked: Boolean(props.modelValue?.[field.key]), onChange: (event) => set(field.key, event.target.checked, field.type), class: 'h-5 w-5 accent-cyan-300' })
        : field.type === 'textarea' || field.type === 'lines'
          ? h('textarea', { class: 'input min-h-28', value: valueOf(field.key, field.type), onInput: (event) => set(field.key, event.target.value, field.type) })
          : h('input', { class: 'input', type: field.type === 'number' ? 'number' : 'text', value: valueOf(field.key, field.type), onInput: (event) => set(field.key, event.target.value, field.type) })
    ])));
  }
};

const UploadBox = {
  props: ['label', 'endpoint', 'disabled', 'hint', 'multiple'],
  emits: ['uploaded', 'failed'],
  setup(props, { emit }) {
    const uploading = ref(false);
    const selected = ref('');
    const upload = async (event) => {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;
      selected.value = files.map((file) => file.name).join(', ');
      if (props.disabled) {
        emit('failed', 'Please click Edit on a project before uploading an image.');
        return;
      }
      uploading.value = true;
      try {
        const uploaded = [];
        for (const file of files) {
          const form = new FormData();
          form.append('file', file);
          const { data } = await api.post(`/upload/${props.endpoint}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
          uploaded.push(data.filePath);
        }
        emit('uploaded', props.multiple ? uploaded : uploaded[0]);
      } catch (error) {
        const detail = error.response?.data?.message || error.message || 'Upload failed';
        emit('failed', `Upload failed: ${detail}`);
      } finally {
        uploading.value = false;
        event.target.value = '';
      }
    };
    return () => h('label', { class: 'mt-4 block space-y-2' }, [
      h('span', { class: 'label' }, props.label),
      props.hint ? h('span', { class: 'block text-xs text-slate-400' }, props.hint) : null,
      h('input', { class: 'input', type: 'file', multiple: props.multiple, disabled: props.disabled, accept: props.endpoint === 'resume' ? 'application/pdf' : 'image/png,image/jpeg,image/webp', onChange: upload }),
      selected.value ? h('span', { class: 'block text-xs text-slate-400' }, `Selected: ${selected.value}`) : null,
      uploading.value ? h('span', { class: 'text-sm text-slate-400' }, 'Uploading...') : null
    ]);
  }
};
</script>
