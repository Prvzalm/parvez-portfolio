export interface CuratedRepository {
  name: string;
  description: string;
  language: string;
  url: string;
  stars?: number;
  forks?: number;
}

const todo = "TODO — add verified repository metadata";

export const repositories: CuratedRepository[] = [
  { name: "realtime-whiteboard", description: "TODO — add a verified repository description.", language: todo, url: "https://github.com/Prvzalm/realtime-whiteboard" },
  { name: "LMS_system", description: "TODO — add a verified repository description.", language: todo, url: "https://github.com/Prvzalm/LMS_system" },
  { name: "MainWebSite", description: "TODO — add a verified repository description.", language: todo, url: "https://github.com/Prvzalm/MainWebSite" },
  { name: "Algorooms-Dashboard", description: "TODO — add a verified repository description.", language: todo, url: "https://github.com/Prvzalm/Algorooms-Dashboard" }
];
