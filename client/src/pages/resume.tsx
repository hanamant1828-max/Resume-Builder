import { useResume } from "@/hooks/use-resume";
import { SectionHeader } from "@/components/section-header";
import { ExperienceItem } from "@/components/experience-item";
import { ProjectCard } from "@/components/project-card";
import { SkillGroup } from "@/components/skill-group";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Phone, MapPin, Printer, Download, Briefcase, GraduationCap, Code, FolderGit2, User } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResumePage() {
  const { data, isLoading, error } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      // Create canvas from the resume element
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2, // Higher scale for better resolution
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calculate ratio to fit width
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0; // Top aligned

      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 dimensions: 210mm x 297mm
      pdf.save('resume.pdf');
    } catch (err) {
      console.error("Failed to generate PDF", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium animate-pulse">Loading Resume...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-red-100 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Unable to Load</h2>
          <p className="text-gray-600 mb-6">We couldn't fetch the resume data. Please try again later.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 md:py-12 bg-slate-50 print:bg-white print:p-0 font-sans">
      
      {/* Action Bar - Hidden when printing */}
      <div className="max-w-[210mm] mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 no-print">
        <h1 className="text-xl font-semibold text-slate-700 tracking-tight">Interactive Resume</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePrint} className="gap-2 bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm transition-all rounded-full px-6">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button onClick={handleDownloadPDF} className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all rounded-full px-6">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Resume Paper */}
      <div 
        ref={resumeRef}
        className="mx-auto bg-white resume-paper w-full max-w-[210mm] min-h-[297mm] p-[15mm] md:p-[20mm] rounded-2xl shadow-xl border border-slate-100 print:shadow-none print:border-none print:rounded-none print:w-full print:max-w-none print:p-0 print:m-0"
      >
        {/* Header Section */}
        <header className="mb-10 border-b-2 border-primary/20 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 tracking-tight">
            {data.profile.name}
          </h1>
          
          <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-slate-600 font-medium">
            <a href={`mailto:${data.profile.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Mail className="w-4 h-4" />
              </div>
              <span>{data.profile.email}</span>
            </a>
            <a href={`tel:${data.profile.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Phone className="w-4 h-4" />
              </div>
              <span>{data.profile.phone}</span>
            </a>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <MapPin className="w-4 h-4" />
              </div>
              <span>{data.profile.location}</span>
            </div>
          </div>

          <div className="mt-8 text-slate-700 leading-relaxed max-w-3xl text-lg border-l-4 border-primary/40 pl-6 bg-slate-50/50 py-4 pr-4 rounded-r-lg">
            {data.profile.summary}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column (Main Content) */}
          <div className="md:col-span-8 space-y-10">
            {/* Experience Section */}
            <section>
              <SectionHeader title="Experience" icon={<Briefcase className="w-5 h-5" />} />
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <ExperienceItem 
                    key={exp.id}
                    role={exp.role}
                    company={exp.company}
                    period={exp.period}
                    description={exp.description || []}
                  />
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section className="break-before-auto">
              <SectionHeader title="Projects" icon={<FolderGit2 className="w-5 h-5" />} />
              <div className="space-y-6">
                {data.projects.map((proj) => (
                  <ProjectCard 
                    key={proj.id}
                    title={proj.title}
                    technologies={proj.technologies}
                    description={proj.description || []}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Skills & Education) */}
          <div className="md:col-span-4 space-y-10">
            {/* Skills Section */}
            <section>
              <SectionHeader title="Skills" icon={<Code className="w-5 h-5" />} />
              <div className="space-y-4">
                {data.skills.map((skill) => (
                  <SkillGroup 
                    key={skill.id}
                    category={skill.category}
                    items={skill.items || []}
                  />
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <SectionHeader title="Education" icon={<GraduationCap className="w-5 h-5" />} />
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id} className="break-inside-avoid">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <div className="text-primary/80 font-medium">{edu.institution}</div>
                    <div className="flex justify-between items-center mt-1 text-sm text-muted-foreground">
                      <span>{edu.year}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold">{edu.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Additional Info Section */}
            <section>
              <SectionHeader title="Personal Details" icon={<User className="w-5 h-5" />} />
              <ul className="space-y-2">
                {data.additionalInfo.items?.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-primary/40 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      <footer className="max-w-[210mm] mx-auto mt-12 text-center text-sm text-gray-400 no-print pb-8">
        <p>Generated with React & Tailwind CSS</p>
      </footer>
    </div>
  );
}
