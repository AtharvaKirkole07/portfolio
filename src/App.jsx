import { useMemo } from 'react'
import {
  ThemeProvider, createTheme, CssBaseline, useMediaQuery, alpha,
  AppBar, Toolbar, Container, Box, Typography, Button, Chip, Stack, Paper, Link, Divider,
} from '@mui/material'

/* ---------- Edit these ---------- */
const LINKS = {
  email: 'atharvakirkole07@gmail.com',
  phone: '+919130801794',
  github: 'https://github.com/AtharvaKirkole07',
  linkedin: 'https://www.linkedin.com/in/atharvakirkole',
  repo: 'https://github.com/AtharvaKirkole07/VerFlow',
  resume: 'AtharvaKirkole_Resume.pdf', // put the PDF in the /public folder
}

const SUMMARY =
  '1.9 years building backend services (Spring Boot, Java, Hibernate) and frontend applications (React JS, Angular) for enterprise ERP systems. I work with microservices and event-driven architecture on Apache Kafka, and use AI-assisted workflows (Claude, GitHub Copilot) to speed up development, debugging and sprint analysis.'

// **text** is rendered as a highlighted achievement
const JOBS = [
  {
    title: 'Engineer, Full Stack Java Developer (C2H)', company: 'Forvia Hella',
    dates: 'November 2025 to Present', current: true,
    points: [
      'Architecting and building a new internal tool using Java 21, Spring MVC and React JS to support enterprise project and automation workflows.',
      'Migrated legacy Java 8/Vaadin modules to Java 21 and Hibernate, cutting build time by **60%** and removing 4 legacy dependencies.',
      'Designed and developed 5 microservices with efficient inter-service communication, reducing API call latency by **40%**.',
      'Applied Claude in agentic development workflows to reduce microservice boilerplate and debug Kafka issues.',
      'Implemented BFF-based authentication and session management, delivered a Material UI dashboard with sidebar navigation, and configured Nginx as a reverse proxy for deployment.',
    ],
  },
  {
    title: 'Java Developer Intern', company: 'Forvia Hella',
    dates: 'December 2024 to November 2025', current: false,
    points: [
      'Built and improved React JS frontend features for the internal ERP system against sprint story points.',
      'Indexed key Oracle queries, reducing query execution time by about **25%**.',
      'Monitored application health through GitLab CI/CD logs and resolved bottlenecks that informed later Redis caching.',
      'Integrated Playwright automation to download library files from vendor websites.',
    ],
  },
]

const PROJECT = {
  name: 'VeraFlow',
  subtitle: 'Fin operations and risk platform, January 2026 to July 2026',
  stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Angular', 'Kafka', 'Redis', 'Docker'],
  points: [
    'Designed a KYC/AML compliance and transaction-risk platform modelled on banking workflows, with JWT authentication, BFF-based authorization and Redis caching across distributed microservices.',
    'Built a real-time Kafka risk-scoring pipeline that evaluates transactions on amount, velocity, behavioural and counterparty rules.',
    'Built a double-entry ledger engine with a fault-tolerant state machine (INITIATED, PROCESSING, COMPLETED or FAILED), with idempotent handling and recovery from partial failures.',
    'Built an officer monitoring dashboard and an automated report generation module for compliance reporting and audit visibility.',
    'Implemented the Transactional Outbox Pattern to publish transaction and risk events reliably after database commits, preventing event loss and inconsistent state across services.',
  ],
}

const SKILLS = [
  ['Languages', ['Java 8', 'Java 17', 'Java 21']],
  ['Backend', ['Spring Boot', 'Spring MVC', 'Spring Security', 'Spring Data JPA', 'Hibernate']],
  ['Frontend', ['React JS', 'Angular', 'JavaScript', 'Material UI', 'HTML', 'CSS']],
  ['Data and messaging', ['Apache Kafka', 'Redis', 'SQL', 'PostgreSQL', 'Oracle']],
  ['Cloud and DevOps', ['AWS (EC2, S3, RDS, OpenSearch)', 'Docker', 'GitLab CI/CD', 'Maven', 'Git', 'Linux']],
  ['Testing and APIs', ['JUnit 5', 'Mockito', 'Postman', 'REST']],
  ['Architecture and security', ['Microservice design patterns', 'Event-driven architecture', 'JWT', 'OAuth 2.0']],
  ['AI-assisted engineering', ['Claude (agentic coding and debugging)', 'GitHub Copilot']],
]

