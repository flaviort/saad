// define the website url with the graphql endpoint here
const websiteUrl = 'https://senzdsn.com/sites/saad/graphql'

export async function getProjects(locale) {
    const language = locale === 'en' ? 'EN' : 'PT';
    try {
        const res = await fetch(websiteUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `query GetPosts($language: LanguageCodeFilterEnum!) {
                    posts(where: {language: $language}) {
                        edges {
                            node {
                                title
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
                                    about
                                    awards {
                                        award
                                    }
                                    credits {
                                        credit
                                    }
                                    darkText
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
                                    testimonials {
                                        company
                                        name
                                        position
                                        testimonial
                                    }
                                    title
                                }
                            }
                        }
                    }
                }`,
                variables: {
                    language: language
                }
            })
        })

        const responseBody = await res.text()
        const data = JSON.parse(responseBody)
        
        if (data.errors) {
            console.error('GraphQL errors:', data.errors)
            return null
        }

        return data.data.posts
        
    } catch (error) {
        console.error('Error fetching site settings:', error)
        return null
    }
}