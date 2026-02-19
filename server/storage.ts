
import { 
  db 
} from "./db";
import { 
  profile, skills, experience, projects, education, additionalInfo,
  type Profile, type Skill, type Experience, type Project, type Education, type AdditionalInfo,
  type InsertProfile, type InsertSkill, type InsertExperience, type InsertProject, type InsertEducation, type InsertAdditionalInfo
} from "@shared/schema";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  getSkills(): Promise<Skill[]>;
  getExperience(): Promise<Experience[]>;
  getProjects(): Promise<Project[]>;
  getEducation(): Promise<Education[]>;
  getAdditionalInfo(): Promise<AdditionalInfo | undefined>;
  
  // Seed methods
  createProfile(data: any): Promise<Profile>;
  createSkill(data: any): Promise<Skill>;
  createExperience(data: any): Promise<Experience>;
  createProject(data: any): Promise<Project>;
  createEducation(data: any): Promise<Education>;
  createAdditionalInfo(data: any): Promise<AdditionalInfo>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const [result] = await db.select().from(profile);
    return result;
  }
  
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience);
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async getAdditionalInfo(): Promise<AdditionalInfo | undefined> {
    const [result] = await db.select().from(additionalInfo);
    return result;
  }

  async createProfile(data: any): Promise<Profile> {
    const [result] = await db.insert(profile).values(data).returning();
    return result;
  }

  async createSkill(data: any): Promise<Skill> {
    const [result] = await db.insert(skills).values(data).returning();
    return result;
  }

  async createExperience(data: any): Promise<Experience> {
    const [result] = await db.insert(experience).values(data).returning();
    return result;
  }

  async createProject(data: any): Promise<Project> {
    const [result] = await db.insert(projects).values(data).returning();
    return result;
  }

  async createEducation(data: any): Promise<Education> {
    const [result] = await db.insert(education).values(data).returning();
    return result;
  }

  async createAdditionalInfo(data: any): Promise<AdditionalInfo> {
    const [result] = await db.insert(additionalInfo).values(data).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
