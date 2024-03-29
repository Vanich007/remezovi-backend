import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

export function htmlSanitizer(html: string) {
  const window = new JSDOM('').window;
  const purify = DOMPurify(window);
  return purify.sanitize(html);
}