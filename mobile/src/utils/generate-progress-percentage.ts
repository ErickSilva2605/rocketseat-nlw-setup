export function generateProgressPercentage(total: number, completed: number) {
  return total > 0 ?
    Math.round((completed / total) * 100) : 0;
}