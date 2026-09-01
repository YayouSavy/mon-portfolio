import Link from "next/link";
import NimbusPatterns from "../components/visuals/nimbus/NimbusPatterns";
import DemoKitSalesMenu from "../components/visuals/demo-kit/DemoKitSalesMenu";
import PaperStat from "../components/case-study/PaperStat";
import TunnelInversion from "../components/visuals/demo-kit/TunnelInversion";
import type { Accent, IdRow, Project, SkillCard, Stat, Tag } from "./data";

/* ============================================================
   VERSION ANGLAISE DU CONTENU ÉDITORIAL.
   Miroir exact de lib/data.tsx : mêmes types, mêmes identifiants, même ordre.
   Le français reste la source d'origine ; ce fichier ne doit jamais introduire une
   entrée que le français n'a pas, sinon les deux versions du site divergent.
   ============================================================ */

export const TAGS: Tag[] = [
  { label: "Advanced Figma",   color: "paper",  pos: "lg:top-[2%] lg:-left-14 lg:-rotate-[9deg]" },
  { label: "Design-to-code",   color: "violet", pos: "lg:top-[18%] lg:-right-8 lg:rotate-[8deg] xl:-right-10 2xl:-right-16" },
  { label: "Design systems",   color: "lime",   pos: "lg:top-[46%] lg:-left-20 lg:rotate-[3deg]" },
  { label: "User research",    color: "paper",  pos: "lg:top-[68%] lg:-right-6 lg:-rotate-[10deg] xl:-right-8 2xl:-right-12" },
  { label: "English C1",       color: "violet", pos: "lg:-bottom-8 lg:left-[14%] lg:rotate-[6deg]" },
  { label: "WCAG 2.2 · RGAA",  color: "lime",   pos: "lg:-bottom-10 lg:right-[16%] lg:-rotate-[5deg]" },
];

export const PERSONAL_TAGS: { label: string; color: Accent }[] = [
  { label: "Fashion", color: "lime" },
  { label: "Graphic design", color: "violet" },
  { label: "Embroidery", color: "lime" },
  { label: "Video games", color: "violet" },
  { label: "Manga", color: "lime" },
  { label: "Interior decoration", color: "violet" },
  { label: "Sewing", color: "lime" },
];

export const STATS: Stat[] = [
  { num: "7 weeks", label: "cut from the cycle: the coded prototype replaced the specification", color: "lime",   rot: "-rotate-3", tape: "paper", projectId: "esim-simple" },
  { num: "95 %",    label: "voluntary adoption of the internal Customer Services portal",        color: "paper",  rot: "rotate-2",  tape: "lime",  projectId: "customer-services" },
  { num: "8 / 10",  label: "people downloaded and activated an eSIM unaided, in guerrilla testing", color: "violet", rot: "-rotate-2", tape: "paper", projectId: "demo-kit" },
  { num: "3",       label: "data-heavy telecom web apps delivered",                              color: "paper",  rot: "rotate-3",  tape: "lime" },
];

