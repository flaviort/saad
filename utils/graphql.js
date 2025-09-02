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
                    projects(first: 99) {
                        edges {
                            node {
                                title
                                slug
                                featuredImage {
                                    node {
                                        sourceUrl
                                    }
                                }
                                projects {
                                    title
                                    subtitle
                                    darkText
                                    category
                                    tags {
                                        tag
                                    }
                                    language
                                    about
                                    testimonials {
                                        company
                                        name
                                        position
                                        testimonial
                                    }
                                    services {
                                        service
                                    }
                                    awards {
                                        award
                                    }
                                    credits {
                                        credit
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
                                            enable_sound
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
        
        if (data.errors || !data.data || !data.data.projects) {
            return { edges: [] }
        }

        // Filter by language using the language field from WordPress
        let filteredProjects = data.data.projects.edges
        
        if (locale) {
            filteredProjects = data.data.projects.edges.filter(edge => {
                const projectLanguage = edge.node.projects?.language
                
                if (locale === 'en') {
                    // Show projects with 'en_us' language or no language set (fallback to English)
                    return projectLanguage === 'en_us' || !projectLanguage
                } else if (locale === 'pt') {
                    // Show projects with 'pt_br' language
                    return projectLanguage === 'pt_br'
                }
                
                // Default fallback
                return true
            })
        }
        
        return {
            edges: filteredProjects
        }
        
    } catch (error) {
        return { edges: [] }
    }
}
