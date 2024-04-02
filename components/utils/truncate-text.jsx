import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

export default function TruncateText({ text, maxLength }) {
    const [truncatedText, setTruncatedText] = useState('');

    useEffect(() => {
        function truncateTextSafe(htmlText, maxLength) {
            const cleanHtml = DOMPurify.sanitize(htmlText);
            const div = document.createElement('div');
            div.innerHTML = cleanHtml;
            const textOnly = div.textContent || div.innerText || '';

            let truncated = textOnly.slice(0, maxLength);
            if (textOnly.length > maxLength) {
                truncated += '...';
            }
            return truncated;
        }

        if (text.length > maxLength) {
            setTruncatedText(truncateTextSafe(text, maxLength));
        } else {
            setTruncatedText(text);
        }
    }, [text, maxLength]); // Only re-run the effect if text or maxLength changes

    return <span>{parse(truncatedText)}</span>;
}