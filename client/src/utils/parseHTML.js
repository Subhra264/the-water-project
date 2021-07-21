import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

export default function parseHTML(html) {
    // Parse the HTML after sanitizing
    return parse(DOMPurify.sanitize(html));
}
