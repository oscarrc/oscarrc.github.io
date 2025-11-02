import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'

const remarkFrontmatterMeta: RemarkPlugin = () => {
  return function (tree, { data }) {
    if (!data.astro?.frontmatter) return

    const frontmatter = data.astro.frontmatter
    let firstHeadingFound = false
    let firstParagraphFound = false

    visit(tree, (node: any) => {
      // Extract title from first heading (if not already in frontmatter)
      if (!firstHeadingFound && node.type === 'heading' && !frontmatter.title) {
        const titleText = toString(node).trim()
        if (titleText) {
          frontmatter.title = titleText
          firstHeadingFound = true
        }
      }

      // Extract description from first paragraph (if not already in frontmatter)
      if (!firstParagraphFound && node.type === 'paragraph' && !frontmatter.description) {
        const descriptionText = toString(node).trim()
        if (descriptionText) {
          frontmatter.description = descriptionText
          firstParagraphFound = true
        }
      }

      // Stop visiting if we've found both
      if (firstHeadingFound && firstParagraphFound) {
        return false
      }
    })
  }
}

export default remarkFrontmatterMeta

