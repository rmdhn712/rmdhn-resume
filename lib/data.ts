export const profile = {
  name: "Ramadhan Akmalludin",
  role: "IoT Engineer | IT Helpdesk",
  tagline:
    "Building real-time IoT monitoring systems and supporting IT infrastructure with reliable, efficient solutions.",
  location: "Jati VIII No.1A RT08/09, Jakarta",
  email: "ramadhanakmalludin@gmail.com",
  phone: "+62 857-7328-7284",
  photo: "/profile-photo.jpg",
  resumeFile: "/cv.pdf",
  socials: [
    { name: "GitHub", url: "https://github.com/rmdhn712", icon: "github" },
  ],
};

export const about = {
  paragraph:
    "IoT Engineer & IT Helpdesk with 1.5 years of experience assembling, programming, configuring, and integrating IoT devices for environmental monitoring in real estate settings. Proven track record implementing real-time monitoring systems, including 27 elevator temperature sensors, sump pit monitoring across 6 critical points, and rooftop/ground water tank monitoring. Proficient in C++, Python, ESP32, MQTT, Wi-Fi, LoRa, and APIs, backed by strong troubleshooting and IT system maintenance skills.",
  details: [
    { label: "Location", value: "Jati VIII No.1A RT08/09, Jakarta" },
    { label: "Latest Education", value: "SMK Kencana 1 Jakarta (2018 – 2021)" },
    { label: "Experience", value: "1.5 Years — IoT Engineer & IT Helpdesk" },
    { label: "GitHub", value: "github.com/rmdhn712" },
  ],
};

export const experiences = [
  {
    id: 1,
    role: "IoT System Integration & Development",
    company: "IoT Engineer & IT Helpdesk",
    period: "Last 1.5 Years",
    description:
      "Assembled, programmed, configured, and integrated IoT devices for environmental monitoring in real estate applications. Developed real-time monitoring systems using ESP32, MQTT, Wi-Fi, LoRa, and APIs — successfully integrated 27 temperature sensors for elevator monitoring, sump pit monitoring across 6 critical points for wastewater containment, and rooftop/ground water tank monitoring. Monitored system health and produced periodic operational status reports for IoT devices.",
    tags: ["ESP32", "MQTT", "LoRa", "C++", "Python", "API", "JavaScript"],
  },
  {
    id: 2,
    role: "IT Infrastructure & Technical Support",
    company: "IoT Engineer & IT Helpdesk",
    period: "Last 1.5 Years",
    description:
      "Configured IP addresses and established local network setups. Installed and configured LAN networks to ensure optimal connectivity. Executed hardware and software troubleshooting responsively. Perform monitoring using Grafana. Perform quality checks on the console device, covering everything from the hardware to the applications. Provide tenants with guidance on how to use the company's console and apps. Providing assistance with IT-related issues. Collaborate with developers on app-related issues",
    tags: ["Networking", "LAN", "IP Config", "Troubleshooting"],
  },
];

export const skillCategories = [
  {
    category: "IoT & Embedded",
    skills: [
      { name: "ESP32 / ESP-IDF", level: 70 },
      { name: "Arduino IDE", level: 80 },
      { name: "C++", level: 60 },
      { name: "Python", level: 65 },
      { name: "MQTT & LoRa", level: 80 },
      { name: "APIs", level: 70 },
      { name: "JavaScript", level : 55 },
    ],
  },
  {
    category: "IT & Networking",
    skills: [
      { name: "Networking & IP Config", level: 70 },
      { name: "LAN Setup", level: 85 },
      { name: "Hardware & Software", level: 78 },
      { name: "Troubleshooting", level: 80 },
    ],
  },
  {
    category: "Soft Skills",
    skills: [
      { name: "Problem Solving", level: 87 },
      { name: "Teamwork", level: 90 },
      { name: "Technical Reporting", level: 90 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Projects & Gallery
//
// HOW TO ADD IMAGES (no code needed):
//   Drop any number of .png/.jpg/.jpeg/.webp/.gif/.avif files into the
//   project's folder, e.g. public/projects/elevator-temperature/
//   They are picked up automatically at build time (sorted by file name) and
//   shown in the project card, the lightbox and the Gallery section.
//   A file name like "01-dashboard-view.png" becomes the caption
//   "dashboard view" (the leading number only controls the order).
//
// OR list them by hand in "images" below. Each entry is either a path string
// or { src, caption }.
// ---------------------------------------------------------------------------
export type ProjectImage = { src: string; caption?: string };
type ImageInput = string | ProjectImage;

const toImage = (i: ImageInput): ProjectImage =>
  typeof i === "string" ? { src: i } : i;

const rawProjects: {
  id: number;
  title: string;
  description: string;
  folder: string; // folder inside /public/projects/ scanned for extra images
  images: ImageInput[];
  tags: string[];
  link: string;
  repo: string;
}[] = [
  {
    id: 1,
    title: "IoT Monitoring Dashboard",
    description:
      "Unified building-management dashboard that brings every IoT system together in one real-time view, with Normal / Warning / Critical / Disconnected status counts per system and a daily sensor-check log.",
    folder: "dashboard",
    images: [{ src: "/Dashboard.png", caption: "Dashboard overview and sensor status log" }],
    tags: ["Dashboard", "Real-time", "Grafana"],
    link: "",
    repo: "https://github.com/rmdhn712",
  },
  {
    id: 2,
    title: "Elevator Temperature Monitoring System",
    description:
      "Real-time IoT system monitoring temperature across 27 elevator sensors, streaming data via ESP32 and MQTT to an operational dashboard so the technical team can respond quickly to temperature anomalies.",
    folder: "elevator-temperature",
    images: [{ src: "/Temp.png", caption: "Elevator temperature monitoring" }],
    tags: ["Temperature & Humidity"],
    link: "",
    repo: "https://github.com/rmdhn712",
  },
  {
    id: 3,
    title: "Sump Pit Monitoring System (6 Critical Points)",
    description:
      "Integrated temperature and water-level sensors across 6 critical sump pit points for wastewater containment monitoring, with automatic alerts whenever thresholds are exceeded.",
    folder: "sump-pit",
    images: [{ src: "/Sump.png", caption: "Sump pit water level monitoring" }],
    tags: ["Water Level Sump Pit"],
    link: "",
    repo: "https://github.com/rmdhn712",
  },
  {
    id: 4,
    title: "Rooftop & Ground Water Tank Monitoring System",
    description:
      "Real-time monitoring of temperature and water level for rooftop and ground water tanks using IoT sensors, connected to an API for periodic operational status reporting.",
    folder: "water-tank",
    images: [{ src: "/Water.png", caption: "Rooftop & ground water tank monitoring" }],
    tags: ["Water Level Ground & Rooftop"],
    link: "",
    repo: "https://github.com/rmdhn712",
  },
];

export type Project = Omit<(typeof rawProjects)[number], "images"> & {
  images: ProjectImage[];
};

export const projects: Project[] = rawProjects.map((p) => ({
  ...p,
  images: p.images.map(toImage),
}));