// Add your own lines to `details` (subjects, thesis, projects, achievements...).
// They appear inside the card automatically. Leave it as [] to hide that area.
const EDUCATION = [
  {
    degree: 'Master of Computer Science',
    school: 'PES Modern College, Pune',
    years: '2022 to 2024',
    cgpa: '9.13',
    details: [],
  },
  {
    degree: 'Bachelor of Computer Science',
    school: 'PVG College of Science, Pune',
    years: '2019 to 2022',
    cgpa: '8.1',
    details: [],
  },
]

/* ---------- Glass effect (used by every panel) ---------- */
const glass = (t) => {
  const dark = t.palette.mode === 'dark'
  const blur = 'blur(18px) saturate(170%)'
  return {
    backgroundColor: dark ? 'rgba(21, 28, 46, 0.55)' : 'rgba(255, 255, 255, 0.5)',
    backdropFilter: blur,
    WebkitBackdropFilter: blur,
    border: '1px solid',
    borderColor: dark ? 'rgba(123, 147, 255, 0.35)' : 'rgba(35, 71, 245, 0.25)',
    borderRadius: '18px',
    boxShadow: dark
      ? '0 10px 36px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
      : '0 10px 36px rgba(31, 45, 110, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  }
}

/* ---------- Material UI theme ---------- */
const heading = { fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }

const makeTheme = (mode) => {
  const dark = mode === 'dark'
  // soft colour blobs behind the page: this is what the glass panels blur
  const backdrop = dark
    ? 'radial-gradient(900px 520px at 8% 0%, rgba(79, 70, 229, 0.45), transparent 60%), radial-gradient(800px 520px at 95% 25%, rgba(168, 85, 247, 0.3), transparent 60%), radial-gradient(900px 600px at 45% 100%, rgba(14, 165, 233, 0.3), transparent 60%)'
    : 'radial-gradient(900px 520px at 8% 0%, rgba(35, 71, 245, 0.3), transparent 60%), radial-gradient(800px 520px at 95% 25%, rgba(168, 85, 247, 0.28), transparent 60%), radial-gradient(900px 600px at 45% 100%, rgba(14, 165, 233, 0.3), transparent 60%)'

  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? '#7B93FF' : '#2347F5' },
      background: { default: dark ? '#0D1220' : '#EAEEF8', paper: dark ? '#151C2E' : '#FFFFFF' },
      text: { primary: dark ? '#E8ECF5' : '#101828', secondary: dark ? '#B3BDD3' : '#3B475C' },
      divider: dark ? 'rgba(123, 147, 255, 0.3)' : 'rgba(35, 71, 245, 0.25)',
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: '"Hanken Grotesk", system-ui, -apple-system, "Segoe UI", sans-serif',
      htmlFontSize: 16, fontSize: 16,
      h1: heading, h2: heading, h3: heading, h4: heading, h5: heading, h6: heading,
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundImage: backdrop, backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', minHeight: '100vh' },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6, fontWeight: 500,
            backgroundColor: dark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.65)',
            borderColor: dark ? 'rgba(123, 147, 255, 0.35)' : 'rgba(35, 71, 245, 0.25)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          outlined: {
            backgroundColor: dark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(8px)',
          },
        },
      },
    },
  })
}

/* ---------- Small building blocks ---------- */
// achievements (**text**) get a coloured highlight so they stand out
const bold = (text) =>
  text.split('**').map((part, i) =>
    i % 2 ? (
      <Box
        component="strong" key={i}
        sx={{ color: 'primary.main', fontWeight: 700, px: 0.75, py: 0.125, borderRadius: '6px', bgcolor: (t) => alpha(t.palette.primary.main, 0.16) }}
      >
        {part}
      </Box>
    ) : part
  )

