import { CodeBlock } from '../ui/CodeBlock'
import { useInView } from '../hooks/useInView'
import './QuickStart.css'

const MODULE_CODE = `\
// app.module.ts
import { Module } from '@nestjs/common';
import { ExplorerModule } from 'nestjs-arch-explorer';

@Module({
  imports: [
    ExplorerModule.forRoot({
      enabled: process.env.NODE_ENV !== 'production',
    }),
  ],
})
export class AppModule {}`

const STEPS = [
  {
    number: '01',
    title: 'Install the package',
    description: 'Add nestjs-arch-explorer to your project with your package manager of choice.',
    content: (
      <CodeBlock
        language="bash"
        code="npm install nestjs-arch-explorer"
      />
    ),
  },
  {
    number: '02',
    title: 'Register the module',
    description: (
      <>
        Import <code className="qs__inline-code">ExplorerModule</code> into your root{' '}
        <code className="qs__inline-code">AppModule</code>. Set{' '}
        <code className="qs__inline-code">enabled: false</code> in production — that's it.
      </>
    ),
    content: (
      <CodeBlock
        language="typescript"
        filename="app.module.ts"
        code={MODULE_CODE}
      />
    ),
  },
  {
    number: '03',
    title: 'Open the dashboard',
    description: 'Start your app and navigate to the dashboard. Your full architecture is waiting.',
    content: (
      <CodeBlock
        language="text"
        code="http://localhost:3000/arch"
      />
    ),
  },
] as const

export function QuickStart() {
  const { ref, inView } = useInView<HTMLOListElement>()

  return (
    <section className="qs" id="quick-start">
      <div className="container">
        <div className="qs__header">
          <span className="section-label">Quick Start</span>
          <h2 className="qs__title">Up and running in&nbsp;3 steps</h2>
          <p className="qs__subtitle">
            No boilerplate, no extra decorators. One import and your architecture is visible.
          </p>
        </div>

        <ol ref={ref} className={`qs__steps${inView ? ' in-view' : ''}`} aria-label="Setup steps">
          {STEPS.map((step) => (
            <li key={step.number} className="qs__step">
              <div className="qs__step-aside">
                <span className="qs__step-num" aria-hidden="true">{step.number}</span>
                <div className="qs__step-line" aria-hidden="true" />
              </div>
              <div className="qs__step-body">
                <h3 className="qs__step-title">{step.title}</h3>
                <p className="qs__step-desc">{step.description}</p>
                <div className="qs__step-code">{step.content}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
