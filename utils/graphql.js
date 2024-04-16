// define the website url with the graphql endpoint here
const websiteUrl = 'http://localhost/clients/saad-wp-next/graphql'

// get site settings
export async function getSiteSettings() {
    try {
        const res = await fetch(websiteUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `query {
                    options {
                        siteSettings {
                            address
                            email
                            instagram
                            linkedin
                            phone
                        }
                    }
                }`
            })
        })

        const data = await res.json()
        
        return data.data.options.siteSettings
        
    } catch (error) {
        console.error('Error fetching site settings:', error)
        return null
    }
}