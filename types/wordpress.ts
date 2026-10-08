// shape of the WPGraphQL response requested in utils/graphql.ts

export type WpImage = {
	node: {
		sourceUrl: string
	}
}

export type ProjectTestimonial = {
	company: string
	name: string
	position: string
	testimonial: string
}

export type ProjectGalleryItem = {
	imageDescription?: string | null
	image?: WpImage | null
	videoId?: string | null
	slides?: {
		image: WpImage
		imageDescription?: string | null
	}[] | null
	fullVideo?: string | null
	smallVideo?: string | null
}

export type ProjectFields = {
	title?: string | null
	subtitle?: string | null
	darkText?: boolean | null
	category?: string | null
	tags?: { tag: string }[] | null
	language?: 'en_us' | 'pt_br' | null
	about?: string | null
	testimonials?: ProjectTestimonial[] | null
	services?: { service: string }[] | null
	awards?: { award: string }[] | null
	credits?: { credit: string }[] | null
	gallery?: ProjectGalleryItem[] | null
}

export type ProjectNode = {
	title: string
	slug: string
	// last edit in WordPress (UTC, without the Z), used for the sitemap
	modifiedGmt?: string | null
	featuredImage: WpImage
	projects: ProjectFields
}

export type ProjectEdge = {
	node: ProjectNode
}

export type ProjectsResponse = {
	edges: ProjectEdge[]
}
