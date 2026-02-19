
import { pgTable, text, serial, varchar, date, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact Information
export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  summary: text("summary").notNull(),
});

// Technical Skills
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // e.g., "Backend & Frameworks", "Frontend & UI"
  items: text("items").array().notNull(),
});

// Professional Experience
export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  period: text("period").notNull(),
  description: text("description").array().notNull(),
});

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  technologies: text("technologies").notNull(),
  description: text("description").array().notNull(),
});

// Education
export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  year: text("year").notNull(),
  grade: text("grade").notNull(),
});

// Additional Information
export const additionalInfo = pgTable("additional_info", {
  id: serial("id").primaryKey(),
  items: text("items").array().notNull(),
});

export const insertProfileSchema = createInsertSchema(profile);
export const insertSkillSchema = createInsertSchema(skills);
export const insertExperienceSchema = createInsertSchema(experience);
export const insertProjectSchema = createInsertSchema(projects);
export const insertEducationSchema = createInsertSchema(education);
export const insertAdditionalInfoSchema = createInsertSchema(additionalInfo);

export type Profile = typeof profile.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Education = typeof education.$inferSelect;
export type AdditionalInfo = typeof additionalInfo.$inferSelect;
