import { useState } from 'react'
import './Hero.css'

const GITHUB_URL = 'https://github.com/FelipeLohan/nestjs-architecture-explorer'
const INSTALL_CMD = 'npm install nestjs-arch-explorer'

export function Hero() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section className="hero">
      <div className="container hero__inner">

        <div className="hero__text animate-fade-in">
          <span className="badge badge--indigo hero__badge">
            <span className="hero__badge-dot" />
            Open Source · MIT License
          </span>

          <h1 className="hero__title">
            Visualize your NestJS architecture.{' '}
            <span className="hero__title-accent">Instantly.</span>
          </h1>

          <p className="hero__sub">
            Add one import. Open <code className="hero__code">/arch</code>.
            See your whole app — modules, controllers, providers and their
            dependencies rendered as an interactive graph. Zero extra decorators
            required.
          </p>

          <div className="hero__actions animate-fade-in animate-delay-1">
            <a href="#quick-start" className="btn btn-primary">
              Get Started
              <ArrowRight />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <GitHubIcon />
              View on GitHub
            </a>
          </div>

          <button
            type="button"
            className="hero__install animate-fade-in animate-delay-2"
            onClick={handleCopy}
            aria-label="Copy install command"
          >
            <span className="hero__install-prompt">$</span>
            <span className="hero__install-cmd">{INSTALL_CMD}</span>
            <span className="hero__install-copy">
              {copied ? <CheckIcon /> : <CopyIcon />}
              {copied ? 'Copied!' : 'Copy'}
            </span>
          </button>
        </div>

        <div className="hero__visual animate-fade-in animate-delay-2">
          <img
            src="/architecture.png"
            alt="nestjs-arch-explorer dashboard — interactive architecture graph showing modules, controllers and providers"
            className="hero__screenshot"
          />
        </div>

      </div>

      <div className="hero__glow" aria-hidden="true" />
    </section>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
