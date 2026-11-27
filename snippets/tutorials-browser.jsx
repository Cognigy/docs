import { useState, useEffect } from 'react'

/**
 * Filterable tutorial browser.
 *
 * Everything lives inside the component on purpose: Mintlify's snippet
 * compiler emits only the exported function and drops module-level code,
 * so constants declared outside would be undefined at render time.
 */
export const TutorialsBrowser = () => {
  // Registry of every tutorial. Add an entry here when a new page is created;
  // filters, counts, and pagination all derive from this list.
  // `popular: true` puts a tutorial in the default view.
  const TUTORIALS = [
    { title: 'Quickstart',
      desc: 'Create a chat agent called Sam Support and test it in the interaction panel.',
      product: 'Cognigy', level: 'Beginner', mins: 15, popular: true,
      href: '/ai/getting-started/quickstart' },
    { title: 'Getting started with Knowledge AI',
      desc: 'Create a knowledge store, upload knowledge sources, and test an agent that answers from them.',
      product: 'Cognigy', level: 'Intermediate', mins: 30, popular: true,
      href: '/ai/agents/develop/knowledge-ai/getting-started' },
    { title: 'Build Klara, a customer service agent',
      desc: 'Create a project and build an agent with a brand persona, a skill, tools, and guardrails.',
      product: 'Cognigy', level: 'Beginner', mins: 45, popular: false,
      href: '/tutorials/cognigy-ai/build-klara-customer-service-agent' },
    { title: 'Hand over between an agent and a flow',
      desc: 'Let an agent hand a conversation to a flow and let the flow hand it back.',
      product: 'Cognigy', level: 'Intermediate', mins: 25, popular: false,
      href: '/tutorials/cognigy-ai/hand-over-between-agent-and-flow' },
    { title: 'Redact personal data with a pre-turn flow',
      desc: 'Mask emails and card numbers in customer messages before the agent reads them.',
      product: 'Cognigy', level: 'Advanced', mins: 20, popular: false,
      href: '/tutorials/cognigy-ai/redact-data-with-a-pre-turn-flow' },
    { title: 'Getting started with voice agents',
      desc: 'Create a voice agent called Nelly Voice and test it with a voice call in your browser.',
      product: 'Voice', level: 'Beginner', mins: 15, popular: true,
      href: '/tutorials/voice-gateway/getting-started-with-voice-agents' },
    { title: 'Customize the greeting and barge-in of a voice agent',
      desc: 'Change the greeting of a voice agent and control how callers interrupt it in the voice studio.',
      product: 'Voice', level: 'Intermediate', mins: 15, popular: false,
      href: '/tutorials/voice-gateway/customize-greeting-and-barge-in' },
    { title: 'Switch a voice agent to speech to speech',
      desc: 'Turn on speech to speech for a voice agent, choose its models and voice, and test a call.',
      product: 'Voice', level: 'Intermediate', mins: 20, popular: false,
      href: '/tutorials/voice-gateway/switch-a-voice-agent-to-speech-to-speech' },
    { title: 'Getting started with Webchat',
      desc: 'Create an agent, deploy it with Webchat, and configure feedback forms and conversation starters.',
      product: 'Webchat', level: 'Beginner', mins: 30, popular: true,
      href: '/webchat/getting-started' },
    { title: 'Getting started with Agent Copilot for chat',
      desc: 'Configure a workspace with widgets that suggest next actions to human agents.',
      product: 'Agent Copilot', level: 'Intermediate', mins: 30, popular: false,
      href: '/agent-copilot/getting-started/chat' },
    { title: 'Getting started with Agent Copilot for voice',
      desc: 'Set up a workspace with next action widgets and call transcripts for voice.',
      product: 'Agent Copilot', level: 'Intermediate', mins: 40, popular: false,
      href: '/agent-copilot/getting-started/voice' },
    { title: 'Getting started with Agent Copilot for voice-to-chat',
      desc: 'Configure next action and conversation transcript widgets for voice-to-chat.',
      product: 'Agent Copilot', level: 'Intermediate', mins: 40, popular: false,
      href: '/agent-copilot/getting-started/voice-to-chat' },
    { title: 'Build your first xApp',
      desc: 'Use adaptive cards to build login and registration forms for an agent.',
      product: 'xApps', level: 'Intermediate', mins: 30, popular: true,
      href: '/xApps/build/first-xApp' },
    { title: 'Build an xApp with multiple channels',
      desc: 'Complement voice and SMS channels with an xApp form linked through Twilio.',
      product: 'xApps', level: 'Advanced', mins: 30, popular: false,
      href: '/xApps/build/xApp-with-multi-channels' },
    { title: 'Build a standalone xApp',
      desc: 'Build and deploy an xApp that users open by URL, without a primary channel.',
      product: 'xApps', level: 'Advanced', mins: 30, popular: false,
      href: '/xApps/build/standalone-xApp' },
    { title: 'Click To Call with a text input field',
      desc: 'Add a text input field to the widget so callers can type precise data during a call.',
      product: 'Click To Call', level: 'Intermediate', mins: 40, popular: false,
      href: '/click-to-call/tutorials/text-input-field' },
    { title: 'Click To Call with a selector field',
      desc: 'Add a selector field to the widget so callers can pick from options during a call.',
      product: 'Click To Call', level: 'Intermediate', mins: 40, popular: false,
      href: '/click-to-call/tutorials/selector-field' },
    { title: 'Getting started with AI Ops Center',
      desc: 'Create an agent, monitor its metrics, track errors, and enable alerts.',
      product: 'AI Ops Center', level: 'Beginner', mins: 30, popular: false,
      href: '/ops-center/getting-started' },
  ]

  const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
  const STORE_KEY = 'cognigy-tutorials-filters'
  const PER_PAGE = 6

  const PRODUCTS = TUTORIALS.map((t) => t.product).filter((p, i, a) => a.indexOf(p) === i)

  const [view, setView] = useState('popular')
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [levels, setLevels] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}')
      if (Array.isArray(saved.products)) setProducts(saved.products)
      if (Array.isArray(saved.levels)) setLevels(saved.levels)
      if (saved.view === 'all' || saved.view === 'popular') setView(saved.view)
    } catch (e) {
      /* ignore malformed storage */
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ products, levels, view }))
    } catch (e) {
      /* storage unavailable; filters just will not persist */
    }
  }, [products, levels, view])

  // Narrowing by product, level, or search implies the reader wants the whole
  // catalogue searched, not just the popular subset.
  const widen = () => setView('all')

  const toggle = (list, setList, value) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
    setPage(1)
    widen()
  }

  const q = query.trim().toLowerCase()
  const results = TUTORIALS.filter((t) => {
    if (view === 'popular' && !t.popular) return false
    const matchesQuery =
      !q || t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
    const matchesProduct = !products.length || products.includes(t.product)
    const matchesLevel = !levels.length || levels.includes(t.level)
    return matchesQuery && matchesProduct && matchesLevel
  })

  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE))
  const current = Math.min(page, pages)
  const shown = results.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  const active = query || products.length || levels.length || view === 'all'
  const reset = () => {
    setQuery('')
    setProducts([])
    setLevels([])
    setView('popular')
    setPage(1)
  }

  return (
    <div className="tut-browser">
      <div className="tut-filters">
        <input
          type="search"
          className="tut-search"
          placeholder="Search tutorials"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setPage(1)
            if (e.target.value) widen()
          }}
          aria-label="Search tutorials"
        />

        <div className="tut-group" role="group" aria-label="Filter by product">
          <span className="tut-legend">Product</span>
          {PRODUCTS.map((p) => (
            <label key={p} className="tut-check">
              <input
                type="checkbox"
                checked={products.includes(p)}
                onChange={() => toggle(products, setProducts, p)}
              />
              <span>{p}</span>
            </label>
          ))}
        </div>

        <div className="tut-group" role="group" aria-label="Filter by level">
          <span className="tut-legend">Level</span>
          {LEVELS.map((l) => (
            <label key={l} className="tut-check">
              <input
                type="checkbox"
                checked={levels.includes(l)}
                onChange={() => toggle(levels, setLevels, l)}
              />
              <span>{l}</span>
            </label>
          ))}
        </div>

        {active ? (
          <button type="button" className="tut-reset" onClick={reset}>
            Reset filters
          </button>
        ) : null}
      </div>

      <div className="tut-results">
        <p className="tut-count">
          {view === 'popular' && !q && !products.length && !levels.length
            ? `${results.length} popular tutorials`
            : `${results.length} of ${TUTORIALS.length} tutorials`}
          <button
            type="button"
            className="tut-toggle"
            onClick={() => { setView(view === 'popular' ? 'all' : 'popular'); setPage(1) }}
          >
            {view === 'popular' ? 'Show all' : 'Show popular'}
          </button>
        </p>

        {results.length === 0 ? (
          <p className="tut-empty">
            No tutorials match those filters.{' '}
            <button type="button" onClick={reset}>Reset</button>
          </p>
        ) : (
          <div className="tut-grid">
            {shown.map((t) => (
              <a key={t.href} href={t.href} className="tut-card">
                <span className="tut-card-title">{t.title}</span>
                <span className="tut-card-desc">{t.desc}</span>
                <span className="tut-card-meta">
                  <span className="tut-card-product">{t.product}</span>
                  <span className={`tut-badge tut-badge--${t.level.toLowerCase()}`}>{t.level}</span>
                  <span className="tut-mins">{t.mins} min</span>
                </span>
              </a>
            ))}
          </div>
        )}

        {pages > 1 ? (
          <nav className="tut-pager" aria-label="Tutorial pages">
            <button
              type="button"
              className="tut-page-btn"
              onClick={() => setPage(current - 1)}
              disabled={current === 1}
            >
              Previous
            </button>
            <span className="tut-page-of">Page {current} of {pages}</span>
            <button
              type="button"
              className="tut-page-btn"
              onClick={() => setPage(current + 1)}
              disabled={current === pages}
            >
              Next
            </button>
          </nav>
        ) : null}
      </div>
    </div>
  )
}
