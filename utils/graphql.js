//const websiteUrl = 'http://localhost/clients/saad/graphql'
const websiteUrl = 'https://senzdsn.com/sites/saad/graphql'

export async function getProjects(locale) {
    try {
        const res = await fetch(websiteUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query GetPosts {
                    posts(first: 10) {
                        edges {
                            node {
                                id
                                title
                                slug
                                categories {
                                    nodes {
                                        name
                                    }
                                }
                                tags {
                                    nodes {
                                        name
                                    }
                                }
                                featuredImage {
                                    node {
                                        sourceUrl
                                    }
                                }
                                projects {
                                    title
                                    darkText
                                    about
                                    awards {
                                        award
                                    }
                                    credits {
                                        credit
                                    }
                                    testimonials {
                                        company
                                        name
                                        position
                                        testimonial
                                    }
                                    services {
                                        service
                                    }
                                    gallery {
                                        ... on ProjectsGalleryImageLayout {
                                            imageDescription
                                            image {
                                                node {
                                                    sourceUrl
                                                }
                                            }
                                        }
                                        ... on ProjectsGalleryVideoLayout {
                                            videoId
                                        }
                                    }
                                }
                            }
                        }
                    }
                }`
            })
        })

        if (!res.ok) {
            return { edges: [] }
        }

        const responseBody = await res.text()
        const data = JSON.parse(responseBody)
        
        if (data.errors || !data.data || !data.data.posts) {
            return { edges: [] }
        }

        // Filter by language based on slug patterns
        let filteredPosts = data.data.posts.edges
        
        if (locale) {
            filteredPosts = data.data.posts.edges.filter(edge => {
                const slug = edge.node.slug || ''
                
                if (locale === 'en') {
                    // English posts typically don't have numbers or language suffixes
                    // Look for slugs without "-2" or similar patterns that indicate duplicates/translations
                    return !slug.endsWith('-2') && !slug.includes('-pt')
                } else {
                    // Portuguese posts might have "-2" suffix or "-pt" 
                    // or contain accented characters in the slug
                    return slug.endsWith('-2') || slug.includes('-pt') || /[àáâãäåæçèéêëìíîïñòóôõöøùúûüýÿ]/.test(slug)
                }
            })
        }
        
        return {
            edges: filteredPosts
        }
        
    } catch (error) {
        return { edges: [] }
    }
}
