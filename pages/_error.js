import { useTranslations } from 'next-intl';

function ErrorPage({ statusCode }) {
    const t = useTranslations('NotFound');

    return (
        <div>
            <h1>{statusCode}</h1>
            <p>{t('message')}</p>
            <a href="/">{t('button')}</a>
        </div>
    );
}

ErrorPage.getInitialProps = async ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default ErrorPage;