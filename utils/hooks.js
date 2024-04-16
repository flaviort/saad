async function getPosts() {
    const query = `
        {
            posts(first: 5) {
                nodes {
                    title
                    content
                    uri
                }
            }
        }
    `

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
            query
        )}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 0,
            }
        }
    )

    const { data } = await res.json()

    return data.posts.nodes
}