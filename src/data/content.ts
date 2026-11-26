/**
 * Single source of truth for every piece of personal and professional data on
 * this site. Nothing here is duplicated in a component. When the CV changes,
 * this file is the only edit.
 *
 * Last reconciled against CV: November 2026.
 */

export interface Role {
  title: string;
  organisation: string;
  location: string;
  start: string;
  end: string | null; // null === currently held
  kind: 'work' | 'education' | 'volunteer';
  /**
   * Optional scene-setter, shown as a paragraph above the bullets. Use it when
   * the organisation itself needs explaining; leave it off when the bullets
   * already stand on their own.
   */
  summary?: string;
  highlights: string[];
}

export interface EducationEntry {
  qualification: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  honours?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

/**
 * Resolves a file in `public/` to a URL that survives the deploy base path.
 *
 * GitHub Pages serves this site from /Portfolio/, so a hardcoded "/media/x.jpg"
 * would 404 there while working fine locally. Always wrap public files in this.
 *
 *   asset('media/poznan-workshop.jpg')  ->  /Portfolio/media/poznan-workshop.jpg
 */
export function asset(pathFromPublic: string): string {
  return import.meta.env.BASE_URL + pathFromPublic.replace(/^\//, '');
}

export interface MediaItem {
  type: 'image' | 'video';
  /** Use asset('media/…') so the deploy base path is applied. */
  src: string;
  /**
   * Images: describe the content for screen readers. Videos: a short label.
   * Never leave this empty for an image that carries meaning.
   */
  alt: string;
  /** Videos only: still frame shown before playback. */
  poster?: string;
  /** Optional visible caption under the item. */
  caption?: string;
}

export interface ProjectDoc {
  /** e.g. "Design report (PDF)": say what it is and what format. */
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  repo: string;
  demo?: string;
  year: string;
  context?: string;
  /**
   * The picture on the card itself, before anyone hovers or opens it.
   *
   * Falls back to the first image in `media`, and then to generated artwork,
   * so a card is never blank. Cards are 4:3 and the image is cropped to fill, so
   * around 1200x900 works well.
   *
   * `alt` is usually omitted: the card's heading already names the project, so
   * a cover showing that project is decorative. Fill it in only when the image
   * says something the heading does not.
   */
  cover?: { src: string; alt?: string };
  /** Screenshots, demo clips, posters. Revealed when a card is opened. */
  media?: MediaItem[];
  /** Reports, write-ups, slide decks. Revealed when a card is opened. */
  docs?: ProjectDoc[];
}

export interface Achievement {
  title: string;
  detail: string;
  year: string;
  media?: MediaItem[];
}

/* -------------------------------------------------------------------------- */
/* Identity                                                                    */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: 'Harsha Varthini Maniraj',
  shortName: 'Harsha',
  title: 'Software Engineer',
  location: 'Sydney, NSW',
  country: 'Australia',

  /**
   * Headline, set over two lines. The highlighted word is rendered in coral,
   * so it has to sit at the end of the second line.
   */
  headline: {
    firstLine: 'A love for building',
    secondLine: {
      lead: 'things that',
      highlight: 'matter.',
    },
  },

  /** One-liner under the hero headline. */
  strapline:
    "I'm a full-stack software engineer in Sydney with wide experience across software development, from building features to resolving production issues. I have worked on enterprise systems, internal tools, and web, mobile, and AI projects.",

  /**
   * Hero portrait. The file is composed 4:5 on the site teal so it fills the
   * hero frame without white corners; swap the file to change the photo.
   */
  portrait: {
    src: asset('media/harsha-portrait.jpg'),
    alt: 'Harsha Varthini Maniraj',
  },

  /** Availability, surfaced in the hero, the about page and contact. */
  availability: {
    status: 'Open to full-time roles',
    workRights: 'Full Australian working rights',
    sponsorship: 'No visa sponsorship required',
    summary:
      'Based in Sydney, available for full-time work, with full working rights in Australia and no sponsorship needed.',
  },

  /**
   * About-page narrative. Written as a portfolio voice, not a cover letter.
   */
  bio: [
    "I'm a software engineer in Sydney who got into this by way of the unglamorous parts. At Infosys, I spent a year and a half on enterprise applications (Java, Spring Boot, Angular, REST APIs), and most of what I learned came from the tickets like: the defect that only surfaced in production, the requirement that was never written down, the legacy screen everyone routed around.",
    "That turned out to be the useful education. I got comfortable reading code I didn't write, asking the question that unblocks a stand-up, and shipping something reliable.",
    "Since moving to Sydney for my Master of Information Technology at UTS, I've been deliberately widening the surface area. I've built an iOS app in SwiftUI, a café platformer in Unity and C#, a media-literacy simulation in React for the IEEE Metaverse Grand Challenge, an AI curriculum resource finder for the Cambridge EduX Hackathon, and a delivery dashboard that is now in use at Outcomex, where I intern.",
    "I also teach. I tutor Programming on the Internet and Systems Testing at UTS. Right now, I'm looking for a full-time engineering role in Sydney.",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

export const contact = {
  email: 'harshiismyname@gmail.com',
  phone: '0421 809 246',
  /** E.164 for the tel: href. */
  phoneHref: '+61421809246',
  linkedin: 'https://www.linkedin.com/in/harsha-varthini-maniraj-434a94209',
  github: 'https://github.com/Harsha-0-0',
  githubHandle: 'Harsha-0-0',
  /**
   * Public CV link. Set to a URL to show the "Download CV" buttons; set to null
   * and every CV affordance hides itself rather than rendering a dead link.
   */
  resumeUrl: asset('cv/Harsha-Varthini-Maniraj-CV.pdf') as string | null,
} as const;

/* -------------------------------------------------------------------------- */
/* Experience, reverse chronological                                          */
/* -------------------------------------------------------------------------- */

export const roles: Role[] = [
  {
    title: 'Technical Intern',
    organisation: 'Outcomex',
    location: 'Sydney, NSW',
    start: 'Jun 2026',
    end: null,
    kind: 'work',
    summary:
      'Contributing across engineering, AI innovation and customer-facing operations at Outcomex, an Australian systems integrator and Cisco Partner delivering enterprise networking, cyber security, cloud and collaboration solutions.',
    highlights: [
      'Identified a gap in project visibility and built an internal delivery dashboard from the ground up, with no pre-existing specification, using AI-assisted development and serverless API functions. It is now in use: it replaced a manual process and gives stakeholders real-time RAG status visibility.',
      'Release new versions of the dashboard as requirements change, and wrote the user guide and ran a live demo for its users.',
      'Building custom AI solutions for internal process improvements.',
      'Created an end-to-end process flowchart in Miro for the managed services team, standardising how monthly customer reports are produced.',
      'Authored internal engagement guides equipping the pre-sales team with sharper conversations ahead of customer calls.',
      'Participated in an outbound sales development initiative supporting business growth.',
      'Shadowed senior engineers and account teams across live customer and vendor meetings, building first-hand insight into how end-to-end IT solutions, including IoT and connected systems, are scoped, designed and delivered.',
      'Supported documentation, partner-program and certification audits.',
      'Operated within an agile delivery model, taking part in daily stand-ups across multiple concurrent project teams.',
      'Translated horizon-scanning research on emerging technologies into practical, business-relevant use cases, sharing the findings through internal technical briefings.',
    ],
  },
  {
    title: 'Academic Tutor',
    organisation: 'University of Technology Sydney',
    location: 'Sydney, NSW',
    start: 'Mar 2025',
    end: null,
    kind: 'work',
    highlights: [
      'Teach Programming on the Internet and Systems Testing and Quality Management, translating technical concepts into explanations undergraduates actually follow.',
      'Deliver in-person lab support on web applications and on automated testing with Selenium, TestCafe and Python.',
      'Help students debug their code, get asynchronous programming to click and troubleshoot dynamic web applications.',
      'Mark assignments and write feedback for 100+ students per semester.',
    ],
  },
  {
    title: 'Web Developer',
    organisation: 'Pass To Me',
    location: 'Sydney, NSW',
    start: 'Feb 2025',
    end: null,
    kind: 'volunteer',
    highlights: [
      "Revamped the organisation's Squarespace site, improving mobile responsiveness, accessibility and navigation.",
      'Applied custom styling and layout changes to deliver a cleaner, more modern interface, with content updates to improve usability and engagement.',
    ],
  },
  {
    title: 'Peer Networker',
    organisation: 'University of Technology Sydney',
    location: 'Sydney, NSW',
    start: 'Feb 2025',
    end: 'Feb 2025',
    kind: 'volunteer',
    highlights: [
      'Supported new students through Orientation, staffing help desks and resolving queries in real time.',
      'Led campus tours for large groups, helping manage crowds of up to 900 students per day.',
    ],
  },
  {
    title: 'iOS Developer',
    organisation: 'Apple Foundation Program',
    location: 'Sydney, NSW',
    start: 'Nov 2024',
    end: 'Nov 2024',
    kind: 'work',
    highlights: [
      'Designed and built a SwiftUI iOS prototype in a cross-functional team of five, presenting to an audience of 50+.',
    ],
  },
  {
    title: 'Senior Systems Associate',
    organisation: 'Infosys',
    location: 'Chennai, India',
    start: 'Dec 2021',
    end: 'Jun 2023',
    kind: 'work',
    highlights: [
      'Developed and maintained enterprise web applications in Java, Spring Boot, Angular and REST APIs across the full SDLC.',
      'Integrated Angular front ends with Spring Boot REST APIs, keeping communication between application layers and backend services reliable.',
      'Gathered business requirements and translated them into technical designs, writing the functional specifications and design documentation.',
      'Investigated production defects using Splunk for log analysis and Jira for tracking, reproduced issues locally, performed root cause analysis and documented each resolution with screenshots on the ticket.',
      'Queried and validated customer data through SQL-based systems and Salesforce to support operational accuracy.',
      'Ran integration testing, code review and release support, using Git in Agile delivery environments.',
      'Produced technical documentation and contributed to knowledge-sharing across the team, working in Agile teams alongside an onsite US team.',
    ],
  },
];

export const education: EducationEntry[] = [
  {
    qualification: 'Master of Information Technology',
    institution: 'University of Technology Sydney',
    location: 'Sydney, NSW',
    start: 'Jul 2024',
    end: 'May 2026',
    honours: "GPA 6.94/7.0 · Dean's List 2025 & 2026",
  },
  {
    qualification: 'Bachelor of Science, Information Technology and Management',
    institution: 'Lady Doak College',
    location: 'Madurai, India',
    start: 'Jun 2018',
    end: 'Jun 2021',
  },
];

/* -------------------------------------------------------------------------- */
/* Skills                                                                      */
/* -------------------------------------------------------------------------- */

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Java', 'Python', 'C#', 'JavaScript', 'TypeScript', 'SQL', 'Swift'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Angular', 'HTML5', 'CSS3', 'Zustand', 'Responsive Design'],
  },
  {
    label: 'Backend & APIs',
    items: [
      'Spring Boot',
      'Node.js',
      'Express',
      'ASP.NET Core',
      'REST APIs',
      'JWT Authentication',
      'Azure Functions',
      'API Integration',
      'Object-Oriented Design',
      'Microservices Concepts',
    ],
  },
  {
    label: 'Databases',
    items: [
      'SQL',
      'PostgreSQL',
      'SQLite',
      'Relational Database Design',
      'ER Modelling',
      'Dimensional Modelling',
      'Data Warehouse Design',
    ],
  },
  {
    // From the SpaceX capstone and the Business Intelligence coursework. These
    // are the libraries actually imported in those repos, not a wish list.
    label: 'Data & Analytics',
    items: [
      'Pandas',
      'NumPy',
      'scikit-learn',
      'Matplotlib',
      'Seaborn',
      'Plotly Dash',
      'Folium',
      'Jupyter',
      'Excel',
      'BeautifulSoup',
      'Data Storytelling',
    ],
  },
  {
    label: 'Mobile, Game & Design',
    items: ['SwiftUI', 'Xcode', 'Unity', 'Figma', 'Apple Human Interface Guidelines'],
  },
  {
    label: 'Testing & Delivery',
    items: [
      'Integration Testing',
      'Automated Testing',
      'Selenium',
      'TestCafe',
      'Defect Investigation',
      'Root Cause Analysis',
      'Code Review',
      'Agile Delivery',
      'SDLC',
      'Requirements Analysis',
      'Technical Documentation',
    ],
  },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'Jira', 'Splunk', 'Miro', 'Salesforce'],
  },
  {
    label: 'AI-Assisted Development',
    items: [
      'Claude',
      'Claude Code',
      'LLM API Integration',
      'Tiered LLM Pipelines',
      'Rapid Prototyping',
      'Debugging Workflows',
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Projects, sourced from github.com/Harsha-0-0                               */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    slug: 'teachsmart',
    name: 'TeachSmart',
    tagline: 'A resource finder for teachers that actually knows the curriculum.',
    description:
      'An AI-powered curriculum resource finder for Australian teachers, built with a team at the Cambridge EduX Hackathon. A React and TypeScript front end sits over a Node and Express API, and the search runs through a tiered LLM pipeline: the cheaper model first, a stronger one when the question needs it, and a static fallback so the app still answers when the APIs do not.',
    tech: ['React 19', 'Vite', 'TypeScript', 'Node.js', 'Express', 'LLM APIs'],
    repo: 'https://github.com/Harsha-0-0/TeachSmart',
    year: '2026',
    context: 'Cambridge EduX Hackathon 2026 · team project',
    cover: { src: asset('media/teachsmart-cover.jpg') },
    media: [
      {
        type: 'image',
        src: asset('media/teachsmart-pipeline.jpg'),
        alt: 'The search screen mid-run, showing three pipeline stages: CurricuLLM-AU mapping curriculum outcome codes marked done, trusted sources running across AIATSIS, the National Museum, Scootle and ABC Education, and merging and ranking queued.',
        caption: 'The search runs three stages in parallel, and shows you all three',
      },
      {
        type: 'image',
        src: asset('media/teachsmart-results.jpg'),
        alt: 'Results for a Year 9 NSW History search on Rights and Freedoms: a banner acknowledging Darug Country, a Local Lens panel about Parramatta and the Burramattagal people, a 75 per cent curriculum alignment bar with outcome codes, and the first ABC Education resource with a trust score of 72.',
        caption: 'Results carry the curriculum codes and the local context, not just links',
      },
      {
        type: 'image',
        src: asset('media/teachsmart-trust.jpg'),
        alt: 'An expanded trust report with three tiers: source intelligence scored 88 from deterministic signals, curriculum alignment scored 91 from the curriculum model, and quality flags raising a First Nations context review, combining to an overall 72 out of 100.',
        caption: 'Three tiers, each with its own score and its own formula shown',
      },
      {
        type: 'image',
        src: asset('media/teachsmart-lesson.jpg'),
        alt: 'A generated 60-minute lesson plan: materials needed, teacher preparation steps, a lesson timeline bar, and timed activities beginning with a five-minute hook and a twenty-minute explore block.',
        caption: 'One click turns a resource into a timed 60-minute lesson plan',
      },
    ],
  },
  {
    slug: 'misinformation-lab',
    name: 'The Misinformation Lab',
    tagline: 'Feel how it fools you, then watch yourself use the same trick.',
    description:
      "A media-literacy simulation that teaches by role reversal: you get tested on spotting fake posts, then run your own misinformation campaign, then get shown the connection. Entirely client-side, no login, no headset, just 88 KB of gzipped code. It includes a rule-based AI strategist with governance and refusal rules baked in, because a tool that teaches manipulation should have limits.",
    tech: ['React', 'Vite', 'Zustand', 'JavaScript'],
    repo: 'https://github.com/Harsha-0-0/The-Misinformation-Lab',
    year: '2026',
    context: 'IEEE Metaverse Grand Challenge 2026',
    cover: { src: asset('media/misinfo-cover.jpg') },
    media: [
      {
        type: 'image',
        src: asset('media/misinfo-detect.jpg'),
        alt: 'The detection round: a social post claiming an internal memo was leaked, with buttons to mark it fake or real and an option to check the post first.',
        caption: 'Phase 1: five posts, and the clock is running',
      },
      {
        type: 'image',
        src: asset('media/misinfo-composer.jpg'),
        alt: 'The campaign composer, with dropdowns for audience and emotional hook, and a choice between letting Vale write the post or writing it yourself.',
        caption: 'Phase 2: pick an audience and a hook, then let Vale write it',
      },
      {
        type: 'image',
        src: asset('media/misinfo-results.jpg'),
        alt: 'A profile page showing the fake post the player published, its reach and credibility, and a round one accuracy score of 40 per cent.',
        caption: 'Your own fake post, scored alongside your round one accuracy',
      },
    ],
  },
  {
    slug: 'cap-it-hot',
    name: 'Cap It Hot',
    tagline: 'Race the clock, dodge the chaos, serve the perfect cappuccino.',
    description:
      "A café-themed platformer where you play a mug trying to finish an order before it goes cold. Custom C# gameplay logic, collision systems and level progression, plus a temperature mechanic that turns 'don't touch the ice block' into an actual design constraint. Built as a team on Unity with Git.",
    tech: ['Unity', 'C#', 'ShaderLab', 'HLSL'],
    repo: 'https://github.com/Harsha-0-0/Computer-Game-Design-Digital-Game',
    year: '2026',
    context: 'Selected for UTS Tech Fest',
    cover: { src: asset('media/cap-it-hot.png') },
    media: [
      {
        type: 'image',
        src: asset('media/capithot-levels.png'),
        alt: 'Five level cards under the heading "Every great cappuccino follows a recipe", each naming its goal: 5 coffee beans, 20 coffee beans, 40 milk drops, 20 milk drops into foam, and 20 chocolate particles.',
        caption: 'Each level is one step of the recipe',
      },
      {
        type: 'image',
        src: asset('media/capithot-level2.jpg'),
        alt: 'Gameplay: the mug character on a lilac level with pressure zones, floating platforms, scattered coffee beans, a cold-to-hot temperature gauge and a bean counter.',
        caption: 'Pressure zones, hazards, and the temperature gauge',
      },
      {
        type: 'image',
        src: asset('media/capithot-end.jpg'),
        alt: 'The closing scene of Cap It Hot.',
        caption: 'The end scene',
      },
    ],
  },
  {
    slug: 'hospital-management',
    name: 'Hospital Management System',
    tagline: 'Role-based access, done properly, in a console.',
    description:
      'A console-based hospital system in C# with genuinely separate menus and permissions for Patients, Doctors and Administrators: appointment booking, record management and JSON-backed persistence that survives a restart. No framework doing the work; just careful object-oriented design.',
    tech: ['C#', '.NET', 'JSON'],
    repo: 'https://github.com/Harsha-0-0/Hospital-Management-System',
    year: '2025',
    cover: { src: asset('media/hospital-cover.jpg') },
    media: [
      {
        type: 'image',
        src: asset('media/hospital-login.png'),
        alt: 'The login screen: a bordered banner reading "DOTNET HOSPITAL MANAGEMENT SYSTEM" above "-- Login --", with an ID prompt waiting for input.',
        caption: 'One login for all three roles',
      },
      {
        type: 'image',
        src: asset('media/hospital-patient-menu.png'),
        alt: 'The patient menu listing six options: list patient details, list my doctor details, list all appointments, book appointment, exit to login and exit system.',
        caption: 'Patient menu',
      },
      {
        type: 'image',
        src: asset('media/hospital-patient-appointments.png'),
        alt: 'A patient\'s appointment list showing two bookings with appointment, patient and doctor IDs alongside descriptions for an annual heart check-up and a blood pressure review.',
        caption: 'A patient sees only their own appointments',
      },
      {
        type: 'image',
        src: asset('media/hospital-book-appointment.png'),
        alt: 'The booking screen, which picks up the patient\'s assigned doctor, takes a free-text description and confirms the appointment was booked.',
        caption: 'Booking against the assigned doctor',
      },
      {
        type: 'image',
        src: asset('media/hospital-doctor-menu.png'),
        alt: 'The doctor menu listing seven options, including list patients, list appointments, check a particular patient and list appointments with a patient.',
        caption: 'Doctor menu: a different set of powers',
      },
      {
        type: 'image',
        src: asset('media/hospital-doctor-patient-lookup.png'),
        alt: 'A doctor looking up patient 2 and seeing the name, email, phone, address and assigned doctor ID for Ben Carter.',
        caption: 'Looking up a patient on the doctor\'s own list',
      },
      {
        type: 'image',
        src: asset('media/hospital-admin-menu.png'),
        alt: 'The administrator menu listing eight options, including list all doctors, list all patients, check details and add a doctor or patient.',
        caption: 'Administrator menu: the whole hospital',
      },
    ],
  },
  {
    slug: 'style-mate',
    name: 'Style Mate',
    tagline: 'Fashion meets sustainability.',
    description:
      "An iOS app that fights fast fashion by making your existing wardrobe more interesting. Digitise what you own, categorise by type, colour and season, then let the mix-and-match engine generate outfits for the occasion. Built in SwiftUI against Apple's Human Interface Guidelines, with the interface prototyped in Figma first.",
    tech: ['Swift', 'SwiftUI', 'iOS'],
    repo: 'https://github.com/Harsha-0-0/Five-Stars',
    year: '2025',
    cover: { src: asset('media/stylemate-cover.jpg') },
    media: [
      {
        type: 'image',
        src: asset('media/stylemate-home.jpg'),
        alt: 'Style Mate home screen: a welcome greeting, an "Outfit of the Day" showing a black tee, tan trousers and white trainers, and a "Your Digital Wardrobe" section.',
        caption: 'Home: outfit of the day',
      },
      {
        type: 'image',
        src: asset('media/stylemate-wardrobe.jpg'),
        alt: 'The wardrobe screen with a search field and filters for category, colour and quality, above grouped items: five t-shirts, two jackets and five shirts.',
        caption: 'The digital wardrobe, filtered by category, colour and quality',
      },
      {
        type: 'image',
        src: asset('media/stylemate-shuffle.jpg'),
        alt: 'The Dresser screen showing a generated outfit with a Shuffle button beneath it.',
        caption: 'Dresser: shuffle for a new combination',
      },
      {
        type: 'image',
        src: asset('media/stylemate-swap.jpg'),
        alt: 'The Dresser screen with an individual garment selected to be swapped out of the outfit.',
        caption: 'Or swap a single piece by hand',
      },
      {
        type: 'video',
        src: asset('media/stylemate-demo.mp4'),
        poster: asset('media/stylemate-home.jpg'),
        alt: 'Screen recording of Style Mate: browsing the digital wardrobe and generating outfits.',
        caption: 'The app running',
      },
    ],
  },
  {
    slug: 'mobi',
    name: 'Mobi',
    tagline: 'Rehab fails in the gaps between appointments.',
    description:
      "An iOS app for people working through physiotherapy, built by a team of three. You log each prescribed exercise set by set, rate pain and difficulty as you go, and leave notes your physio can actually use, so the fortnight between appointments stops being a blank. I built the logging half: the exercise record model, the home screen, the log list and its detail view, and the sheet that catches a set you started but never finished.",
    tech: ['Swift', 'SwiftUI', 'iOS'],
    repo: 'https://github.com/Harsha-0-0/Mobi',
    year: '2025',
    context: 'Team of three · UTS iOS development',
    cover: { src: asset('media/mobi-cover.jpg') },
    media: [
      {
        type: 'image',
        src: asset('media/mobi-home.jpg'),
        alt: "Mobi's home screen on an iPhone, showing the current rehabilitation plan and the day's exercises.",
        caption: 'Home: the day at a glance',
      },
      {
        type: 'image',
        src: asset('media/mobi-create-session.jpg'),
        alt: 'The screen for creating a session and adding exercises to it.',
        caption: 'Building a session',
      },
      {
        type: 'image',
        src: asset('media/mobi-log.jpg'),
        alt: 'A log detail view for 12 March 2025: completion rate bars for "Pen roll" at one of two sets and "Door frame hang" at two of two, with pain rated 10 per cent, difficulty 20 per cent, and a written note about the exercise getting harder toward the end.',
        caption: 'Log detail: sets, pain, difficulty and a note per exercise',
      },
    ],
  },
  {
    slug: 'enrolment-system',
    name: 'Student Enrolment System',
    tagline: 'One system, two front ends.',
    description:
      'Student registration, subject creation and enrolment, built once with the logic properly separated, then exposed through both a CLI and a Tkinter GUI so it works for technical and non-technical users alike. Separate student and admin subsystems, Pydantic models over a JSON store, and validation that actually refuses a bad email or a weak password.',
    tech: ['Python', 'Tkinter', 'Pydantic', 'JSON'],
    repo: 'https://github.com/Harsha-0-0/Enrolment-System',
    year: '2025',
    cover: { src: asset('media/enrolment-cover.jpg') },
    media: [
      {
        type: 'image',
        src: asset('media/enrolment-admin.jpg'),
        alt: 'A terminal running the admin subsystem: a menu of seven options, a table of three registered students with their generated IDs and university email addresses, and a table of two subjects with generated subject IDs.',
        caption: 'The admin subsystem: students and subjects, straight from a real run',
      },
      {
        type: 'image',
        src: asset('media/enrolment-session.jpg'),
        alt: 'A full terminal session: registering three students through the student subsystem, then switching to the admin subsystem to create subjects and list both tables.',
        caption: 'A full session, from registration through to the admin views',
      },
    ],
  },
  {
    slug: 'business-intelligence',
    name: 'Business Intelligence Coursework',
    tagline: 'Three ways of turning a dataset into a decision.',
    description:
      'Three pieces from 32558 Business Intelligence at UTS. An Excel dashboard over 242 Starbucks beverages in 9 categories, with formula-driven KPIs for calories, sugar, caffeine and fat by category and a top-ten list. A data-storytelling report on 100 top-rated K-dramas from 2007 to 2024, grouped into five eras and compared on rating, viewership and genre: average ratings climbed from 7.9 to 8.7, while viewership peaked in the middle era, not the most recent one. And a snowflake-schema warehouse design for a fictional film platform, covering profiling, an extraction plan, a cleansing plan and incremental loading. That last one is a design document rather than a built system, which is how the repo describes it too.',
    tech: ['Excel', 'SQL', 'Python', 'Miro'],
    repo: 'https://github.com/Harsha-0-0/business-intelligence-coursework',
    year: '2026',
    context: 'UTS · 32558 Business Intelligence',
    cover: { src: asset('media/bi-cover.jpg') },
    media: [
      {
        type: 'image',
        src: asset('media/bi-starbucks-dashboard.jpg'),
        alt: 'The Starbucks beverage nutritional dashboard in Excel: KPI tiles for 242 menu items, 193.9 average calories, 33 grams of sugar and 89.5 mg of caffeine, with bar and pie charts for calories, sugar, caffeine and item count by category, a category summary table and a top ten highest-calorie list.',
        caption: 'The Excel dashboard, built on 242 beverages across 9 categories',
      },
      {
        type: 'image',
        src: asset('media/bi-kdrama-report.jpg'),
        alt: 'A page from the K-drama report covering the Early Era from 2007 to 2012, with a line chart of average rating by year rising from about 7.7 to 8.9.',
        caption: 'Data storytelling: how K-drama ratings moved across five eras',
      },
      {
        type: 'image',
        src: asset('media/bi-filmlibrary-schema.jpg'),
        alt: 'The FilmLibrary snowflake schema, showing a user-activity fact table with film, genre, platform, user and date dimensions, alongside a business query in SQL.',
        caption: 'The FilmLibrary snowflake schema and a business query',
      },
    ],
    docs: [
      {
        label: 'K-drama data-storytelling report (PDF)',
        href: 'https://github.com/Harsha-0-0/business-intelligence-coursework/blob/main/01-kdrama-data-storytelling/Maniraj25379328Assg2.pdf',
      },
      {
        label: 'FilmLibrary data warehouse design (PDF)',
        href: 'https://github.com/Harsha-0-0/business-intelligence-coursework/blob/main/02-data-warehouse-design/Maniraj25379328Ass3.pdf',
      },
      {
        label: 'Starbucks dashboard workbook (XLSX)',
        href: 'https://github.com/Harsha-0-0/business-intelligence-coursework/blob/main/03-starbucks-excel-dashboard/Maniraj25379328Assg4.xlsx',
      },
    ],
  },
  {
    slug: 'spacex-capstone',
    name: 'Applied Data Science Capstone',
    tagline: 'Predicting whether a Falcon 9 first stage comes back.',
    description:
      'A full data-science pipeline on SpaceX launches, end to end. Launch records come in through the SpaceX REST API and a Wikipedia scrape, get cleaned with Pandas, then get interrogated with SQL and with charts: success rate by year, by orbit, and payload mass against launch site. Launch sites and outcomes go onto a Folium map, and an interactive Plotly Dash app lets you filter by site and payload. Finally four classifiers, logistic regression, SVM, decision tree and k-nearest neighbours, are tuned with grid search and compared on the same held-out set to predict whether the first stage lands.',
    tech: ['Python', 'Pandas', 'SQL', 'scikit-learn', 'Plotly Dash', 'Folium'],
    repo: 'https://github.com/Harsha-0-0/Applied-Data-Science-Capstone',
    year: '2024',
    context: 'IBM Skills Network · Coursera capstone',
    cover: { src: asset('media/capstone-cover.jpg') },
    media: [
      {
        type: 'image',
        src: asset('media/capstone-success-by-year.jpg'),
        alt: 'Line chart of launch success rate by year, flat at zero until 2013, then climbing to roughly 85 per cent by 2020, with a confidence band.',
        caption: 'Success rate climbs from zero in 2013 to about 85 per cent by 2020',
      },
      {
        type: 'image',
        src: asset('media/capstone-success-by-orbit.jpg'),
        alt: 'Bar chart of success rate by orbit type.',
        caption: 'Success rate by orbit',
      },
      {
        type: 'image',
        src: asset('media/capstone-payload-by-site.jpg'),
        alt: 'Scatter plot of payload mass against launch site for CCAFS SLC 40, VAFB SLC 4E and KSC LC 39A, with points coloured by landing outcome.',
        caption: 'Payload mass by launch site, coloured by landing outcome',
      },
      {
        type: 'image',
        src: asset('media/capstone-confusion-matrix.jpg'),
        alt: 'Confusion matrix for the logistic regression model: 12 landings correctly predicted, 3 correct non-landings and 3 false positives.',
        caption: 'Confusion matrix for the tuned logistic regression model',
      },
    ],
  },
  // HobbyWorld was removed after running it: the Angular app is still a
  // scaffold: a header and nav over Angular's default "component works!"
  // placeholders, so the previous description ("a matched pair ... API
  // contract, routing and state management") overstated it. Restore it here
  // once there is a working app behind the routes.
];

