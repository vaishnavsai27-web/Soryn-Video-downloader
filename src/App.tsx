
import { useState } from 'react'
import { Download, ShieldCheck } from 'lucide-react'
import { SorynLogo } from './components/SorynLogo/SorynLogo'
import { BRAND } from './config/brand'
import './App.css'

export default function App() {
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')

  function checkLink() {
    try {
      const parsed = new URL(url.trim())
      const host = parsed.hostname.toLowerCase().replace(/^www\./, '')

      if (
        host === 'instagram.com' ||
        host.endsWith('.instagram.com')
      ) {
        setMessage(
          'Instagram link recognized. Use official download options.',
        )
      } else if (
        host === 'youtube.com' ||
        host.endsWith('.youtube.com') ||
        host === 'youtu.be'
      ) {
        setMessage(
          'YouTube link recognized. Use official download options.',
        )
      } else {
        setMessage('Please enter a valid Instagram or YouTube link.')
      }
    } catch {
      setMessage('Please enter a complete URL starting with https://')
    }
  }

  return (
    <main className="app">
      <nav className="nav">
        <a className="brand" href="#" aria-label={`${BRAND.name} home`}>
          <SorynLogo variant="responsive" height={40} />
        </a>

        <span className="privacy">
          <ShieldCheck size={16} /> Permission-first
        </span>
      </nav>

      <section className="hero">
        <span className="eyebrow">YOUR VIDEO TOOLKIT</span>

        <h1>
          Save what matters.
          <br />
          <span>Keep it yours.</span>
        </h1>

        <p>
          Instagram and YouTube links, with official download guidance.
        </p>

        <div className="platforms">
          <span>◎ Instagram</span>
          <span>▶ YouTube</span>
        </div>
      </section>

      <section className="panel">
        <label htmlFor="video-url">Paste your video link</label>

        <div className="input-row">
          <input
            id="video-url"
            type="url"
            placeholder="https://..."
            value={url}
            onChange={(event) => {
              setUrl(event.target.value)
              setMessage('')
            }}
          />

          <button onClick={checkLink} disabled={!url.trim()}>
            Check link <Download size={17} />
          </button>
        </div>

        {message && (
          <p className="message" role="status">
            {message}
          </p>
        )}

        <p className="note">
          Link checking happens in your browser. This starter does not
          extract videos or bypass platform restrictions.
        </p>
      </section>

      <footer>
        <SorynLogo variant="full" animated={false} height={26} />
        <span className="credit">{BRAND.credit}</span>
      </footer>
    </main>
  )
}