export const PROJECTS: Project[] = [
  {
    id: "esim-simple",
    status: "live",
    color: "paper",
    tab: "Design-to-code",
    title: "eSIM Simple",
    meta: "Designing and coding a product end to end with AI, from the first screen to the shipped frontend.",
    metaSub: ["Thales", "Product Designer", "6 months"],
    role: (
      <>
        <p className="mb-4">A prototype built to be shown, and written to be kept.</p>
        <ul className="flex flex-col gap-2.5">
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
            <span>
              <strong>The product:</strong>{" "}
              a two-sided eSIM order management space, an operator back-office and a client area, designed and
              coded in 2 months. Seven weeks cut from the cycle, and a frontend that ships as it is.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
            <span>
              <strong>The validation:</strong>{" "}
              no upfront research: five demos, two of them in front of real clients, and a decision to
              industrialise at the end of it.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-noir/40" />
            <span>
              <strong>My role:</strong>{" "}
              Product Designer, sole designer, in a team of six: a PM, an architect, a Scrum Master, two
              developers.
            </span>
          </li>
        </ul>
      </>
    ),
    desc: (
      <>
        A two-sided eSIM order management space,{" "}
        <strong>designed and coded end to end with AI</strong>{" "}
        : seven weeks cut from the cycle, and a frontend taken into production as it is.
      </>
    ),
    contextTitle: "The project",
    context: (
      <>
        <p>
          eSIM Simple didn&apos;t start as a project. To test a new interface direction, I had built a small React
          prototype. The PM saw something other than an experiment in it, and management gave us a wider brief: run
          a product end to end, leaning on AI at every stage, from ideation through to development. Dedicated
          consultants helped us set up the tooling.
        </p>
        <p>
          The product: an eSIM order management space. Two audiences from the framing stage onward, and that was no
          implementation detail. The operator back-office and the client area share the same objects — accounts,
          profile batches, orders — but not the same rights, nor the same reading priorities. Designing them
          separately would have produced two products; designing them together produced one system with two points
          of view.
        </p>
        <p>
          That left the question of how to build it. A mockup would have illustrated screens well enough, but not
          answered the question at hand: does this hold up when you handle real data? A profile catalogue means
          hundreds of rows, states that contradict each other, edge cases nobody ever draws in a mockup. I carried
          on in code — and the prototype ended up serving three purposes at once: testing in a real environment,
          giving us something to show and have people react to, and giving developers a base to build from.
        </p>
      </>
    ),
    roleDetail: (
      <>
        <p>
          Product Designer, sole designer, in a team of six: a PM, an architect, a Scrum Master, two developers.
        </p>
        <p>
          Ideation, information architecture, screen design, prototyping directly in code, through to the shipped
          frontend.
        </p>
      </>
    ),
    extraSections: [
      {
        title: "The validation",
        body: (
          <>
            <p>
              This project involved no user research phase: the need was framed upstream, and the question sat
              elsewhere. Does the product hold up when you handle it?
            </p>
            <p>
              The PM ran all five demos himself: to the sales teams, to management, and twice in front of real
              clients. The prototype was never distributed beyond that — it didn&apos;t need to be. It had to hold
              up in front of the right people, and settle what came next.
            </p>
            <p>Which it did. The product is now rolling out.</p>
          </>
        ),
      },
      {
        title: "Two more decisions",
        placement: "afterDecisions",
        body: (
          <>
            <div>
              <p className="mb-2 font-bold text-ink">
                Writing a prototype built to ship rather than one built to be thrown away.
              </p>
              <p className="mb-3">
                A demo prototype only has to survive one meeting. Mine was written as though it had to last: design
                system components, error states handled, responsive, accessibility held.
              </p>
              <p className="mb-3">
                What it cost: time spent on things no demo makes visible, and the effort of steering the AI towards
                structured code rather than code that merely displays.
              </p>
              <p className="mb-3">
                What it gained, first in time. The prototype stood in for the specification at handover. Five weeks
                of handoff and two of ideation disappeared from the cycle, and the effect spread beyond my own
                scope: nothing to translate, so nothing to interpret, no gap between intent and implementation to
                test against, and a user guide written in front of a product you can handle rather than describe.
              </p>
              <p>
                What it gained, second in fidelity — and this matters more. On a mockup, technical constraints
                surface at delivery, and it&apos;s the design that bends to accommodate them. Prototyping in code,
                they surface during design, while there&apos;s still room to make a call. The product that ships
                looks like what was designed, not like what survived the negotiation.
              </p>
            </div>
            <div>
              <p className="mb-2 font-bold text-ink">
                A context selector in the header rather than two applications.
              </p>
              <p className="mb-3">
                The product has two faces: a back-office for the operator, a space for the end client. The need
                showed up in use: every demo had to cover both within a single session, whoever the audience was.
              </p>
              <p className="mb-3">
                The real user of this feature is therefore neither the operator nor their client — it&apos;s
                whoever is doing the demo. In production, each would have their own account and moving between the
                two faces wouldn&apos;t exist. But in a demo, logging out and back in front of a room costs thirty
                seconds and a login screen: the thread breaks. I put the switch on the header avatar.
              </p>
              <p className="mb-3">
                What it costs: two contexts share a single application, and nothing stops you acting in the wrong
                scope. The side panel colour — light on the back-office, dark on the client side — is currently the
                only permanent signal, and that&apos;s not enough for an order management product. In production,
                this would be a matter of accounts and roles, not a button.
              </p>
              <p>
                What it gains: you move between faces without a break, and the pattern — an account selector on the
                avatar — is ordinary enough in B2B products not to give the demo away. An audience that sees it
                sees a feature, not a mockup. It&apos;s the exact opposite of the reset button in Demo Kit, which
                had to be hidden. Incidentally, one codebase for the developers to maintain rather than two.
              </p>
            </div>
          </>
        ),
      },
    ],
    decisionsTitle: "The key decision",
    decisionHero: {
      title: "Prototype in code, not in Figma.",
      body: (
        <>
          <p>
            A mockup doesn&apos;t connect to real data. Prototyping in code let me iterate on actual cases rather
            than ideal states, and handle the product instead of describing it.
          </p>
          <p>
            What it cost: far more work upfront to keep the AI in line. Left alone, it wrote code outside the
            design system — a table imported from Material here, a blue that isn&apos;t in the palette there. The
            system&apos;s rules were written down nowhere; they lived in the designers&apos; heads. I opened a
            parallel effort to encode them.{" "}
            <Link
              href="/en/notes/design-system-ia"
              className="font-semibold text-violet underline decoration-violet/40 underline-offset-4 transition-colors hover:decoration-violet"
            >
              Teaching an AI a design system it has never read
            </Link>
            .
          </p>
          <p>What it gained: seven weeks off the cycle, and a product that looks like what was designed.</p>
        </>
      ),
    },
    resultsGroups: [{ key: "produit", label: "What the prototype produced", dot: "bg-lime" }],
    resultsOutro: (
      <p>
        <strong>Status.</strong> The product is rolling out and will be commercialised. No real usage data yet.
      </p>
    ),
    learnings: (
      <>
        <p>
          Design-to-code doesn&apos;t save time everywhere: it moves it. Upstream it costs — you have to write the
          rules the AI must follow, and discover along the way every rule nobody had ever needed to put into words.
          Downstream it gives a great deal back: where the handoff used to be, there is nothing left to translate.
        </p>
        <p>
          Its limit sits exactly where its cost does. You can only encode rules that already exist. Wherever the
          design system was silent, the AI kept producing defaults that had to be settled by hand, one at a time.
          And a prototype written to last doesn&apos;t decide its own industrialisation — but it removes the main
          reason not to.
        </p>
      </>
    ),
    ndaNote:
      "Neutral reconstruction on « Nomad », an invented operator: no real data, brand or interface appears here.",
    cover: { kind: "contextSwitch" },
    peek: false,
    entryProp: "screen",
    metrics: [
      { num: "7 weeks", label: "cut from the cycle: 5 of handoff, 2 of ideation.", group: "produit", note: "with dedicated consultants to set up the tooling" },
      { num: "Zero handoff", label: "the frontend written during the demos is the one that ships.", group: "produit" },
      { num: "5", label: "demos, two of them in front of real clients, behind the decision to industrialise.", group: "produit", note: "run by the PM alone, never distributed beyond" },
    ],
    chips: ["Design-to-code", "B2B order management", "AI"],
    z: "z-[1]",
  },
  {
    id: "demo-kit",
    status: "live",
    color: "lime",
    tab: "Demo tool",
    title: "Demo Kit",
    meta: "Replaying an eSIM purchase journey in real conditions, on a salesperson's phone.",
    metaSub: ["Thales", "Product Designer", "8 months, from initial request to development handover"],
    role: (
      <>
        <p className="mb-4">
          A demo tool where every feature that serves the seller threatens the credibility of the demo.
        </p>
        <ul className="flex flex-col gap-2.5">
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
            <span>
              <strong>The product:</strong>{" "}
              the purchase and activation journey for an eSIM profile, replayed end to end, real identity
              verification and download included, re-brandable before every meeting. Selected to represent my
              division at Best of Thales Design.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
            <span>
              <strong>The research:</strong>{" "}
              6 salespeople interviewed then brought back to test, 10 guerrilla tests, one inversion of the
              purchase funnel.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-noir/40" />
            <span>
              <strong>My role:</strong> Product Designer, sole designer, paired with one developer.
            </span>
          </li>
        </ul>
      </>
    ),
    desc: (
      <>
        The eSIM purchase journey replayed in real conditions on a salesperson&apos;s phone,{" "}
        <strong>re-brandable before every meeting</strong>{" "}
        : every feature that serves the seller has to stay invisible to the prospect.
      </>
    ),
    contextTitle: "The project",
    context: (
      <>
        <p>
          Sales teams sell eSIM solutions to telecom operators. To show what the product looked like, they had
          slides and screenshots. The prospect had to imagine the journey instead of seeing it.
        </p>
        <p>
          The app replays it in real conditions, on the salesperson&apos;s own phone: choosing a destination,
          selecting a plan, verifying identity, paying, downloading a real eSIM profile. It re-brands to the
          prospect&apos;s colours before the meeting.
        </p>
        <p>
          The subject wasn&apos;t the purchase journey, which already existed. It sat in a contradiction: two users
          looking at the same screen. The salesperson needs control — to skip steps when time is short, start from
          scratch between two meetings, change a price to match the prospect&apos;s catalogue. The prospect must
          see none of it. The moment they spot a reset button, they&apos;re no longer looking at a product,
          they&apos;re looking at a mockup.
        </p>
      </>
    ),
    roleDetail: (
      <>
        <p>Product Designer, sole designer, paired with one developer.</p>
        <p>
          Research and synthesis, a functional architecture diagram validated with the PM before the first mockups,
          screen and branding system design, prototype and testing, copy written with marketing, handover and
          follow-through to implementation.
        </p>
      </>
    ),
    extraSections: [
      {
        title: "The research",
        body: (
          <>
            <p>
              Six salespeople, one instruction: walk me through your last client meeting minute by minute, rather
              than describe the features you&apos;d want.
            </p>
            <p>
              What the field made visible appeared in no specification. They run several meetings in a day, so a
              full reset has to take seconds. They travel to competing operators, so the branding has to change
              before every meeting. Their speaking time varies from one client to the next, so long steps have to
              be skippable.
            </p>
            <p>
              No feature in the seller layer comes from a hunch. Each answers an observed constraint, and
              that&apos;s what made it possible to settle scope with the PM: anything not tied to an observed need
              didn&apos;t make it into the first version.
            </p>
            <PaperStat
              num="6"
              label="salespeople interviewed upfront, then brought back to test the prototype: the same people at the entrance and the exit of the design process"
            />
          </>
        ),
      },
      {
        title: "Two more decisions",
        placement: "afterDecisions",
        body: (
          <>
            <div>
              <p className="mb-2 font-bold text-ink">A control menu filed where the prospect won&apos;t go.</p>
              <p className="mb-3">
                The control functions are grouped in a single screen, reachable from the app&apos;s settings under
                the label &laquo;&nbsp;Admin&nbsp;&raquo;. The pattern is the one internal tools use: no back door,
                but a location nothing announces in the purchase journey, and a label that means nothing to a
                prospect watching over the salesperson&apos;s shoulder.
              </p>
              <p className="mb-3">
                The opposite choice existed: hide the entry point entirely behind a secret gesture. I ruled it out.
                A salesperson who can&apos;t find their reset in front of a client loses more than the concealment
                gains. Reliable access beats camouflage, and the residual risk is a technical label in a settings
                list.
              </p>
              <p>
                The screen separates what gets prepared before the meeting (operator, colours, logo) from what gets
                adjusted during it (skip onboarding, skip identity verification) and from what is destructive — the
                reset, isolated at the bottom. The active operator and theme stay permanently visible: the worst
                case for this product is a salesperson opening a demo in the colours of the competitor they saw
                yesterday.
              </p>
              <figure className="mt-6">
                <figcaption className="repere-marge mb-4 flex items-center gap-3 font-accent text-[10px] uppercase tracking-[0.1em] opacity-60">
                  <span className="repere">02</span>
                  Sales menu, structure
                </figcaption>
                <DemoKitSalesMenu part="menu" lang="en" />
              </figure>
            </div>
            <div>
              <p className="mb-2 font-bold text-ink">A neutral theme, designed to be replaced.</p>
              <p className="mb-3">
                The dark theme belongs to no operator: it&apos;s the default base. The light theme is the
                demonstration of what the app becomes dressed in a client&apos;s colours. Every component had to
                survive a change of primary colour and logo without a single screen breaking, in layout or in
                contrast.
              </p>
              <p>
                Only three variables are exposed: logo, primary colour, operator name. Below 4.5:1, labels sitting
                on the primary colour switch automatically to dark. The salesperson cannot produce a non-compliant
                screen.
              </p>
              <figure className="mt-6">
                <figcaption className="repere-marge mb-4 flex items-center gap-3 font-accent text-[10px] uppercase tracking-[0.1em] opacity-60">
                  <span className="repere">03</span>
                  Branding panel and contrast safeguard
                </figcaption>
                <DemoKitSalesMenu part="branding" lang="en" />
              </figure>
            </div>
          </>
        ),
      },
    ],
    decisionsTitle: "The key decision",
    decisionHero: {
      title: "Verify identity, then take payment.",
      body: (
        <>
          <p>
            In the original journey, the user paid, then verified their identity. The same objection came back from
            the salespeople and from testing, phrased almost identically: paying without knowing whether
            verification will succeed is unsettling. The perceived risk is asymmetric — the money is gone while the
            service isn&apos;t guaranteed. On a product bought on the move, often just before departure,
            hesitation is enough to cause abandonment.
          </p>
          <p>I swapped the two steps.</p>

          <figure className="my-2">
            <figcaption className="repere-marge mb-4 flex items-center gap-3 font-accent text-[10px] uppercase tracking-[0.1em] opacity-60">
              <span className="repere">01</span>
              Inverting the purchase funnel
            </figcaption>
            <TunnelInversion lang="en" />
            <figcaption className="mt-3 max-w-[62ch] text-sm font-medium leading-relaxed text-ink/70">
              The identity verification screens belong to Thales and can&apos;t be shown. The decision is rendered
              as a diagram.
            </figcaption>
          </figure>

          <p>
            What this call cost: the heaviest step in the journey now comes before payment, on a user who
            hasn&apos;t yet invested anything. Drop-off moves up the funnel. What it gained: nobody pays for a
            service they may not be able to activate, and the operator doesn&apos;t have to absorb a refund and a
            lost client afterwards.
          </p>
        </>
      ),
    },
    resultsGroups: [{ key: "valide", label: "What was validated", dot: "bg-lime" }],
    resultsOutro: (
      <p>
        <strong>Status.</strong> In development. The app isn&apos;t yet deployed to the sales teams: no real usage
        data to date.
      </p>
    ),
    learnings: (
      <>
        <p>
          Research maps users, not platforms. My six interviews described the sales role precisely, and said
          nothing about what the operating system imposes, nor what happens to the app once it has actually
          downloaded three profiles. Three of the product&apos;s most structural features — location permission,
          profile switching, the branding library — came out of the handover, raised by the developer.
        </p>
        <p>
          This project moved, for me, the point at which technical reality enters design. It doesn&apos;t arrive at
          delivery: it belongs to the framing.
        </p>
      </>
    ),
    cover: { kind: "demoKitVideo" },
    peek: false,
    entryProp: "mobile",
    metrics: [
      {
        num: "8 / 10",
        label:
          "people downloaded and activated an eSIM profile unaided, in guerrilla testing with people new to eSIM",
        group: "valide",
        note: "strangers, not the salespeople",
      },
      {
        num: "6",
        label:
          "salespeople interviewed upfront, then brought back to test the prototype: the same people at the entrance and the exit of the design process",
        group: "valide",
      },
    ],
    chips: ["User research", "Internal tool", "Mobile · Theming"],
    z: "z-[2]",
  },
  {
    id: "customer-services",
    status: "live",
    color: "violet",
    tab: "Internal tool",
    title: "Customer Services Portal",
    titleBadge: { src: "/Rubber.png", alt: "« Operations Excellence Awards » badge", width: 609, height: 609 },
    meta: "Rethinking order creation in a complex B2B telecom environment.",
    metaSub: ["Thales", "Product Designer", "18 months"],
    role: (
      <>
        <p className="mb-4">
          An order management tool designed with the support teams, adopted without anyone being made to.
        </p>
        <ul className="flex flex-col gap-2.5">
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
            <span>
              <strong>The product:</strong>{" "}
              four tools replaced by one, nearly all orders moved over within 6 months, Gold Award in the
              group&apos;s operational excellence programme.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
            <span>
              <strong>The research:</strong>{" "}
              26 Customer Service heads interviewed, two in-person workshops, one insight nobody had seen in eight
              years.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-noir/40" />
            <span>
              <strong>My role:</strong> Product Designer, paired with a UX Researcher, in a team of ten. 18 months.
            </span>
          </li>
        </ul>
      </>
    ),
    desc: (
      <>
        Four tools replaced by one, and{" "}
        <strong>nearly all orders moved over within 6 months</strong>{" "}
        : an internal portal adopted without anyone being made to.
      </>
    ),
    contextTitle: "The project",
    context: (
      <>
        <p>
          Creating a SIM card order involved four tools: a spreadsheet for tracking, a word processor for the
          documents, an email client for the customer, an ERP for the system. None were connected. Manual re-entry
          at every step, no consolidated view.
        </p>
        <p>
          The knock-on effect showed up elsewhere: salespeople called the CS teams to get a status or fix an error.
          The CS teams spent part of their day answering questions whose answers already existed, somewhere.
        </p>
        <p>
          The subject had been identified for eight years. What was missing wasn&apos;t the will, but an
          understanding of the real work fine-grained enough not to deliver yet another tool.
        </p>
      </>
    ),
    roleDetail: (
      <>
        <p>
          Product Designer, paired with a UX Researcher, in a team of ten (PM, PO, PLM, 5 developers).
        </p>
        <p>
          She led the research protocol and the analysis. I co-ran the interviews and workshops, translated the
          insights into design positions, produced all the screens and the handover, and worked with engineering
          day to day.
        </p>
      </>
    ),
    extraSections: [
      {
        title: "The research",
        body: (
          <>
            <p>
              26 Customer Service heads worldwide. Two in-person workshops: reconstructing how an order actually
              gets created, then having them describe the tool they&apos;d want.
            </p>
            <p>
              The difficulty wasn&apos;t getting them to talk, it was getting them to put words to what they did
              without thinking. Habit makes a gesture so obvious it becomes indescribable. That&apos;s what the
              research setup went looking for.
            </p>
            <p>
              Three requests came back consistently: fill orders in automatically, stop having to write to clients
              at every step, keep an overview of orders in progress. A fourth was expected by nobody: the CS teams
              wanted a channel to pass files to each other without going through email. A need that appeared in no
              procedure, because it didn&apos;t belong to one.
            </p>
            <p>
              They weren&apos;t asking for features, they were describing frustrations in the shape of solutions.
              My work was to move back from the request to the problem, then design the answer — including when it
              didn&apos;t look like the request.
            </p>
            <PaperStat
              num="26"
              label="Customer Service heads interviewed worldwide, and two in-person workshops"
              note="the subject had been identified for eight years"
              noteId="note-csp-26"
            />
          </>
        ),
      },
      {
        title: "Two more decisions",
        placement: "afterDecisions",
        body: (
          <>
            <div>
              <p className="mb-2 font-bold text-ink">Three versions for a single journey.</p>
              <p className="mb-3">
                Creating an order isn&apos;t a form: it&apos;s a tree of cases, each branch existing because a real
                client demanded it one day. The first two versions failed in testing — users couldn&apos;t find
                their case, or lost the thread. We were looking for the problem in the interface; it was upstream.
                We had modelled the process from the CS point of view alone, without the constraints carried by the
                other stakeholders. The third version started from a workshop bringing CS and stakeholders
                together. That&apos;s the one that held.
              </p>
            </div>
            <div>
              <p className="mb-2 font-bold text-ink">Making information consultable rather than requested.</p>
              <p className="mb-3">
                The portal connects to the ERP and to the production chain systems: the status of a physical order
                becomes consultable independently, and each milestone reached triggers a notification to the
                client. The CS teams no longer relay information the system already knows.
              </p>
              <p>
                The internal channel spotted in research shipped in beta after the core product, a deliberate
                trade-off: it wasn&apos;t a condition of the migration.
              </p>
            </div>
          </>
        ),
      },
    ],
    decisionsTitle: "The key decision",
    decisionHero: {
      title: "The AI proposes, the CS decides.",
      body: (
        <>
          <p>
            The request was automatic filling. The real problem: re-keying purchase orders received as PDFs or on
            paper, slow and a source of errors that travelled back up to the sales teams.
          </p>
          <p>
            In 2024, putting a document-reading model into an internal tool was expensive and contested. We
            defended it as the answer to the single biggest time sink identified in research, not as a gimmick.
          </p>
          <p>
            The position taken was to refuse opaque automation. The AI pre-fills, and every field it filled appears
            in red: the system explicitly flags what it assumed. The CS keeps validation end to end. On a telecom
            purchase order, an undetected error costs more than the time saved.
          </p>
          <p>
            What this call cost: the CS reads everything. What it gained: she has nothing left to re-key, and the
            AI additionally checks the client&apos;s purchase order for completeness — a use nobody had asked for.
          </p>
        </>
      ),
    },
    craftProof: <NimbusPatterns patterns={["reorder", "tracking", "inbox"]} lang="en" intro="Three patterns, one principle. " />,
    craftProofBeforeResults: true,
    resultsGroups: [
      { key: "adoption", label: "Adoption", dot: "bg-violet" },
      { key: "reconnaissance", label: "Recognition", dot: "bg-lime" },
    ],
    learnings: (
      <p>
        Designing a domain interface for a field you don&apos;t know can&apos;t be improvised. We didn&apos;t get
        there by putting ourselves in the Customer Service teams&apos; shoes, but by building a setup to go and
        find what they knew: interviews, workshops, several rounds of co-design before the order journey held. The
        designer isn&apos;t the one who guesses the need — the designer is the instrument that lets users put it
        into words and make it concrete.
      </p>
    ),
    cover: { kind: "nimbusPrefill" },
    peek: false,
    entryProp: "field",
    metrics: [
      { num: "5 % → 95 %", label: "of orders moved over to the portal within 6 months, with no obligation to use it: the old system stayed available", group: "adoption", note: "and the old system stayed open the whole time" },
      { num: "4 → 1", label: "tools replaced by a single point of entry", group: "adoption" },
      { num: "~50 %", label: "of the CS teams' daily workload now handled in the portal", group: "adoption" },
      { num: "Gold Award", label: "the group's operational excellence programme, among several dozen internal entries", group: "reconnaissance" },
      { num: "2", label: "product lines are looking at adopting the solution for their own teams", group: "reconnaissance", note: "they're looking at it, they haven't moved over" },
    ],
    chips: ["User research", "Complex B2B", "AI"],
    z: "z-[3]",
  },
];

