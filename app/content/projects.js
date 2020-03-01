export const projects = [
  {
    key: 'intuitive-math',
    featured: true,
    title: 'Intuitive Math',
    subtitle: 'Animated math primer for graphics',
    client: {
      url: 'https://intuitive-math.club',
      name: 'intuitive-math.club',
    },
    short:
      `Intuitive Math is a hosted primer for graphics math, primarily linear algebra and calculus.\n` +
      `It takes its inspiration from 3blue1brown, where it combines worked examples of problems ` +
      `along with their visual intuition at each step in the process.`,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/project-intuimath-intersections.gif',
      'https://s3.amazonaws.com/sspilsbury-com-images/project-intuimath-surface-area.gif',
    ],
    url: 'https://intuitive-math.club',
    technologies: ['react', 'three', 'js'],
  },
  {
    key: 'jurimetrics',
    featured: true,
    title: 'Jurimetrics',
    subtitle: 'Law and Government in Australia',
    client: {
      url: 'https://jurimetrics.com.au',
      name: 'Jurimetrics Pty Ltd',
    },
    short:
      `Jurimetrics is a platform and database compiled from hundreds of thousands ` +
      `of publically available and licensed case reports, prospectii and government registers. ` +
      `See the public legal and regulatory record for almost any company in Australia`,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/project-jurimetrics-cases-over-time.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/project-jurimetrics-federal-court-cases.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/project-jurimetrics-feed.png',
    ],
    url: 'https://demo.jurimetrics.com.au',
    technologies: ['react', 'js', 'sqllite', 'c#', 'ms-sql', 'python', 'nlp'],
  },
  {
    key: 'libanimation',
    featured: true,
    title: 'libanimation',
    subtitle: 'Math for window animations',
    client: {
      url: 'https://endlessos.com',
      name: 'Endless',
    },
    short:
      `libanimation is a math library that can be used by any compositor to provide ` +
      `nice looking window animations. It provides the math for wobbly windows, ` +
      `a magic lamp effect and some simple affine transformations.`,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/project-endless-libanimation-window-animations.gif',
      'https://s3.amazonaws.com/sspilsbury-com-images/project-endless-libanimation-wobbly-windows.gif',
    ],
    url: 'https://github.com/smspillaz/libanimation',
    technologies: ['c++', 'meson', 'opengl'],
  },
  {
    key: 'companion-app',
    featured: false,
    title: 'Endless Companion App',
    subtitle: 'Content distribution on local area networks',
    client: {
      url: 'https://endlessos.com',
      name: 'Endless',
    },
    short:
      `The Endless Companion App was a project to create both a discoverable and ` +
      `dynamically activated server to stream locally stored content over the ` +
      `local area network to a series of Android clients.`,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/project-endlesscompanion-discover.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/project-endlesscompanion-feed.jpg',
      'https://s3.amazonaws.com/sspilsbury-com-images/project-endlesscompanion-search.png',
    ],
    url: 'https://github.com/endlessm/eos-companion-app-integration',
    technologies: ['gnome', 'python', 'android', 'c'],
    imageStyleProps: {
      backgroundSize: 'contain',
    },
  },
  {
    key: 'discovery-feed',
    featured: false,
    title: 'Endless Discovery Feed',
    subtitle: 'Offline content feed for Endless OS',
    client: {
      url: 'https://endlessos.com',
      name: 'Endless',
    },
    short:
      `The Discovery Feed is a frontend that aggregates and arranges ` +
      `offline content into a constantly updating and relevant feed.`,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/project-discoveryfeed.gif',
    ],
    url: 'https://github.com/endlessm/eos-discovery-feed',
    technologies: ['gnome', 'javascript', 'c'],
  },
  {
    key: 'kodi-wayland',
    featured: false,
    title: 'Kodi on Wayland',
    subtitle: 'A port of Kodi to the next-gen Linux Windowing Subsystem',
    client: {
      url: 'https://kodi.tv/',
      name: 'Kodi',
    },
    short: `The first port of the Kodi Media Center to Wayland and Mir`,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/project-kodi-wayland.png',
    ],
  },
  {
    key: 'unity',
    featured: false,
    title: 'Unity Desktop',
    subtitle: 'The desktop environment that sang',
    client: {
      url: 'https://www.canonical.com/',
      name: 'Canonical',
    },
    short:
      `The default desktop experience, shell and compositor on Ubuntu ` +
      `from 11.04 to 17.04. A well-renouned, polished and goregous environment.`,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/project-unity-dash.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/project-unity-previews.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/project-unity-workspaces.png',
    ],
  },
  {
    key: 'compiz',
    featured: false,
    title: 'Compiz',
    subtitle: 'A fun, extensible and fast GPU accelerated window manager',
    client: {
      url: 'https://compiz.org/',
      name: 'Compiz',
    },
    short:
      `Maintenance of the Compiz window manager, porting plugins to C++, ` +
      `adding tests and improving quality and enabling on mobile platforms.`,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/project-compiz-animations.gif',
      'https://s3.amazonaws.com/sspilsbury-com-images/project-compiz-cube.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/project-compiz-shadows.png',
    ],
  },
];
