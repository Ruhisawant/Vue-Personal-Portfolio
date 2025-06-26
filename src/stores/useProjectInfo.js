import { defineStore } from 'pinia';

export const useProjectInfo = defineStore('projectInfo', {
  state: () => ({
    projects: [
      { id: 1, name: 'Project A', description: 'Description of Project A' },
      { id: 2, name: 'Project B', description: 'Description of Project B' },
      { id: 3, name: 'Project C', description: 'Description of Project C' }
    ]
  }),
  persist: true
});