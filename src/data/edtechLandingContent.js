import { socialLinks } from './landingContent'

export const edtechNavLinks = [
  { href: '#problem', label: 'Problem' },
  { href: '#opportunity', label: 'Opportunity' },
  { href: '#system', label: 'System' },
  { href: '#flywheel', label: 'Flywheel' },
  { href: '#cta', label: 'Access' },
]

export const edtechHero = {
  eyebrow: 'The economic layer education was always missing',
  titleLeading: 'Where',
  titleAccent: 'EdTech',
  titleTrailing: 'becomes earning.',
  description:
    'Hive3 is the coordination layer that turns every community interaction into a verifiable credential, and every credential into real economic opportunity.',
  primaryCtaLabel: 'Start participating',
  secondaryCtaLabel: 'See the model',
}

export const edtechHeroPills = [
  { icon: '⚡', label: 'Learning' },
  { icon: '🎯', label: 'Participation' },
  { icon: '🏆', label: 'Reputation' },
  { icon: '💰', label: 'Income' },
]

export const edtechHeroTickerItems = [
  'Learning becomes participation',
  'Participation becomes reputation',
  'Reputation unlocks income',
  'Completion rates are not outcomes',
  'Proof of Humanity',
  'Portable credentials',
  'Cross-community distribution',
  'Verifiable economic signals',
]

export const edtechHeroSignals = [
  {
    title: 'Learning',
    subtitle: 'Observable action',
    x: '7%',
    y: '16%',
    delay: '0s',
  },
  {
    title: 'Participation',
    subtitle: 'Across communities',
    x: '79%',
    y: '18%',
    delay: '-1.4s',
  },
  {
    title: 'Reputation',
    subtitle: 'Portable proof',
    x: '5%',
    y: '64%',
    delay: '-2.1s',
  },
  {
    title: 'Income',
    subtitle: 'Unlocked by signal',
    x: '82%',
    y: '61%',
    delay: '-0.8s',
  },
  {
    title: 'Proof of Humanity',
    subtitle: 'One person, one identity',
    x: '16%',
    y: '82%',
    delay: '-2.8s',
  },
  {
    title: 'On-chain credentials',
    subtitle: 'Timestamped attestations',
    x: '67%',
    y: '80%',
    delay: '-1.7s',
  },
]

export const edtechProblemSection = {
  eyebrow: 'The Problem',
  title: "Why most EdTech companies fail - and what's next.",
  description:
    "The industry has been building the wrong thing for 20 years. Here's what's broken and why Hive3 is different.",
}

export const edtechProblemCards = [
  {
    icon: '📚',
    title: 'They over-index on content',
    description:
      'More videos. More modules. More courses. The industry confuses content volume with educational value. Nobody hires you for finishing a playlist.',
  },
  {
    icon: '🎯',
    title: 'They under-index on outcomes',
    description:
      "Completion rates are metrics for platforms, not learners. A job, a client, income - those are outcomes. Legacy EdTech can't prove them.",
  },
  {
    icon: '📡',
    title: 'They ignore distribution',
    description:
      'Learning platforms are silos. No connection to where talent is discovered: communities, networks, and real contexts where opportunity actually lives.',
  },
  {
    icon: '⚖️',
    title: 'They never align incentives',
    description:
      "Users learn. Platforms profit. There's no mechanism for the value created by learners to flow back to them. Hive3 is built to fix this structurally.",
  },
]

export const edtechOpportunitySection = {
  eyebrow: 'The Opportunity',
  title: 'Not a learning platform. An economic coordination layer.',
  description:
    'Skill, reputation, and opportunity have never been properly connected. Hive3 closes the loop.',
}

export const edtechEquationSteps = [
  {
    from: 'Learning',
    to: 'Participation',
    tag: 'Action in real communities',
  },
  {
    from: 'Participation',
    to: 'Reputation',
    tag: 'Cryptographic proof, on-chain',
  },
  {
    from: 'Reputation',
    to: 'Income',
    tag: 'Unlocks real opportunity',
  },
]

