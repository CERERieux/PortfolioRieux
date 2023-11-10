import DOMPurify from "isomorphic-dompurify"; // Dependency to clean user input in case something malicious is sent
// I heard that React manages to do this by itself but I prefer to be more safe about it

export function sanitizeInput(input: string) {
  return DOMPurify.sanitize(input);
}
