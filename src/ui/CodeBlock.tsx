import { useState } from 'react'
import './CodeBlock.css'

type Language = 'typescript' | 'bash' | 'text'

interface CodeBlockProps {
  code: string
  language?: Language
  filename?: string
}

export function CodeBlock({ code, language = 'text', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const tokens = tokenize(code.trim(), language)

  return (
    <div className="code-block">
      <div className="code-block__header">
        <span className="code-block__lang">
          {filename ?? language}
        </span>
        <button
          type="button"
          className="code-block__copy"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="code-block__pre">
        <code>
          {tokens.map((token, i) => (
            <span key={i} className={token.type ? `token token--${token.type}` : undefined}>
              {token.value}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

/* ── Tokeniser ──────────────────────────────────────────────────────────── */

type TokenType =
  | 'comment'
  | 'string'
  | 'decorator'
  | 'keyword'
  | 'type-name'
  | 'number'
  | 'property'
  | 'plain'

interface Token { type: TokenType | null; value: string }

const TS_KEYWORDS = new Set([
  'import', 'from', 'export', 'default', 'class', 'interface', 'extends',
  'implements', 'return', 'const', 'let', 'var', 'function', 'async', 'await',
  'new', 'this', 'true', 'false', 'null', 'undefined', 'type', 'enum',
  'static', 'public', 'private', 'protected', 'readonly', 'abstract',
  'typeof', 'void', 'never', 'any', 'unknown', 'as', 'if', 'else', 'for',
  'while', 'of', 'in', 'declare', 'namespace', 'module', 'keyof',
])

const BASH_KEYWORDS = new Set(['npm', 'npx', 'pnpm', 'yarn', 'node'])

const MASTER_RE = new RegExp(
  [
    /\/\/[^\n]*/.source,                  // single-line comment
    /\/\*[\s\S]*?\*\//.source,            // block comment
    /#[^\n]*/.source,                     // bash comment
    /`(?:[^`\\]|\\.)*`/.source,           // template literal
    /'(?:[^'\\]|\\.)*'/.source,           // single-quoted string
    /"(?:[^"\\]|\\.)*"/.source,           // double-quoted string
    /@[\w]+/.source,                      // decorator
    /\b\d+(?:\.\d+)?\b/.source,           // number
    /\b[A-Z][A-Za-z0-9_]*\b/.source,      // PascalCase → type name
    /\b[a-z_]\w*\b/.source,               // identifier (keyword or plain)
    /\.[\w]+/.source,                     // .property access
    /[^\w\s]/.source,                     // operators / punctuation
    /\s+/.source,                         // whitespace (preserve)
  ].join('|'),
  'g',
)

function tokenize(code: string, language: Language): Token[] {
  if (language === 'text') return [{ type: null, value: code }]

  const keywords = language === 'bash' ? BASH_KEYWORDS : TS_KEYWORDS
  const tokens: Token[] = []

  for (const match of code.matchAll(MASTER_RE)) {
    const value = match[0]

    if (!value) continue

    // Whitespace — preserve as-is
    if (/^\s+$/.test(value)) {
      tokens.push({ type: null, value })
      continue
    }

    // Comments
    if (value.startsWith('//') || value.startsWith('/*') || value.startsWith('#')) {
      tokens.push({ type: 'comment', value })
      continue
    }

    // Strings & template literals
    if (value[0] === "'" || value[0] === '"' || value[0] === '`') {
      tokens.push({ type: 'string', value })
      continue
    }

    // Decorators
    if (value[0] === '@') {
      tokens.push({ type: 'decorator', value })
      continue
    }

    // Numbers
    if (/^\d/.test(value)) {
      tokens.push({ type: 'number', value })
      continue
    }

    // PascalCase → type name
    if (/^[A-Z]/.test(value)) {
      tokens.push({ type: 'type-name', value })
      continue
    }

    // .property access
    if (value[0] === '.') {
      tokens.push({ type: 'property', value })
      continue
    }

    // Keywords
    if (keywords.has(value)) {
      tokens.push({ type: 'keyword', value })
      continue
    }

    tokens.push({ type: 'plain', value })
  }

  return tokens
}

/* ── Icons ──────────────────────────────────────────────────────────────── */

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