export const ID_ROWS: IdRow[] = [
  {
    dt: "Education",
    lines: [
      { text: "Master's in Interface & Experience Design · Ingémédia, Toulon · 2025" },
      { text: "on a work-study contract at Thales", muted: true },
      { text: "Bachelor's in Information & Communication · Avignon · 2023" },
    ],
  },
  {
    dt: "Experience",
    lines: [
      {
        text: "Product Designer · Thales, via Groupe SII · April 2024 → present",
        node: (
          <>
            <strong className="font-bold">Product Designer</strong> ·{" "}
            <strong className="font-bold">Thales</strong>, via{" "}
            <strong className="font-bold">Groupe SII</strong> · April 2024 → present
          </>
        ),
      },
      { text: "internship, then work-study, then permanent contract", muted: true },
      { text: "Community Manager · F&C SAS · April to July 2023" },
    ],
  },
  {
    dt: "Languages",
    lines: [{ text: "French (native) · English (C1)" }],
  },
];

export const ABOUT_TEXT =
  "I design applications for demanding environments, often as the only designer within technical teams of product managers, architects and developers. I ground every design decision in user research, and I document it with the same rigour as the code around it — including when that documentation is written for AI agents.";

export const HERO_TEXT =
  "Specialised in highly complex systems, I bridge business needs analysis and the technical delivery of interfaces.";

