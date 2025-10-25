export interface FrontmatterImage {
  alt: string
  src: {
    height: number
    src: string
    width: number
    format: 'avif' | 'png' | 'webp' | 'jpeg' | 'jpg' | 'svg' | 'tiff' | 'gif'
  }
}

export type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface GitHubActivityDay {
  date: string
  count: number
  level: number
}

export interface GitHubActivityWeek extends Array<GitHubActivityDay | undefined> {}

export interface GitHubActivityMonthLabel {
  weekIndex: number
  label: string
}

export interface GitHubActivityApiResponse {
  total: {
    [year: number]: number
    lastYear: number
  }
  contributions: GitHubActivityDay[]
  error?: string
}