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
      "Configured IP addresses and established local network setups. Installed and configured LAN networks to ensure optimal connectivity. Executed hardware and software troubleshooting responsively.",
    tags: ["Networking", "LAN", "IP Config", "Troubleshooting"],
  },
];

export const skillCategories = [
  {
    category: "IoT & Embedded",
    skills: [
      { name: "ESP32 / ESP-IDF", level: 72 },
      { name: "Arduino IDE", level: 80 },
      { name: "C++", level: 79 },
      { name: "Python", level: 75 },
      { name: "MQTT & LoRa", level: 80 },
      { name: "APIs", level: 70 },
      { name: "JavaScript", level : 67 },
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

// Note: replace the image paths and repo/link once real project photos are sent.
// Each project has an "images" array (at least 3 photos) shown as a gallery
// carousel inside the detail modal, plus a single "description" field used
// on the card and in the modal.
export const projects = [
  {  
    id: 2,
    title: "Elevator Temperature Monitoring System",
    description:
      "Real-time IoT system monitoring temperature across 27 elevator sensors, streaming data via ESP32 and MQTT to an operational dashboard so the technical team can respond quickly to temperature anomalies.",
    images: ["/Temp.png"],
    tags: ["Temperature & Humidity"],
    link: "",
    repo: "https://github.com/rmdhn712",
  },
  {
    id: 3,
    title: "Sump Pit Monitoring System (6 Critical Points)",
    description:
      "Integrated temperature and water-level sensors across 6 critical sump pit points for wastewater containment monitoring, with automatic alerts whenever thresholds are exceeded.",
    images: ["/Sump.png"],
    tags: ["Water Level Sump Pit"],
    link: "",
    repo: "https://github.com/rmdhn712",
  },
  {
    id: 4,
    title: "Rooftop & Ground Water Tank Monitoring System",
    description:
      "Real-time monitoring of temperature and water level for rooftop and ground water tanks using IoT sensors, connected to an API for periodic operational status reporting.",
    images: ["/Water.png"],
    tags: ["Water Level Ground & Rooftop"],
    link: "",
    repo: "https://github.com/rmdhn712",
  },
];
