/**
 * Single source of truth for every piece of personal and professional data on
 * this site. Nothing here is duplicated in a component — when the CV changes,
 * this file is the only edit.
 *
 * Last reconciled against CV: August 2026.
 */

export interface Role {
  title: string;
  organisation: string;
  location: string;
  start: string;
  end: string | null; // null === currently held
  kind: 'work' | 'education' | 'volunteer';
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
  /** Videos only — still frame shown before playback. */
  poster?: string;
  /** Optional visible caption under the item. */
  caption?: string;
}

export interface ProjectDoc {
  /** e.g. "Design report (PDF)" — say what it is and what format. */
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
   * so a card is never blank. Cards are 4:3 and the image is cropped to fill —
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

  /** Headline. The highlighted word is rendered in coral. */
  headline: {
    lead: 'Fuel',
    highlight: 'ideas',
    trail: 'with code.',
  },

  /** One-liner under the hero headline. */
  strapline:
    'Full-stack engineer in Sydney. Java and Spring Boot on the back end, Angular and React on the front, and a habit of picking up whatever language the problem actually needs.',

  /** Availability — surfaced in the hero, the about page and contact. */
  availability: {
    status: 'Open to full-time roles',
    workRights: 'Full Australian working rights',
    sponsorship: 'No visa sponsorship required',
    summary:
      'Based in Sydney, available for full-time work, with full working rights in Australia — no sponsorship needed.',
  },

