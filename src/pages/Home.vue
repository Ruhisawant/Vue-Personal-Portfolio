<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import portfolioPhoto from '/portfolio-photo.jpeg';

const router = useRouter();

// ===== REACTIVE STATE =====
const isVisible = ref(false);

// Typing animation state
const typedText = ref('');
const currentIndex = ref(0);
const isTyping = ref(true);
const showCursor = ref(true);

// Counter animation state
const projectCount = ref(0);
const experienceYears = ref(0);
const clientsServed = ref(0);

// Skills animation state
const skillIndex = ref(0);

// ===== CONSTANTS =====
const typingTexts = [
  'Full Stack Developer',
  'UI/UX Designer', 
  'Problem Solver',
  'Creative Thinker'
];

const skills = [
  { name: 'Vue.js', level: 90 },
  { name: 'JavaScript', level: 88 },
  { name: 'Python', level: 85 },
  { name: 'Node.js', level: 82 },
  { name: 'React', level: 80 },
  { name: 'HTML/CSS', level: 92 },
  { name: 'MongoDB', level: 78 },
  { name: 'Git', level: 85 },
  { name: 'TypeScript', level: 80 }
];

const counterTargets = {
  projects: 25,
  experience: 3,
  clients: 15
};

// ===== COMPUTED PROPERTIES =====
const displayText = computed(() => {
  return typedText.value + (showCursor.value ? '|' : ' ');
});

// ===== ANIMATION FUNCTIONS =====
const typingAnimation = () => {
  const currentText = typingTexts[currentIndex.value];
  
  if (isTyping.value) {
    if (typedText.value.length < currentText.length) {
      typedText.value = currentText.substring(0, typedText.value.length + 1);
      setTimeout(typingAnimation, 100);
    } else {
      setTimeout(() => {
        isTyping.value = false;
        typingAnimation();
      }, 2000);
    }
  } else {
    if (typedText.value.length > 0) {
      typedText.value = typedText.value.substring(0, typedText.value.length - 1);
      setTimeout(typingAnimation, 50);
    } else {
      currentIndex.value = (currentIndex.value + 1) % typingTexts.length;
      isTyping.value = true;
      setTimeout(typingAnimation, 500);
    }
  }
};

const cursorBlinking = () => {
  showCursor.value = !showCursor.value;
  setTimeout(cursorBlinking, 500);
};

const animateCounters = () => {
  const duration = 2000;
  const start = Date.now();
  
  const animate = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    
    projectCount.value = Math.floor(progress * counterTargets.projects);
    experienceYears.value = Math.floor(progress * counterTargets.experience);
    clientsServed.value = Math.floor(progress * counterTargets.clients);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  animate();
};

const animateSkills = () => {
  skillIndex.value = 0;
  const animateNext = () => {
    if (skillIndex.value < skills.length) {
      skillIndex.value++;
      setTimeout(animateNext, 200);
    }
  };
  setTimeout(animateNext, 1000);
};

const goToProjects = () => {
  router.push('/projects');
};

const goToContact = () => {
  router.push('/contact');
};

onMounted(() => {
  isVisible.value = true;
  setTimeout(() => {
    typingAnimation();
    cursorBlinking();
    animateCounters();
    animateSkills();
  }, 500);
});
</script>

<template>
  <div class="text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen pt-25">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center px-4 overflow-hidden -mt-25">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-400 to-purple-500 opacity-10 rounded-full blur-3xl animate-pulse" style="animation-delay: 4s;"></div>
      </div>
      
      <!-- Hero Content -->
      <div class="relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ease-out" 
           :class="{ 'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible }">
        
        <!-- Main Title -->
        <div class="mb-8">
          <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
            Hello, I'm Ruhi Sawant
          </h1>
          <div class="text-2xl md:text-3xl text-cyan-300 h-12 flex items-center justify-center">
            <span class="font-mono bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {{ displayText }}
            </span>
          </div>
        </div>
        
        <!-- Description -->
        <p class="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Passionate about creating beautiful, functional web experiences that make a difference. 
          Let's build something amazing together.
        </p>
        
        <!-- Call to Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button 
            @click="goToProjects"
            class="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 relative overflow-hidden"
          >
            <span class="relative z-10">View My Work</span>
            <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
          <button 
            @click="goToContact"
            class="group px-8 py-4 border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-300 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm relative overflow-hidden"
          >
            <span class="relative z-10">Get In Touch</span>
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
        
        <!-- Stats Counter -->
        <div class="grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div class="text-center group">
            <div class="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {{ projectCount }}+
            </div>
            <div class="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Projects</div>
          </div>
          <div class="text-center group">
            <div class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {{ experienceYears }}+
            </div>
            <div class="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Years</div>
          </div>
          <div class="text-center group">
            <div class="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              {{ clientsServed }}+
            </div>
            <div class="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Clients</div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-6 border-2 border-cyan-400/50 rounded-full flex items-center justify-center backdrop-blur-sm">
          <div class="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
    
    <!-- About Section -->
    <section class="py-24 px-4 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700/50">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          About Me
        </h2>
        
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- About Text -->
          <div class="space-y-6">
            <p class="text-lg text-slate-300 leading-relaxed">
              I'm a passionate full-stack developer with a love for creating intuitive and engaging user experiences. 
              With a background in both frontend and backend technologies, I enjoy tackling complex problems and 
              turning ideas into reality.
            </p>
            <p class="text-lg text-slate-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, 
              or learning about the latest technologies. I believe in continuous learning and always strive to improve 
              my craft.
            </p>
            
            <!-- Personal Traits -->
            <div class="flex flex-wrap gap-3">
              <span class="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-cyan-500/30 transition-all">
                Creative Problem Solver
              </span>
              <span class="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-purple-500/30 transition-all">
                Team Player
              </span>
              <span class="px-4 py-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-400/30 text-violet-300 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-violet-500/30 transition-all">
                Lifelong Learner
              </span>
            </div>
          </div>
          
          <!-- Profile Image -->
          <div class="relative">
            <div class="w-full h-80 bg-gradient-to-br from-slate-700 via-purple-800/50 to-slate-800 rounded-2xl shadow-2xl flex items-center justify-center border border-slate-600/50 backdrop-blur-sm relative overflow-hidden">
              <!-- Decorative Elements -->
              <div class="absolute top-4 left-4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <div class="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style="animation-delay: 1s;"></div>
              <div class="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 2s;"></div>
              <div class="absolute bottom-4 right-4 w-3 h-3 bg-violet-400 rounded-full animate-pulse" style="animation-delay: 3s;"></div>

              <img :src="portfolioPhoto" alt="Ruhi Sawant Portfolio Photo" class="rounded-xl shadow-lg max-w-full max-h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Skills Section -->
    <section class="py-24 px-4 bg-slate-900/50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Technical Skills
        </h2>
        
        <!-- Skills Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(skill, index) in skills" 
            :key="skill.name"
            class="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/90 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 transform hover:scale-105 group"
            :class="{ 'opacity-0 translate-x-8': index >= skillIndex, 'opacity-100 translate-x-0': index < skillIndex }"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <!-- Skill Header -->
            <div class="flex justify-between items-center mb-4">
              <span class="font-semibold text-lg text-slate-200 group-hover:text-white transition-colors">
                {{ skill.name }}
              </span>
              <span class="text-cyan-400 font-medium">{{ skill.level }}%</span>
            </div>
            
            <!-- Skill Progress Bar -->
            <div class="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
              <div 
                class="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                :style="{ width: index < skillIndex ? `${skill.level}%` : '0%' }"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>