/* Les fiches compétences sont des IMAGES dont le texte est en français, incrustée.
   Seul l'alt est traduisible ici ; les visuels eux-mêmes restent à refaire en anglais. */
export const SKILL_CARDS: SkillCard[] = [
  {
    kicker: "Card 01",
    title: "Design & Method",
    color: "paper",
    rot: "-rotate-[1.5deg]",
    tape: "lime",
    pills: [
      "User research", "Interviews & testing", "Co-design workshops",
      "Discovery & framing", "Design systems", "Documentation & governance",
      "WCAG 2.2 · RGAA accessibility", "Developer handover", "Agile methods",
    ],
    image: "/Design & Méthodologie.png",
    imageWidth: 698,
    imageHeight: 830,
  },
  {
    kicker: "Card 02",
    title: "Technical & AI",
    color: "violet",
    rot: "rotate-[1.6deg]",
    tape: "paper",
    pills: [
      "Design-to-code", "Coded prototypes", "Wired to APIs",
      "AI prompts & skills", "React", "Next.js", "Tailwind CSS",
    ],
    image: "/Technique & IA.png",
    imageWidth: 619,
    imageHeight: 830,
  },
  {
    kicker: "Card 03",
    title: "Tools",
    color: "lime",
    rot: "-rotate-[1.2deg]",
    tape: "paper",
    pills: [
      "Advanced Figma", "Variables & modes", "Shared tokens & libraries",
      "FigJam", "Condens", "Illustrator", "Photoshop", "VS Code", "Cursor",
    ],
    image: "/Outils.png",
    imageWidth: 619,
    imageHeight: 830,
  },
];
