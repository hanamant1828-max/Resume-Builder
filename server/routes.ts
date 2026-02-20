
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.resume.get.path, async (req, res) => {
    const [profile, skills, experience, projects, education, additionalInfo] = await Promise.all([
      storage.getProfile(),
      storage.getSkills(),
      storage.getExperience(),
      storage.getProjects(),
      storage.getEducation(),
      storage.getAdditionalInfo()
    ]);

    if (!profile) {
      // If no data exists, we should probably seed it or return empty
      // For now, let's assume seed data will run
      return res.status(404).json({ message: "Resume data not found" });
    }

    res.json({
      profile,
      skills,
      experience,
      projects,
      education,
      additionalInfo
    });
  });

  // Seed database
  await seedDatabase();

  return httpServer;
}

export async function seedDatabase() {
  const existingProfile = await storage.getProfile();
  if (!existingProfile) {
    // 1. Profile
    await storage.createProfile({
      name: "HANAMANT P PATIL",
      email: "hanamant5496@gmail.com",
      phone: "7022478751",
      location: "Khanapur, Belagavi, Karnataka",
      summary: "Results-driven Software Developer with 2+ years of experience specializing in .NET technologies, including ASP.NET Core MVC and WPF desktop applications. Proven expertise in developing scalable web applications, industrial automation systems with PLC integration, and implementing MVVM architecture. Strong background in full-stack development with proficiency in C#, Entity Framework, SQL Server, and modern UI frameworks. Demonstrated ability to deliver high-quality software solutions that improve system performance and enhance user experience."
    });

    // 2. Skills
    await storage.createSkill({
      category: "Backend & Frameworks",
      items: ["ASP.NET Core MVC", "ASP.NET MVC", "Entity Framework Core", "RESTful API Development", "WPF", "MVVM Pattern", "Data Binding", "Dependency Injection", "Authentication & Authorization (ASP.NET Identity)"]
    });
    await storage.createSkill({
      category: "Programming & Databases",
      items: ["C#", "Asynchronous Programming (async/await)", "SQL Server", "T-SQL", "Database Design & Optimization", "Threading & Multithreading", "Performance Optimization"]
    });
    await storage.createSkill({
      category: "Frontend & UI",
      items: ["HTML5", "CSS3", "JavaScript", "jQuery", "Razor Pages", "XAML", "Responsive Web Design", "Bootstrap", "React.js"] // Added React.js as implied by the new project
    });
    await storage.createSkill({
      category: "Tools & Methodologies",
      items: ["Git", "GitHub", "Version Control", "Agile/Scrum Methodology", "Visual Studio", "VS Code", "Debugging & Troubleshooting"]
    });

    // 3. Experience
    await storage.createExperience({
      role: "Associate Software Engineer",
      company: "b+m surface system",
      period: "November 2023 - Present",
      description: [
        "Developed and maintained full-stack web applications using ASP.NET Core MVC with C# and Entity Framework Core, serving 500+ daily users",
        "Built enterprise-grade WPF desktop applications using MVVM architecture pattern for industrial automation and control systems",
        "Integrated PLC systems with WPF applications using VisiWin server for real-time data monitoring and control, reducing manual monitoring by 60%",
        "Implemented advanced WPF features including complex data binding, custom controls, and responsive UI for touch-screen displays",
        "Designed and developed RESTful APIs for data exchange between multiple systems, improving system integration efficiency by 40%",
        "Optimized database queries and implemented caching strategies, resulting in 35% improvement in application response time",
        "Collaborated with cross-functional teams in Agile environment to deliver high-quality software solutions on schedule"
      ]
    });

    // 4. Projects
    await storage.createProject({
      title: "WPF Industrial Automation System with PLC Integration",
      technologies: "WPF, C#, MVVM, VisiWin Server, PLC Integration, Entity Framework, SQL Server",
      description: [
        "Developed codeless automation testing tool for industrial HMI applications using WPF and MVVM pattern",
        "Implemented real-time communication with PLC systems through VisiWin server APIs for bidirectional data exchange",
        "Created interactive dashboards for monitoring PLC variables, system status, and historical trend analysis",
        "Designed custom WPF controls for touch-screen industrial displays with responsive UI patterns",
        "Achieved 60% reduction in manual monitoring effort through automated alert systems and data logging features"
      ]
    });

    // 5. Education
    await storage.createEducation({
      degree: "Bachelor of Engineering in Computer Science",
      institution: "S.G. Balekundri Institute of Technology, Belagavi (VTU)",
      year: "2023",
      grade: "CGPA: 7.5/10"
    });

    // 6. Additional Info
    await storage.createAdditionalInfo({
      items: [
        "Strong problem-solving abilities with experience in debugging complex multi-tier applications",
        "Excellent team collaboration and communication skills in Agile/Scrum environments",
        "Passionate about learning new technologies and staying current with industry best practices",
        "Available for immediate joining and open to relocation"
      ]
    });
  }
}
