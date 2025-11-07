import React, { useState } from "react";
import {
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Code,
  Globe,
  Clock,
  CheckCircle,
  Circle,
  Star,
  Award,
  BookOpen,
  Users,
  Zap,
  Menu,
  X,
} from "lucide-react";
import profileimg from '../assets/profileimg.jpg'

export default function NotionDeveloper() {
  const [activeSection, setActiveSection] = useState("overview");
  const [expandedProjects, setExpandedProjects] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleProject = (projectId) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]
    );
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: <Globe className="w-4 h-4" /> },
    { id: "about", label: "About Me", icon: <Users className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <Code className="w-4 h-4" /> },
    { id: "skills", label: "Skills & Tools", icon: <Zap className="w-4 h-4" /> },
    { id: "experience", label: "Experience", icon: <Award className="w-4 h-4" /> },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ];

  const projects = [
    {
      id: "ecommerce",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      status: "Completed",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      features: ["User authentication", "Payment processing", "Admin dashboard", "Inventory management"],
      link: "https://github.com/dev/ecommerce",
      demo: "https://ecommerce-demo.com",
    },
    {
      id: "taskmanager",
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      status: "In Progress",
      tech: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
      features: ["Real-time collaboration", "Task assignments", "Progress tracking", "Team chat"],
      link: "https://github.com/dev/taskmanager",
      demo: "https://taskmanager-demo.com",
    },
    {
      id: "portfolio",
      title: "Portfolio Website",
      description: "Personal portfolio showcasing projects and skills",
      status: "Completed",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
      features: ["Responsive design", "Dark mode", "Contact form", "Blog integration"],
      link: "https://github.com/dev/portfolio",
      demo: "https://portfolio-demo.com",
    },
  ];

  const skills = {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
    Backend: ["Node.js", "Express", "Python", "Django", "PostgreSQL"],
    Tools: ["Git", "Docker", "AWS", "Figma", "VS Code"],
    "Currently Learning": ["GraphQL", "React Native", "Kubernetes"],
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
            <Code className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-100 text-sm">Faisal Mehmood</h1>
            <p className="text-xs text-gray-400">Full Stack Developer</p>
          </div>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-colors"
          aria-label="toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleMobileMenu} />}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 flex-shrink-0 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:relative lg:translate-x-0`}
      >
<div className="hidden lg:block p-6 border-b border-gray-800">
  <div className="flex items-center space-x-3">
    {/* Replace icon with your image */}
    <div className="w-18 h-18 rounded-lg overflow-hidden ">
      <img
        src={profileimg} // 🧠 Replace with your actual image path (e.g. "./assets/faisal.jpg")
        alt="Faisal Mehmood"
        className="w-full h-full object-cover"
      />
    </div> 

    <div>
      <h1 className="font-semibold text-gray-100">Faisal Mehmood</h1>
      <p className="text-sm text-gray-400">Software Engineer</p>
    </div>
  </div>
</div>


        <nav className="p-4 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors mb-1 ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-orange-900/50 to-red-900/50 text-orange-200 border border-orange-800/50"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-gray-400">Available for work</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Overview */}
          {activeSection === "overview" && (
            <section className="space-y-6 sm:space-y-8">
              <header>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  Faisal Mehmood
                </h1>
                <p className="text-lg sm:text-xl text-gray-400 mb-4 sm:mb-6">Full Stack Developer & QA Engineer</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-orange-800/50 transition-colors">
                    <div className="flex items-center space-x-3 mb-3">
                      <MapPin className="w-5 h-5 text-orange-400" />
                      <span className="text-gray-300">Location</span>
                    </div>
                    <p className="text-gray-100">Rawalpindi,Pakistan</p>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-orange-800/50 transition-colors">
                    <div className="flex items-center space-x-3 mb-3">
                      <Clock className="w-5 h-5 text-orange-400" />
                      <span className="text-gray-300">Experience</span>
                    </div>
                    <p className="text-gray-100">1+ Years</p>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-emerald-800/50 transition-colors sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-gray-300">Status</span>
                    </div>
                    <p className="text-emerald-400">Available</p>
                  </div>
                </div>
              </header>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-orange-800/30 transition-colors">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-100 mb-4 flex items-center">
                  <Zap className="w-5 h-5 text-orange-400 mr-2" />
                  Quick Stats
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="text-center p-3 sm:p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-orange-400">10+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Projects</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-red-400">1+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Years Exp</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-orange-400">35+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Commits/Month</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-emerald-400">98%</div>
                    <div className="text-xs sm:text-sm text-gray-400">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* About */}
          {activeSection === "about" && (
            <section className="space-y-6 sm:space-y-8">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                About Me
              </h1>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 hover:border-orange-800/30 transition-colors">
                <p className="text-gray-300 leading-relaxed mb-4">
                  I'm a passionate full-stack developer with over 3 years of experience building web applications. I love creating clean, efficient code and beautiful user interfaces that solve real-world problems.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community through blog posts and mentoring.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-orange-800/30 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-orange-400" />
                    Education
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="font-medium text-gray-200">B.S. Computer Science</p>
                      <p className="text-sm text-orange-300">University of California, Berkeley</p>
                      <p className="text-sm text-gray-500">2019 - 2023</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-orange-800/30 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-amber-400" />
                    Achievements
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 bg-gray-800/30 rounded">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="text-sm text-gray-300">Top 1% on Stack Overflow</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-800/30 rounded">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="text-sm text-gray-300">Open Source Contributor</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-800/30 rounded">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="text-sm text-gray-300">Hackathon Winner 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Projects */}
          {activeSection === "projects" && (
            <section className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                Projects
              </h1>

              {projects.map((project) => (
                <article
                  key={project.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg hover:border-orange-800/30 transition-colors"
                >
                  <div className="p-4 sm:p-6 cursor-pointer" onClick={() => toggleProject(project.id)}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                        <ChevronRight
                          className={
                            expandedProjects.includes(project.id)
                              ? "w-5 h-5 text-orange-400 transition-transform rotate-90 mt-0.5 flex-shrink-0"
                              : "w-5 h-5 text-orange-400 transition-transform mt-0.5 flex-shrink-0"
                          }
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-100 mb-1">{project.title}</h3>
                          <p className="text-gray-400 text-sm sm:text-base">{project.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 ml-3">
                        <span
                          className={
                            project.status === "Completed"
                              ? "px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/50 text-emerald-300 border border-emerald-800/50 whitespace-nowrap"
                              : "px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-amber-900/50 text-amber-300 border border-amber-800/50 whitespace-nowrap"
                          }
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {expandedProjects.includes(project.id) && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-800">
                      <div className="pt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-orange-300 mb-2">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 sm:px-3 py-1 bg-orange-900/30 text-orange-200 rounded-full text-xs border border-orange-800/50"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-orange-300 mb-2">Key Features</h4>
                          <ul className="space-y-1">
                            {project.features.map((feature, i) => (
                              <li key={i} className="flex items-start space-x-2 text-sm text-gray-400">
                                <Circle className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-2">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center space-x-2 text-sm text-orange-300 hover:text-orange-200 transition-colors px-3 py-2 bg-orange-900/20 rounded-lg border border-orange-800/30"
                          >
                            <Github className="w-4 h-4" />
                            <span>View Code</span>
                          </a>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center space-x-2 text-sm text-red-300 hover:text-red-200 transition-colors px-3 py-2 bg-red-900/20 rounded-lg border border-red-800/30"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </section>
          )}

          {/* Skills */}
          {activeSection === "skills" && (
            <section className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                Skills & Tools
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div
                    key={category}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-orange-800/30 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-orange-400" />
                      {category}
                    </h3>
                    <div className="space-y-3">
                      {skillList.map((skill) => (
                        <div key={skill} className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg">
                          <span className="text-gray-300 text-sm sm:text-base">{skill}</span>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                  i < (category === "Currently Learning" ? 2 : 4)
                                    ? "bg-gradient-to-r from-orange-500 to-red-500"
                                    : "bg-gray-700"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {activeSection === "experience" && (
            <section className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                Experience
              </h1>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-orange-800/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="text-lg font-semibold text-gray-100">Senior Frontend Developer</h3>
                      <p className="text-orange-300">TechCorp Inc.</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full self-start">2022 - Present</span>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start space-x-2 p-2 bg-gray-800/30 rounded">
                      <Circle className="w-3 h-3 mt-2 flex-shrink-0 text-orange-400" />
                      <span className="text-sm sm:text-base">Led development of customer-facing web applications serving 100k+ users</span>
                    </li>
                    <li className="flex items-start space-x-2 p-2 bg-gray-800/30 rounded">
                      <Circle className="w-3 h-3 mt-2 flex-shrink-0 text-orange-400" />
                      <span className="text-sm sm:text-base">Improved application performance by 40% through code optimization</span>
                    </li>
                    <li className="flex items-start space-x-2 p-2 bg-gray-800/30 rounded">
                      <Circle className="w-3 h-3 mt-2 flex-shrink-0 text-orange-400" />
                      <span className="text-sm sm:text-base">Mentored junior developers and conducted code reviews</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-orange-800/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="text-lg font-semibold text-gray-100">Full Stack Developer</h3>
                      <p className="text-orange-300">StartupXYZ</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full self-start">2021 - 2022</span>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start space-x-2 p-2 bg-gray-800/30 rounded">
                      <Circle className="w-3 h-3 mt-2 flex-shrink-0 text-red-400" />
                      <span className="text-sm sm:text-base">Built and maintained full-stack web applications using React and Node.js</span>
                    </li>
                    <li className="flex items-start space-x-2 p-2 bg-gray-800/30 rounded">
                      <Circle className="w-3 h-3 mt-2 flex-shrink-0 text-red-400" />
                      <span className="text-sm sm:text-base">Collaborated with design team to implement pixel-perfect UI components</span>
                    </li>
                    <li className="flex items-start space-x-2 p-2 bg-gray-800/30 rounded">
                      <Circle className="w-3 h-3 mt-2 flex-shrink-0 text-red-400" />
                      <span className="text-sm sm:text-base">Integrated third-party APIs and payment processing systems</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Contact */}
          {activeSection === "contact" && (
            <section className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                Get In Touch
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-orange-800/30 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-orange-400" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                      <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm sm:text-base break-all">chai.lover@email.com</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                      <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm sm:text-base">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                      <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm sm:text-base">San Francisco, CA</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                      <Calendar className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm sm:text-base">Available for new projects</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-orange-800/30 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-red-400" />
                    Social Links
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="#"
                      className="flex items-center space-x-3 text-gray-300 hover:text-orange-300 transition-colors p-3 bg-gray-800/30 rounded-lg hover:bg-orange-900/20"
                    >
                      <Github className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base break-all">github.com/yourusername</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-3 text-gray-300 hover:text-orange-300 transition-colors p-3 bg-gray-800/30 rounded-lg hover:bg-orange-900/20"
                    >
                      <Linkedin className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base break-all">linkedin.com/in/yourhandle</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-3 text-gray-300 hover:text-orange-300 transition-colors p-3 bg-gray-800/30 rounded-lg hover:bg-orange-900/20"
                    >
                      <Twitter className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base break-all">twitter.com/yourhandle</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-orange-800/30 transition-colors">
                <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-emerald-400" />
                  Availability
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-emerald-900/20 rounded-lg border border-emerald-800/30">
                    <div className="text-lg font-semibold text-emerald-400">Available</div>
                    <div className="text-sm text-gray-400">For new projects</div>
                  </div>
                  <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-800/30">
                    <div className="text-lg font-semibold text-orange-400">24 hours</div>
                    <div className="text-sm text-gray-400">Response time</div>
                  </div>
                  <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-800/30 sm:col-span-2 lg:col-span-1">
                    <div className="text-lg font-semibold text-red-400">Remote</div>
                    <div className="text-sm text-gray-400">Work preference</div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