  /**
   * About-page narrative. Written as a portfolio voice, not a cover letter.
   */
  bio: [
    "I'm a software engineer in Sydney who got into this by way of the unglamorous parts. At Infosys I spent a year and a half on enterprise applications — Java, Spring Boot, Angular, REST APIs — and most of what I learned came from the tickets nobody wanted: the defect that only surfaced in production, the requirement that was never written down, the legacy screen everyone routed around.",
    "That turned out to be the useful education. I got comfortable reading code I didn't write, asking the question that unblocks a stand-up, and shipping something reliable rather than something clever.",
    "Since moving to Sydney for my Master of Information Technology at UTS, I've been deliberately widening the surface area. I've built an iOS app in SwiftUI, a café platformer in Unity and C#, a media-literacy simulation in React for the IEEE Metaverse Grand Challenge, and a delivery observability dashboard during my internship at Outcomex. Different stacks, same instinct: work out what the thing needs to do, then build the smallest version that genuinely does it.",
    "I also teach — I tutor Programming on the Internet and Systems Testing at UTS — which is the fastest way I know to find the gaps in your own understanding. Right now I'm looking for a full-time engineering role in Sydney where I can keep doing all of it.",
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
  resumeUrl:
    'https://drive.google.com/file/d/1Q4gEfbmJO2GQuXSyXw8fhEIGV4E34EfH/view?usp=sharing' as
      | string
      | null,
} as const;

/* -------------------------------------------------------------------------- */
/* Experience — reverse chronological                                          */
/* -------------------------------------------------------------------------- */

export const roles: Role[] = [
  {
    title: 'Technical Intern',
    organisation: 'Outcomex',
    location: 'Sydney, NSW',
    start: 'Jun 2026',
    end: null,
    kind: 'work',
    highlights: [
      'Built an internal delivery observability dashboard giving project stakeholders RAG status visibility, directly improving process transparency.',
      'Ran horizon-scanning research on emerging technologies and turned the findings into concrete internal use cases.',
      'Worked alongside senior pre-sales and delivery staff, building product and process knowledge from the ground up.',
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
      'Supported 100+ new students through Orientation, staffing help desks and resolving queries in real time.',
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
      'Investigated production defects and performed root cause analysis with cross-functional teams to deliver reliable releases.',
      'Queried and validated customer data through SQL-based systems and Salesforce to support operational accuracy.',
      'Ran integration testing, code review and release support, using Git in Agile delivery environments.',
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
    honours: "Dean's List 2025 & 2026",
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
    items: ['Java', 'Python', 'C#', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    label: 'Frontend',
    items: ['Angular', 'React', 'HTML5', 'CSS3', 'Responsive Design'],
  },
  {
    label: 'Backend',
    items: ['Spring Boot', 'Node.js', 'REST APIs', 'Object-Oriented Design'],
  },
  {
    label: 'Databases & Tools',
    items: ['PostgreSQL', 'SQL', 'Git', 'GitHub', 'Jira', 'Integration Testing', 'Agile Delivery'],
  },
  {
    label: 'AI-Assisted Development',
    items: ['Claude', 'Claude Code', 'Rapid Prototyping', 'Debugging Workflows'],
  },
];

/* -------------------------------------------------------------------------- */
/* Projects — sourced from github.com/Harsha-0-0                               */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    slug: 'misinformation-lab',
    name: 'The Misinformation Lab',
    tagline: 'Feel how it fools you — then watch yourself use the same trick.',
    description:
      "A media-literacy simulation that teaches by role reversal: you get tested on spotting fake posts, then run your own misinformation campaign, then get shown the connection. Entirely client-side, no login, no headset — 88 KB of gzipped code. It includes a rule-based AI strategist with governance and refusal rules baked in, because a tool that teaches manipulation should have limits.",
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
        caption: 'Phase 1 — five posts, and the clock is running',
      },
      {
        type: 'image',
        src: asset('media/misinfo-composer.jpg'),
        alt: 'The campaign composer, with dropdowns for audience and emotional hook, and a choice between letting Vale write the post or writing it yourself.',
        caption: 'Phase 2 — pick an audience and a hook, then let Vale write it',
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
    cover: { src: asset('media/Cap It Hot.png') },
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
      'A console-based hospital system in C# with genuinely separate menus and permissions for Patients, Doctors and Administrators — appointment booking, record management and JSON-backed persistence that survives a restart. No framework doing the work; just careful object-oriented design.',
    tech: ['C#', '.NET', 'JSON'],
    repo: 'https://github.com/Harsha-0-0/Hospital-Management-System',
    year: '2025',
  },
  {
    slug: 'style-mate',
    name: 'Style Mate',
    tagline: 'Fashion meets sustainability.',
    description:
      'An iOS app that fights fast fashion by making your existing wardrobe more interesting. Digitise what you own, categorise by type, colour and season, then let the mix-and-match engine generate outfits for the occasion. Built in SwiftUI as a team of five.',
    tech: ['Swift', 'SwiftUI', 'iOS'],
    repo: 'https://github.com/Harsha-0-0/Five-Stars',
    year: '2025',
    cover: { src: asset('media/stylemate-cover.jpg') },
    media: [
      {
        type: 'image',
        src: asset('media/stylemate-home.jpg'),
        alt: 'Style Mate home screen: a welcome greeting, an "Outfit of the Day" showing a black tee, tan trousers and white trainers, and a "Your Digital Wardrobe" section.',
        caption: 'Home — outfit of the day',
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
        caption: 'Dresser — shuffle for a new combination',
      },
      {
        type: 'image',
        src: asset('media/stylemate-swap.jpg'),
        alt: 'The Dresser screen with an individual garment selected to be swapped out of the outfit.',
        caption: 'Dresser — or swap a single piece by hand',
      },
    ],
  },
  {
    slug: 'enrolment-system',
    name: 'Student Enrolment System',
    tagline: 'One system, two front ends.',
    description:
      'Student registration, subject creation and enrolment — built once with the logic properly separated, then exposed through both a CLI and a Tkinter GUI so it works for technical and non-technical users alike. Separate student and admin subsystems, Pydantic models over a JSON store, and validation that actually refuses a bad email or a weak password.',
    tech: ['Python', 'Tkinter', 'Pydantic', 'JSON'],
    repo: 'https://github.com/Harsha-0-0/Enrolment-System',
    year: '2025',
    cover: { src: asset('media/enrolment-cover.jpg') },
    media: [
      {
        type: 'image',
        src: asset('media/enrolment-admin.jpg'),
        alt: 'A terminal running the admin subsystem: a menu of seven options, a table of three registered students with their generated IDs and university email addresses, and a table of two subjects with generated subject IDs.',
        caption: 'The admin subsystem — students and subjects, straight from a real run',
      },
      {
        type: 'image',
        src: asset('media/enrolment-session.jpg'),
        alt: 'A full terminal session: registering three students through the student subsystem, then switching to the admin subsystem to create subjects and list both tables.',
        caption: 'A full session, from registration through to the admin views',
      },
    ],
  },
  // HobbyWorld was removed after running it: the Angular app is still a
  // scaffold — a header and nav over Angular's default "component works!"
  // placeholders — so the previous description ("a matched pair ... API
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
      'Selected to represent UTS at Poznan University of Technology, Poland — analysing real-world business cases in globally mixed teams.',
    year: 'Apr 2026',
    // Photos or clips from the workshop go here. Drop the files into
    // public/media/ and add entries — the gallery renders itself, and the
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
  { href: '/education', label: 'Education' },
  { href: '/contact', label: 'Contact' },
] as const;
