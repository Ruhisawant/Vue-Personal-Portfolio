import { defineStore } from 'pinia';

let projectId = 1;

export const useProjectInfo = defineStore('projectInfo', {
  state: () => ({
    projects: []
  }),
  
  getters: {
    projectCount: (state) => state.projects.length,
    
    projectById: (state) => (id) => state.projects.find(p => p.id === id),
    
    projectsByTech: (state) => (tech) => 
      state.projects.filter(p => 
        p.tech.toLowerCase().includes(tech.toLowerCase())
      ),
    
    hasProjects: (state) => state.projects.length > 0,
    
    completedProjects: (state) => 
      state.projects.filter(p => p.status === 'completed').length,
    
    projectsByCategory: (state) => {
      const categories = {};
      state.projects.forEach(project => {
        const tech = project.tech || 'Other';
        if (!categories[tech]) {
          categories[tech] = [];
        }
        categories[tech].push(project);
      });
      return categories;
    }
  },
  
  actions: {
    addProject(projectData) {
      const project = {
        id: projectId++,
        name: projectData.name,
        description: projectData.description || 'No description provided',
        tech: projectData.tech || 'Various Technologies',
        link: projectData.link || '#',
        status: projectData.status || 'in-progress',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      this.projects.push(project);
      return project;
    },
    
    updateProject(id, updates) {
      const project = this.projectById(id);
      if (project) {
        Object.assign(project, {
          ...updates,
          updatedAt: new Date().toISOString()
        });
        return project;
      }
      return null;
    },
    
    removeProject(id) {
      const index = this.projects.findIndex(p => p.id === id);
      if (index > -1) {
        const removedProject = this.projects.splice(index, 1)[0];
        return removedProject;
      }
      return null;
    },
    
    clearAllProjects() {
      this.projects = [];
    },
    
    addMultipleProjects(projectsArray) {
      const addedProjects = projectsArray.map(project => this.addProject(project));
      return addedProjects;
    },
    
    exportProjects() {
      return JSON.stringify(this.projects, null, 2);
    },
    
    importProjects(jsonData) {
      try {
        const projects = JSON.parse(jsonData);
        if (Array.isArray(projects)) {
          this.projects = projects.map(project => ({
            ...project,
            id: projectId++,
            updatedAt: new Date().toISOString()
          }));
          return true;
        }
      } catch (error) {
        console.error('Failed to import projects:', error);
        return false;
      }
    }
  },
  
  persist: {
    key: 'portfolio-projects',
    storage: localStorage,
    beforeRestore: (context) => {
      const maxId = Math.max(...context.store.projects.map(p => p.id), 0);
      projectId = maxId + 1;
    }
  }
});