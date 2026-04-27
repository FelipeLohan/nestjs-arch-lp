import { CodeBlock } from '../ui/CodeBlock'
import './Configuration.css'

const OPTIONS = [
  {
    option: 'enabled',
    type: 'boolean',
    default: 'true',
    description: 'Enables or disables the entire module. Set to false in production.',
  },
  {
    option: 'apiPath',
    type: 'string',
    default: "'explorer-data'",
    description: 'Path for the JSON API endpoint that serves the ArchitectureMap.',
  },
  {
    option: 'dashboardPath',
    type: 'string',
    default: "'arch'",
    description: 'Path for the interactive graph dashboard.',
  },
  {
    option: 'guardFn',
    type: '() => boolean',
    default: '—',
    description: (
      <>
        Called on every JSON API request. Return <code className="cfg__inline-code">false</code> to
        respond with 403. Does not restrict the static dashboard assets.
      </>
    ),
  },
] as const

const EXAMPLE_CODE = `\
ExplorerModule.forRoot({
  apiPath:       'internal/arch-data',
  dashboardPath: 'internal/arch',
  guardFn:       () => process.env.NODE_ENV === 'development',
})`

export function Configuration() {
  return (
    <section className="cfg">
      <div className="container">
        <div className="cfg__header">
          <span className="section-label">Configuration</span>
          <h2 className="cfg__title">All options, at a glance</h2>
          <p className="cfg__subtitle">
            Every option is optional.{' '}
            <code className="cfg__inline-code">ExplorerModule.forRoot(&#123;&#125;)</code> works
            out of the box with zero arguments.
          </p>
        </div>

        <div className="cfg__body">
          {/* Options table */}
          <div className="cfg__table-wrap">
            <table className="cfg__table" aria-label="Configuration options">
              <thead>
                <tr>
                  <th scope="col">Option</th>
                  <th scope="col">Type</th>
                  <th scope="col">Default</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {OPTIONS.map((row) => (
                  <tr key={row.option}>
                    <td>
                      <code className="cfg__opt-name">{row.option}</code>
                    </td>
                    <td>
                      <code className="cfg__type">{row.type}</code>
                    </td>
                    <td>
                      <code className="cfg__default">{row.default}</code>
                    </td>
                    <td className="cfg__desc">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Example */}
          <div className="cfg__example">
            <p className="cfg__example-label">Example — custom paths &amp; guard</p>
            <CodeBlock
              language="typescript"
              filename="app.module.ts"
              code={EXAMPLE_CODE}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
