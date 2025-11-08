export function formatDate(date?: Date | null, locale = "en-PH"): string {
  return date ? new Date(date).toLocaleDateString(locale) : "";
}