export const edtechComparePanels = [
  {
    variant: 'bad',
    title: 'Traditional EdTech',
    items: [
      'Static content, no feedback loop',
      'Isolated silo, no distribution',
      'Self-reported resume, no proof',
      'Completion does not equal competence',
      'Bots and fake engagement',
    ],
  },
  {
    variant: 'good',
    title: 'Hive3',
    items: [
      'Compounding participation graph',
      'Works on top of Discord, Telegram, and events',
      'Cryptographic attestations, on-chain',
      'Reputation directly unlocks income',
      'Proof of Humanity: 1 person, 1 identity',
    ],
  },
]

export const edtechMechanismsSection = {
  eyebrow: 'How Hive3 Works',
  title: 'Eight mechanisms that close the loop from learning to earning.',
  description:
    'Traditional EdTech stops at content. Hive3 continues into participation, reputation, and income.',
}

export const edtechMechanismCards = [
  {
    number: '01',
    icon: '👁️',
    title: 'Learning becomes observable participation',
    description:
      'Instead of asking whether someone finished the course, Hive3 tracks what they did, how they contributed, who validated it, and in what context across communities, events, and quests.',
    badge: 'Learning becomes action',
  },
  {
    number: '02',
    icon: '🔐',
    title: 'Every action becomes a verifiable credential',
    description:
      'No self-reported resumes. Cryptographically signed attestations are timestamped and portable, so attending an event, completing a quest, or leading an initiative becomes permanent proof.',
    badge: 'Portable reputation layer',
  },
  {
    number: '03',
    icon: '✅',
    title: 'Proof of Humanity eliminates fake engagement',
    description:
      'One person means one identity. zk-based proof of personhood and Sybil resistance keep bots from inflating your metrics, so reputation here actually means something.',
    badge: 'Signal without noise',
  },
  {
    number: '04',
    icon: '🧠',
    title: 'HiveMind AI turns activity into intelligence',
    description:
      'Most platforms collect data. Hive3 interprets it. HiveMind AI analyzes participation patterns, identifies high-signal contributors, and matches them to real opportunities.',
    badge: 'Activity to opportunity',
  },
  {
    number: '05',
    icon: '💸',
    title: 'Direct connection to economic outcomes',
    description:
      'Talent meets communities. Communities meet companies. Participation unlocks paid bounties, brand activations, and recruiting, so you do not just learn, you earn and get discovered.',
    badge: 'Earn and get discovered',
  },
  {
    number: '06',
    icon: '🤝',
    title: 'Incentives are structurally aligned',
    description:
      'Users earn for participation. Communities grow through rewards. Companies pay for access to real talent. Everyone wins because the incentives are built into the architecture, not bolted on later.',
    badge: 'Everyone wins',
  },
  {
    number: '07',
    icon: '🕸️',
    title: 'Cross-platform, not another silo',
    description:
      "Hive3 does not replace Discord, Telegram, or the tools people already use. It sits on top of the ecosystem and becomes the unified record of someone's participation.",
    badge: 'Infrastructure, not destination',
  },
  {
    number: '08',
    icon: '⭐',
    title: 'Reputation compounds over time',
    description:
      'Good Citizenship Score grows with every verified contribution. Portable, unfakeable, and powered by soulbound credentials, it becomes reputation with memory instead of a snapshot.',
    badge: 'Reputation with memory',
  },
]

export const edtechProofSection = {
  eyebrow: 'Proof Stack',
  title: 'The system rails behind the mechanism cards.',
  description:
    'This page is not just a story about education outcomes. It is a stack of identity, attestation, AI, and cross-platform coordination working together.',
  visualLabel: 'HIVEMIND SIGNAL LAYER',
  visualCaption:
    'AI-governed participation intelligence with contribution patterns, trusted credentials, and opportunity matching in one loop.',
}

export const edtechProofRails = [
  {
    icon: '🔐',
    title: 'Credential rail',
    description:
      'Verified actions become portable credentials instead of staying trapped inside one LMS or cohort tool.',
  },
  {
    icon: '✅',
    title: 'Identity rail',
    description:
      'Proof of Humanity and one-person identity keep reputation attached to real contributors, not inflated engagement.',
  },
  {
    icon: '🧠',
    title: 'AI interpretation rail',
    description:
      'HiveMind AI turns raw activity into high-signal patterns that can power matching, rewards, and recruiting.',
  },
  {
    icon: '🌐',
    title: 'Distribution rail',
    description:
      'Hive3 works across communities, events, and existing platforms so verified participation can travel where opportunity already lives.',
  },
]