/* -------------------------------------------------------------------------- */
/* Extras                                                                      */
/* -------------------------------------------------------------------------- */

export const achievements: Achievement[] = [
  {
    title: 'International Workshop on AI Strategy',
    detail:
      'Selected to represent UTS at Poznan University of Technology, Poland, analysing real-world business cases in globally mixed teams.',
    year: 'Apr 2026',
    // Photos or clips from the workshop go here. Drop the files into
    // public/media/ and add entries. The gallery renders itself, and the
    // whole block stays hidden while this is empty. For example:
    //   media: [
    //     { type: 'image', src: asset('media/poznan-team.jpg'),
    //       alt: 'Harsha with her team presenting at Poznan University of Technology',
    //       caption: 'Case presentation, Poznan' },
    //   ],
  },
  {
    title: "Dean's List",
    detail: 'Recognised in both 2025 and 2026 during the Master of Information Technology at UTS.',
    year: '2025 & 2026',
  },
  {
    title: 'Certificate of Recognition',
    detail:
      'Awarded for analytical thinking, creativity, interpersonal skills, perseverance, proactivity and team spirit.',
    year: '2021',
  },
];

export const spokenLanguages = [
  { name: 'English', level: 'Fluent' },
  { name: 'Tamil', level: 'Fluent' },
  { name: 'Korean', level: 'Intermediate' },
];

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
] as const;
