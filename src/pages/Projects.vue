<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { NIcon, NInput, NModal } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { useProjectInfo } from '../stores/useProjectInfo';
import { TrashOutline, AddOutline, EyeOutline, EyeOffOutline, CodeOutline, LinkOutline } from '@vicons/ionicons5';

const projectInfo = useProjectInfo();
const { projects } = storeToRefs(projectInfo);

// UI State
const showProjects = ref(false);
const showAddModal = ref(false);
const isVisible = ref(false);
const animatedProjects = ref(0);

// Form State
const form = ref({
  name: '',
  description: '',
  tech: '',
  link: ''
});

// Computed properties
const projectCount = computed(() => projects.value.length);
const hasProjects = computed(() => projectCount.value > 0);
const completedProjects = computed(() => Math.ceil(projectCount.value / 2));
const totalHours = computed(() => projectCount.value * 2);

// Form validation
const isFormValid = computed(() => form.value.name.trim().length > 0);

// Project Management
const deleteProject = (id) => {
  projectInfo.removeProject(id);
  nextTick(() => animateProjects());
};

const addProject = () => {
  if (!isFormValid.value) return;
  
  projectInfo.addProject({
    name: form.value.name.trim(),
    description: form.value.description.trim() || 'No description provided',
    tech: form.value.tech.trim() || 'Various Technologies',
    link: form.value.link.trim() || '#'
  });
  
  resetForm();
  showAddModal.value = false;
  
  nextTick(() => {
    setTimeout(animateProjects, 100);
  });
};

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    tech: '',
    link: ''
  };
};

// UI Interactions  
const toggleProjectCount = () => {
  showProjects.value = !showProjects.value;
};

const openAddModal = () => {
  showAddModal.value = true;
};

const closeAddModal = () => {
  showAddModal.value = false;
  resetForm();
};

// Animation
const animateProjects = () => {
  animatedProjects.value = 0;
  if (projects.value.length === 0) return;
  
  const animateNext = () => {
    if (animatedProjects.value < projects.value.length) {
      animatedProjects.value++;
      setTimeout(animateNext, 150);
    }
  };
  setTimeout(animateNext, 300);
};

// External Links
const openProjectLink = (link) => {
  if (link && link !== '#') {
    window.open(link, '_blank', 'noopener,noreferrer');
  }
};

// Lifecycle
onMounted(() => {
  isVisible.value = true;
  animateProjects();
});
</script>