export const edtechFlywheelSection = {
  eyebrow: 'The Flywheel',
  title: 'A loop that gets stronger with every user.',
  description:
    'Every participant strengthens the network. The participation graph becomes a compounding moat no platform can replicate.',
  caption:
    'Hive3 turns fragmented activity across communities into a verifiable participation graph that powers reputation, rewards, and real economic opportunity.',
}

export const edtechFlywheelSteps = [
  {
    number: '1',
    title: 'Users participate',
    description:
      'Across communities, events, quests, and real-world contexts where learning actually happens.',
  },
  {
    number: '2',
    title: 'Participation becomes verifiable reputation',
    description:
      'Cryptographically signed, timestamped, and locked to you through portable credentials.',
  },
  {
    number: '3',
    title: 'HiveMind AI interprets the signal',
    description:
      'High-signal contributors surface while real value is separated from noise at scale.',
  },
  {
    number: '4',
    title: 'Opportunities are matched',
    description:
      'Roles, bounties, companies, and communities align to proven participation.',
  },
  {
    number: '5',
    title: 'Users earn and advance',
    description:
      'Rewards, paid quests, recruiting, and brand opportunities make participation pay.',
  },
  {
    number: '6',
    title: 'More participation flows in',
    description:
      'The graph deepens, the network compounds, and the moat grows with every new node.',
  },
]

export const edtechFlywheelNodes = [
  { name: 'Participate', glyph: '⚡', x: 23, y: 22 },
  { name: 'Credential', glyph: '🔐', x: 50, y: 11 },
  { name: 'Verified', glyph: '✅', x: 77, y: 22 },
  { name: 'Signal', glyph: '🧠', x: 88, y: 45 },
  { name: 'Opportunity', glyph: '🎯', x: 76, y: 74 },
  { name: 'Earn', glyph: '💸', x: 50, y: 88 },
  { name: 'Advance', glyph: '⭐', x: 24, y: 74 },
  { name: 'Compound', glyph: '🔁', x: 12, y: 45 },
]

export const edtechManifesto = {
  subtext: "This is Hive3's contrarian edge, and the reason communities become economies.",
}

export const edtechStats = [
  {
    value: '∞',
    label: 'Credentials possible from any verified action',
  },
  {
    value: '1:1',
    label: 'Verified identity with zero bots or Sybil attacks',
  },
  {
    value: '0%',
    label: 'Fake engagement, eliminated by design',
  },
  {
    value: '↗',
    label: 'Income-linked outcomes where reputation unlocks opportunity',
  },
]

export const edtechFinalCta = {
  eyebrow: 'Final Call',
  title: 'Your reputation is being built right now. Make it count.',
  description:
    'Every community, event, and conversation is participation. Hive3 is the layer that verifies it, grows it, and connects it to real economic opportunity.',
  primaryCtaLabel: 'Get early access',
  secondaryCtaLabel: 'Talk to the team',
  secondaryCtaHref: 'mailto:mike@hive3.tech',
}

export const edtechFooterColumns = [
  {
    title: 'EdTech Page',
    links: [
      { label: 'Problem', href: '#problem' },
      { label: 'Opportunity', href: '#opportunity' },
      { label: 'System', href: '#system' },
      { label: 'Flywheel', href: '#flywheel' },
      { label: 'Get Access', href: '#cta' },
      { label: 'Top', href: '#top' },
    ],
  },
  {
    title: 'Hive3',
    links: [
      { label: 'Main Landing', href: 'https://hive3.tech/' },
      { label: 'App Login', href: 'https://app.hive3.tech/login' },
      { label: 'Mechanism Stack', href: '#system' },
      { label: 'Contact', href: '#cta' },
    ],
  },
]

export const edtechFooterMeta = {
  brandDescription:
    'Hive3 helps education communities verify participation, grow portable reputation, and connect trusted contributors to real economic opportunity.',
  copyrightText: '© 2026 Hive3. Communities become economies.',
}

export { socialLinks }
