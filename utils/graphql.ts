import { cache } from 'react'

// types
import type { Locale } from 'next-intl'
import type { ProjectEdge, ProjectsResponse } from '@/types/wordpress'

// WP_GRAPHQL_URL overrides the endpoint without editing this file
const websiteUrl = process.env.WP_GRAPHQL_URL || 'http://saad.local/graphql'
//const websiteUrl = 'https://senzdsn.com/sites/saad/graphql'

// cached per request, so metadata, static params and the page share one fetch
export const getProjects = cache(async (locale?: Locale): Promise<ProjectsResponse> => {
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
                                modifiedGmt
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
                                        }
                                        ... on ProjectsGallerySliderLayout {
                                            slides {
                                                image {
                                                    node {
                                                        sourceUrl
                                                    }
                                                }
                                            }
                                        }
                                        ... on ProjectsGalleryFeaturedVideoLayout {
                                            fullVideo
                                            smallVideo
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
        let filteredProjects: ProjectEdge[] = data.data.projects.edges
        
        if (locale) {
            filteredProjects = filteredProjects.filter(edge => {
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
        
    } catch {
        return { edges: [] }
    }
})
