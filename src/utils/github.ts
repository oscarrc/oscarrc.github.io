import type { GitHubActivityApiResponse, GitHubActivityDay, GitHubActivityWeek, GithubRepoData, WeekdayIndex } from "@/types"
import { differenceInCalendarDays, eachDayOfInterval, formatISO, getDay, isValid, nextDay, parseISO, subWeeks } from "date-fns"

export const validateActivities = (activities: Array<GitHubActivityDay>) => {
  if (activities.length === 0) {
    throw new Error('Activity data must not be empty.')
  }
  for (const { date, count } of activities) {
    if (!isValid(parseISO(date))) {
      throw new Error(`Activity date '${date}' is not a valid ISO 8601 date string.`)
    }
    if (count < 0) {
      throw new RangeError(`Activity count must not be negative, found ${count}.`)
    }
  }
}

export const fetchActivityData = async (
  username: string,
  year: number | 'last',
): Promise<GitHubActivityApiResponse> => {
  const apiUrl = 'https://github-contributions-api.jogruber.de/v4/'
  const response = await fetch(`${apiUrl}${username}?y=${String(year)}`)
  const data = (await response.json()) as GitHubActivityApiResponse

  if (!response.ok) {
    const message = data.error || 'Unknown error'
    throw Error(`Fetching GitHub contribution data for "${username}" failed: ${message}`)
  }

  validateActivities(data.contributions)

  return data
}

export const fillHoles = (activities: Array<GitHubActivityDay>): Array<GitHubActivityDay> => {
  const calendar = new Map<string, GitHubActivityDay>(activities.map((a) => [a.date, a]))
  const firstActivity = activities[0] as GitHubActivityDay
  const lastActivity = activities[activities.length - 1] as GitHubActivityDay

  return eachDayOfInterval({
    start: parseISO(firstActivity.date),
    end: parseISO(lastActivity.date),
  }).map((day) => {
    const date = formatISO(day, { representation: 'date' })
    if (calendar.has(date)) {
      return calendar.get(date) as GitHubActivityDay
    }
    return {
      date,
      count: 0,
      level: 0,
    }
  })
}

export const groupByWeeks = (
  activities: Array<GitHubActivityDay>,
  weekStart: WeekdayIndex = 0, // 0 = Sunday
): Array<GitHubActivityWeek> => {
  const normalizedActivities = fillHoles(activities)
  const firstActivity = normalizedActivities[0] as GitHubActivityDay
  const firstDate = parseISO(firstActivity.date)

  const firstCalendarDate =
    getDay(firstDate) === weekStart
      ? firstDate
      : subWeeks(nextDay(firstDate, weekStart), 1)

  const paddedActivities = [
    ...(Array(differenceInCalendarDays(firstDate, firstCalendarDate)).fill(
      undefined,
    ) as Array<GitHubActivityDay>),
    ...normalizedActivities,
  ]
  const numberOfWeeks = Math.ceil(paddedActivities.length / 7)

  return [...Array(numberOfWeeks).keys()].map((weekIndex) =>
    paddedActivities.slice(weekIndex * 7, weekIndex * 7 + 7),
  )
}

export const groupByMonths = (weeks: Array<GitHubActivityWeek>): Array<{ month: string; weeks: Array<GitHubActivityWeek> }> => {
  const monthGroups: Array<{ month: string; weeks: Array<GitHubActivityWeek> }> = []
  let currentMonth = ''
  let currentWeeks: Array<GitHubActivityWeek> = []

  weeks.forEach((week) => {
    const firstActivity = week.find((activity) => activity !== undefined)
    if (!firstActivity) return

    const month = new Date(firstActivity.date).toLocaleString('en-US', { month: 'short' })
    
    if (month !== currentMonth) {
      if (currentWeeks.length > 0) {
        monthGroups.push({ month: currentMonth, weeks: currentWeeks })
      }
      currentMonth = month
      currentWeeks = [week]
    } else {
      currentWeeks.push(week)
    }
  })

  if (currentWeeks.length > 0) {
    monthGroups.push({ month: currentMonth, weeks: currentWeeks })
  }

  return monthGroups
}

export const fetchGithubRepoData = async (repo: string ): Promise<GithubRepoData | undefined> => {
  try {
    const apiUrl = 'https://api.github.com/repos/'
    const response = await fetch(`${apiUrl}${repo}`)
    const data = (await response.json()) as GithubRepoData

    if (!response.ok) {
      const message = data.error || 'Unknown error'
      throw Error(`Fetching GitHub repo data for "${repo}" failed: ${message}`)
    }

    return data;
  } catch (error) {
    console.error(`Failed to fetch GitHub repo data for ${repo}:`, error);
  }
}