<template>
  <section 
    id="projects" 
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4 pt-45 relative overflow-hidden"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
    
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        class="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-10 rounded-full blur-3xl animate-pulse"
      />
      <div 
        class="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 opacity-10 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 3s;"
      />
      <div 
        class="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-r from-violet-400 to-purple-500 opacity-5 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 6s;"
      />
    </div>
    
    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- Header -->
      <header 
        class="text-center mb-16 transition-all duration-700 ease-out"
        :class="{ 'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible }"
      >
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
          My Projects
        </h1>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Discover the innovative solutions I've crafted with passion and precision
        </p>
      </header>

      <!-- Empty State -->
      <div 
        v-if="!hasProjects" 
        class="text-center py-20 transition-all duration-700 ease-out"
        :class="{ 'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible }"
      >
        <div class="bg-slate-800/70 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 max-w-2xl mx-auto hover:bg-slate-800/90 hover:border-cyan-400/30 transition-all duration-500">
          <div class="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/25">
            <n-icon size="40" class="text-white">
              <CodeOutline />
            </n-icon>
          </div>
          <h2 class="text-2xl font-bold text-white mb-4">No projects yet</h2>
          <p class="text-slate-300 mb-8 text-lg">Ready to showcase your amazing work? Add your first project!</p>
          <button 
            @click="openAddModal"
            class="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 relative overflow-hidden"
          >
            <span class="relative z-10 flex items-center">
              <n-icon class="mr-2"><AddOutline /></n-icon>
              Add Your First Project
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div v-else class="space-y-8">
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <article 
            v-for="(project, index) in projects" 
            :key="project.id" 
            class="group bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/90 hover:border-cyan-400/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
            :class="{ 
              'opacity-0 translate-y-8': index >= animatedProjects, 
              'opacity-100 translate-y-0': index < animatedProjects 
            }"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <!-- Project Header -->
            <header class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                  {{ project.name }}
                </h3>
                <div class="flex items-center text-sm text-cyan-400 mb-3">
                  <n-icon class="mr-2"><CodeOutline /></n-icon>
                  {{ project.tech }}
                </div>
              </div>
              <button 
                @click="deleteProject(project.id)"
                class="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 transform hover:scale-110"
                :aria-label="`Delete ${project.name}`"
              >
                <n-icon size="18"><TrashOutline /></n-icon>
              </button>
            </header>
            
            <!-- Project Description -->
            <p class="text-slate-300 mb-6 line-clamp-3 leading-relaxed">
              {{ project.description }}
            </p>
            
            <!-- Project Footer -->
            <footer class="flex items-center justify-between">
              <button 
                v-if="project.link && project.link !== '#'"
                @click="openProjectLink(project.link)"
                class="group flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 hover:from-cyan-500 hover:to-blue-500 border border-cyan-400/30 hover:border-cyan-300 rounded-lg text-cyan-300 hover:text-white font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                <span class="relative z-10 flex items-center">
                  <n-icon class="mr-2" size="16"><LinkOutline /></n-icon>
                  View Project
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </button>
              <div v-else class="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-400 text-sm">
                Coming Soon
              </div>
              
              <div class="text-xs text-slate-500">
                Project #{{ index + 1 }}
              </div>
            </footer>
          </article>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <button 
            @click="openAddModal"
            class="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 relative overflow-hidden"
          >
            <span class="relative z-10 flex items-center">
              <n-icon class="mr-2"><AddOutline /></n-icon>
              Add New Project
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          <button 
            @click="toggleProjectCount"
            class="group px-8 py-4 border-2 border-cyan-400/50 hover:bg-cyan-400/10 hover:border-cyan-300 rounded-full font-semibold text-cyan-300 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm relative overflow-hidden"
          >
            <span class="relative z-10 flex items-center">
              <n-icon class="mr-2">
                <EyeOutline v-if="!showProjects" />
                <EyeOffOutline v-else />
              </n-icon>
              {{ showProjects ? 'Hide' : 'Show' }} Statistics
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>

        <!-- Project Statistics -->
        <Transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 transform scale-95 translate-y-4"
          enter-to-class="opacity-100 transform scale-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 transform scale-100 translate-y-0"
          leave-to-class="opacity-0 transform scale-95 -translate-y-4"
        >
          <div v-show="showProjects" class="mt-8">
            <div class="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 max-w-2xl mx-auto hover:bg-slate-800/90 hover:border-cyan-400/30 transition-all duration-500">
              <h3 class="text-2xl font-bold text-center text-white mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                Project Statistics
              </h3>
              <div class="grid grid-cols-3 gap-6 text-center">
                <div class="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-xl p-4 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300">
                  <div class="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {{ projectCount }}
                  </div>
                  <div class="text-sm text-slate-400">Total Projects</div>
                </div>
                <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl p-4 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300">
                  <div class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {{ completedProjects }}
                  </div>
                  <div class="text-sm text-slate-400">Completed</div>
                </div>
                <div class="bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-400/30 rounded-xl p-4 hover:from-violet-500/30 hover:to-purple-500/30 transition-all duration-300">
                  <div class="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {{ totalHours }}h
                  </div>
                  <div class="text-sm text-slate-400">Time Invested</div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Add Project Modal -->
    <n-modal 
      v-model:show="showAddModal" 
      preset="dialog"
      title="Add New Project"
      positive-text="Add Project"
      negative-text="Cancel"
      :positive-button-props="{ disabled: !isFormValid }"
      @positive-click="addProject"
      @negative-click="closeAddModal"
      class="max-w-2xl"
    >
      <form @submit.prevent="addProject" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">
            Project Name *
          </label>
          <n-input 
            v-model:value="form.name" 
            placeholder="Enter an awesome project name..."
            maxlength="50"
            show-count
            size="large"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">
            Technologies Used
          </label>
          <n-input 
            v-model:value="form.tech" 
            placeholder="e.g., Vue.js, Node.js, MongoDB..."
            maxlength="100"
            show-count
            size="large"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">
            Project Link
          </label>
          <n-input 
            v-model:value="form.link" 
            placeholder="https://github.com/username/project or live demo URL..."
            maxlength="200"
            size="large"
            type="url"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-700">
            Description
          </label>
          <n-input 
            v-model:value="form.description" 
            type="textarea" 
            placeholder="Describe what makes this project special..."
            maxlength="300"
            show-count
            :rows="4"
            size="large"
          />
        </div>
      </form>
    </n-modal>
  </section>
</template>