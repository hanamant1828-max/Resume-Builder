
import { z } from 'zod';
import { 
  insertProfileSchema, 
  insertSkillSchema, 
  insertExperienceSchema, 
  insertProjectSchema, 
  insertEducationSchema, 
  insertAdditionalInfoSchema,
  profile,
  skills,
  experience,
  projects,
  education,
  additionalInfo
} from './schema';

export const api = {
  resume: {
    get: {
      method: 'GET' as const,
      path: '/api/resume' as const,
      responses: {
        200: z.object({
          profile: z.custom<typeof profile.$inferSelect>(),
          skills: z.array(z.custom<typeof skills.$inferSelect>()),
          experience: z.array(z.custom<typeof experience.$inferSelect>()),
          projects: z.array(z.custom<typeof projects.$inferSelect>()),
          education: z.array(z.custom<typeof education.$inferSelect>()),
          additionalInfo: z.custom<typeof additionalInfo.$inferSelect>(),
        }),
      },
    },
  },
};
