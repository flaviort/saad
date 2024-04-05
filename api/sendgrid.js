const mail = require('@sendgrid/mail')

// remember to create this .env locally and on vercel too
mail.setApiKey(process.env.SG_KEY)

const from = 'flavioczuk@gmail.com'
const to = 'flavioczuk@gmail.com'

// the line below disable eslint on this file
// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {

	const body = JSON.parse(req.body)

	// convert the JSON object into an array of key-value pairs
    const keyValuePairs = Object.entries(body)

    // map each key-value pair to a string with the format "key: value"
    const formattedData = keyValuePairs.map(([key, value]) => `
		<tr style='vertical-align: top;'>
			<td style='padding: 10px; border: 1px solid #ccc; background-color: #f2f2f2; font-size: 14px; line-height: 1.25; color: #030304;'>
				<strong>${key}:</strong>
			</td>
			<td style='padding: 10px; border: 1px solid #ccc; font-size: 14px; line-height: 1.25; color: #030304;'>
				${value}
			</td>
		</tr>
	`).join('')

	const message = `
		<div style='background-color: #E4DCD1; padding: 50px 20px; font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Fira Sans', Ubuntu, Oxygen, 'Oxygen Sans', Cantarell, 'Droid Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Lucida Grande', Helvetica, Arial, sans-serif;'>
			<div style='display: block; margin: auto; background-color: #fff; padding: 40px; width: 520px; max-width: 520px'>
				
				<p style='font-size: 18px; color: #030304;'>
					<strong>This form has been sent via website</strong>
				</p>
				
				<hr><br />

				<table style='border-collapse: collapse; border: 0; width: 100%;' cellspacing='0' cellpadding='0'>
					<tbody>
						${formattedData}
					</tbody>
				</table>

			</div>
		</div>
	`;

	const data = {
		to: to,
		from: from,
		subject: `Contact Form`,
		text: message,
		html: message
	}

	mail.send(data)
		.then(() => {
			res.status(200).json({
				status: 'success'
			})
		})
		.catch(error => {
			console.error('Error sending message:', error)

			res.status(500).json({
				status: 'error'
			})
		})
}