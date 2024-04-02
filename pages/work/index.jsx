// libraries
import clsx from 'clsx'

// routes / utils
import projects from '@/utils/projects'

// components
import SeoContainer from '@/components/utils/seo-container'
import FollowMouse from '@/components/utils/follow-mouse'
import Project from '@/components/project'
import ContactMarquee from '@/components/contact-marquee'

// css
import styles from './work.module.scss'

export default function Work() {

    return (
		<>
			<SeoContainer
				pageTitle='Work'
				pageDescription='Creating the future for ambitious brands. We develop projects that transform visions and businesses.'
			/>

			<section className={clsx(styles.topPart, 'padding-top-bigger padding-bottom-big')}>
				<div className='container'>
					<div className="grid-container">
						<div className="grid-md-2-7">
							<h2 className='font-big'>
								Creating the future for ambitious brands. <br />
								We develop projects that transform visions and businesses.
							</h2>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.projects}>
				<FollowMouse text='View'>
					{projects.map((item, i) => (
						<Project
							key={i}
							link={item.link}
							image={item.image}
							darkText={item.darkText}
							client={item.client}
							title={item.title}
							category={item.category}
							tags={item.tags}
						/>
					))}
				</FollowMouse>
			</section>

			<ContactMarquee />

		</>
    )
}