function Section({ id, title, children }) {
  return (
    <Box component="section" id={id} sx={{ py: { xs: 1.25, md: 1.5 }, scrollMarginTop: '76px' }}>
      <Container maxWidth="md">
        <Box
          sx={[glass, {
            p: { xs: 2.5, md: 4 },
            display: 'grid', gridTemplateColumns: { xs: '1fr', md: '180px 1fr' }, gap: { xs: 2.5, md: 5 },
          }]}
        >
          <Typography variant="h4" component="h2" sx={{ position: { md: 'sticky' }, top: 96, alignSelf: 'start' }}>
            {title}
          </Typography>
          <Box>{children}</Box>
        </Box>
      </Container>
    </Box>
  )
}

function Points({ items }) {
  return (
    <Stack component="ul" spacing={1.25} sx={{ listStyle: 'none', p: 0, m: 0 }}>
      {items.map((t) => (
        <Box
          component="li" key={t}
          sx={{ position: 'relative', pl: 2.5, '&::before': { content: '""', position: 'absolute', left: 0, top: '0.8em', width: 8, height: 2, bgcolor: 'primary.main' } }}
        >
          {bold(t)}
        </Box>
      ))}
    </Stack>
  )
}

function Chips({ items }) {
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
      {items.map((c) => <Chip key={c} label={c} variant="outlined" size="small" />)}
    </Stack>
  )
}

function Job({ job }) {
  return (
    <Box
      sx={{
        position: 'relative', pl: 3.5, pb: 5, borderLeft: '2px solid', borderColor: 'divider',
        '&:last-of-type': { pb: 0 },
        '&::before': {
          content: '""', position: 'absolute', left: -7, top: 6, width: 12, height: 12, borderRadius: '50%',
          bgcolor: job.current ? 'primary.main' : 'background.default',
          border: '2px solid', borderColor: job.current ? 'primary.main' : 'text.secondary',
        },
      }}
    >
      <Typography variant="h6" component="h3">{job.title}</Typography>
      <Stack direction="row" useFlexGap flexWrap="wrap" columnGap={2} sx={{ color: 'text.secondary', mb: 1.75 }}>
        <Typography component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{job.company}</Typography>
        <Typography component="span">{job.dates}</Typography>
      </Stack>
      <Points items={job.points} />
    </Box>
  )
}

