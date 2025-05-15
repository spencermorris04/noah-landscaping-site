// src/data/gallery.ts
export interface Project {
  id: number;
  before: string;  // now a URL
  after: string;   // now a URL
}

export const projects: Project[] = [
  {
    id: 1,
    before: 'https://cdn.entergynewsroom.com/userfiles/NeighborhoodLights.jpg',
    after:  'https://www.kichler.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fvpu87v9zuty9%2F2bgiEEDs3F0BWXSpEYyA3U%2Ff2016f7e4b8c774967c288524150af9a%2FLandscape-HinckleyHome-12V-LED-Halleron-Front-Overall-Best_1920x690.jpg&w=3840&q=75',
  },
  {
    id: 2,
    before: 'https://www.jcbackings.com/galfull/CT-1101.jpg',
    after:  'https://theperfectlight.com/wp-content/uploads/2024/03/security-lighting-the-perfect-light-tx.jpg',
  },
  // …more entries
];
