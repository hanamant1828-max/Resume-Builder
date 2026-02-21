
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
      summary: "Results-driven Software Developer with 4+ years of experience specializing in both modern web development and enterprise desktop applications. Proven expertise in building scalable web apps with React.js and architecting robust WPF desktop solutions using MVVM. Strong background in full-stack development with proficiency in C#, .NET, JavaScript, and SQL. Demonstrated ability to deliver high-quality software that improves system performance and user experience."
    });

    // 2. Skills
    await storage.createSkill({
      category: "Frontend & UI",
      items: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive Web Design", "Tailwind CSS", "Bootstrap"]
    });
    await storage.createSkill({
      category: "Desktop & Backend",
      items: ["WPF (Windows Presentation Foundation)", "XAML", "MVVM Pattern", "C#", ".NET Core", "Entity Framework"]
    });
    await storage.createSkill({
      category: "Databases & Tools",
      items: ["SQL Server", "PostgreSQL", "RESTful API Development", "Git", "Agile/Scrum"]
    });

    // 3. Experience
    await storage.createExperience({
      role: "Senior Software Engineer (WPF Specialist)",
      company: "Tech Solutions Inc.",
      period: "January 2020 - October 2023",
      description: [
        "Led the development of enterprise-level desktop applications using WPF and C#, serving 10,000+ corporate users.",
        "Architected and implemented robust MVVM patterns to ensure maintainable and testable codebases.",
        "Developed custom XAML controls and complex animations to enhance user experience and application aesthetics.",
        "Optimized application performance by implementing asynchronous programming and efficient data binding strategies.",
        "Integrated third-party UI libraries like DevExpress and Telerik for advanced data visualization and reporting."
      ]
    });

    await storage.createExperience({
      role: "Software Engineer",
      company: "b+m surface system",
      period: "November 2023 - Present",
      description: [
        "Developed and maintained full-stack web applications serving 500+ daily users",
        "Implemented advanced frontend features including complex state management, custom components, and responsive UI",
        "Designed and developed RESTful APIs for data exchange between multiple systems, improving system integration efficiency by 40%",
        "Optimized database queries and implemented caching strategies, resulting in 35% improvement in application response time",
        "Collaborated with cross-functional teams in Agile environment to deliver high-quality software solutions on schedule"
      ]
    });

    // 4. Projects
    await storage.createProject({
      title: "Real-Time SCADA Visualization System",
      technologies: "VisiWin, MS SQL Server, Syncfusion, PLC Integration",
      description: [
        "Developed a real-time SCADA visualization application using VisiWin for industrial process monitoring and control.",
        "Designed interactive HMI screens to display live machine data, alarms, and production parameters.",
        "Integrated Syncfusion components for advanced data visualization such as charts, grids, and dashboards.",
        "Used MS SQL Server for storing historical data, alarm logs, and production reports.",
        "Implemented role-based access and ensured smooth real-time communication between PLC systems and the application."
      ]
    });

    await storage.createProject({
      title: "AGV Fleet Management & Monitoring System",
      technologies: "MS SQL Server, Syncfusion, Real-Time Tracking, Dashboard Visualization",
      description: [
        "Developed an AGV (Automated Guided Vehicle) Management Application to monitor, control, and manage multiple AGVs in a manufacturing environment.",
        "The system provides real-time tracking of AGV locations, task assignments, battery status, and operational alerts.",
        "Integrated Syncfusion controls for dashboard visualization, task grids, and performance reports.",
        "Used MS SQL Server for storing task history, movement logs, and error records.",
        "Designed operator-friendly interfaces for dispatching tasks and monitoring fleet performance."
      ]
    });

    await storage.createProject({
      title: "Human Resource Management System (HRMS)",
      technologies: "React.js, .NET Web API, SQL Server, Bootstrap",
      description: [
        "Developed a comprehensive Human Resource Management System (HRMS) using React.js for the frontend and .NET Web API for backend services.",
        "Managed core HR operations including Employee Management, Leave Management, Attendance Tracking, and Payroll Processing.",
        "Designed responsive and interactive user interfaces using React functional components and hooks.",
        "Implemented secure authentication and role-based access control for Administrators, HR, and Employees."
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
        "Strong problem-solving abilities with experience in debugging complex applications",
        "Excellent team collaboration and communication skills in Agile/Scrum environments",
        "Passionate about learning new technologies and staying current with industry best practices",
        "Available for immediate joining and open to relocation"
      ]
    });
  }
}