/* ---------- Page ---------- */
export default function App() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => makeTheme(prefersDark ? 'dark' : 'light'), [prefersDark])

  const nav = [['Experience', '#experience'], ['Project', '#project'], ['Skills', '#skills'],['Education', '#education'], ['Contact', '#contact']]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ scrollBehavior: 'smooth', '@media (prefers-reduced-motion: reduce)': { scrollBehavior: 'auto' } }} />

      <AppBar position="sticky" color="inherit" elevation={0} sx={[glass, { borderRadius: 0, borderWidth: '0 0 1px 0' }]}>
        <Container maxWidth="md" disableGutters sx={{ px: 3 }}>
          <Toolbar disableGutters>
            <Typography variant="h6" component="a" href="#top" sx={{ flexGrow: 1, color: 'text.primary', textDecoration: 'none' }}>
              Atharva Kirkole
            </Typography>
            <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {nav.map(([label, href]) => (
                <Button key={href} href={href} color="inherit" size="small" sx={{ color: 'text.secondary' }}>{label}</Button>
              ))}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" id="top">
        <Container maxWidth="md" sx={{ pt: { xs: 3, md: 6 }, pb: { xs: 1.25, md: 1.5 } }}>
          <Box sx={[glass, { p: { xs: 3, md: 5 } }]}>
            <Typography variant="h1" sx={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', lineHeight: 1.02, letterSpacing: '-0.035em' }}>
              Atharva Kirkole
            </Typography>
            <Typography variant="h5" component="p" color="primary" sx={{ fontWeight: 500, mt: 2, mb: 3 }}>
              Java Full Stack Developer
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: '58ch' }}>{SUMMARY}</Typography>
            <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1.5} sx={{ mt: 4 }}>
              <Button variant="contained" size="large" href={`mailto:${LINKS.email}`} disableElevation>Email me</Button>
              <Button variant="outlined" size="large" color="inherit" href={LINKS.github} target="_blank" rel="noopener" sx={{ borderColor: 'divider' }}>GitHub</Button>
              <Button variant="outlined" size="large" color="inherit" href={LINKS.linkedin} target="_blank" rel="noopener" sx={{ borderColor: 'divider' }}>LinkedIn</Button>
              <Button variant="outlined" size="large" color="inherit" href={LINKS.resume} download sx={{ borderColor: 'divider' }}>Resume (PDF)</Button>
            </Stack>
          </Box>
        </Container>

        <Section id="experience" title="Experience">
          {JOBS.map((j) => <Job key={j.title} job={j} />)}
        </Section>

        <Section id="project" title="Personal project">
          <Paper variant="outlined" sx={[glass, { p: { xs: 3, md: 4 }, borderRadius: '14px' }]}>
            <Typography variant="h5" component="h3">{PROJECT.name}</Typography>
            <Typography color="text.secondary" sx={{ mb: 2.25 }}>{PROJECT.subtitle}</Typography>
            <Box sx={{ mb: 3 }}><Chips items={PROJECT.stack} /></Box>
            <Points items={PROJECT.points} />
            <Button variant="outlined" color="inherit" href={LINKS.repo} target="_blank" rel="noopener" sx={{ mt: 3, borderColor: 'divider' }}>
              View on GitHub
            </Button>
          </Paper>
        </Section>

        <Section id="skills" title="Skills">
          <Stack spacing={2.75}>
            {SKILLS.map(([label, items]) => (
              <Box key={label} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '190px 1fr' }, gap: { xs: 1, sm: 2 }, alignItems: 'baseline' }}>
                <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
                <Chips items={items} />
              </Box>
            ))}
          </Stack>
        </Section>

        <Section id="education" title="Education">
          <Stack spacing={3}>
            {EDUCATION.map((e) => (
              <Paper key={e.degree} variant="outlined" sx={[glass, { p: { xs: 3, md: 4 }, borderRadius: '14px', minHeight: { md: 180 } }]}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'flex-start' }, gap: 2.5 }}>
                  <Box>
                    <Typography variant="h5" component="h3" sx={{ fontSize: { xs: '1.4rem', md: '1.75rem' }, lineHeight: 1.2 }}>{e.degree}</Typography>
                    <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', mt: 1 }}>{e.school}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>{e.years}</Typography>
                  </Box>
                  <Box sx={{ textAlign: { sm: 'right' }, flexShrink: 0 }}>
                    <Typography sx={{ ...heading, fontSize: 'clamp(2.6rem, 6vw, 3.6rem)', lineHeight: 1, color: 'primary.main' }}>{e.cgpa}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>CGPA</Typography>
                  </Box>
                </Box>
                {e.details.length > 0 && (
                  <>
                    <Divider sx={{ my: 2.5 }} />
                    <Points items={e.details} />
                  </>
                )}
              </Paper>
            ))}
          </Stack>
        </Section>

        <Section id="contact" title="Contact">
          <Link
            href={`mailto:${LINKS.email}`} underline="none" color="text.primary"
            sx={{ ...heading, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', borderBottom: '3px solid', borderColor: 'primary.main', wordBreak: 'break-all' }}
          >
            {LINKS.email}
          </Link>
          <Typography color="text.secondary" sx={{ my: 2.5 }}>
            Open to Java full stack roles. 
          </Typography>
              <Typography color="text.secondary" sx={{ my: 2.5 }}>
            Mobile Number: <Link href={`tel:${LINKS.phone}`} color="inherit">+91 9130801794</Link>
          </Typography>
          <Stack direction="row" spacing={1.5}>
            <Button variant="outlined" color="inherit" href={LINKS.linkedin} target="_blank" rel="noopener" sx={{ borderColor: 'divider' }}>LinkedIn</Button>
            <Button variant="outlined" color="inherit" href={LINKS.github} target="_blank" rel="noopener" sx={{ borderColor: 'divider' }}>GitHub</Button>
          </Stack>
        </Section>
      </Box>

      <Box component="footer" sx={{ py: { xs: 1.25, md: 1.5 }, mb: 2 }}>
        <Container maxWidth="md">
          <Box sx={[glass, { px: 3, py: 2 }]}>
            <Typography variant="body2" color="text.secondary">Atharva Kirkole, Pune, India</Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}