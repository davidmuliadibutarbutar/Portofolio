import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export const seedData = {
  profile: require('../data/profile.json'),
  projects: require('../data/projects.json'),
  experience: require('../data/experience.json'),
  skills: require('../data/skills.json'),
  education: require('../data/education.json'),
  publications: require('../data/publications.json'),
  certifications: require('../data/certifications.json'),
  languages: require('../data/languages.json'),
  users: require('../data/users.json')
};
