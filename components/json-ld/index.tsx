type JsonLdProps = {
    // one or more schema.org nodes, combined into a single @graph
    data: Record<string, unknown>[]
}

// structured data for search engines. "<" is escaped so content coming from
// WordPress can't close the script tag early
export default function JsonLd({ data }: JsonLdProps) {
    const graph = {
        '@context': 'https://schema.org',
        '@graph': data
    }

    return (
        <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
        />
    )
}
