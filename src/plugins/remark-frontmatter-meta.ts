import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { toString } from 'mdast-util-to-string'
import { visit } from 'unist-util-visit'

const remarkFrontmatterMeta: RemarkPlugin = () => {
  return function (tree, { data }) {
    if (!data.astro?.frontmatter) return

    const frontmatter = data.astro.frontmatter
    let firstHeadingFound = false
    let firstParagraphFound = false

    visit(tree, (node: any) => {
      if (!firstHeadingFound && node.type === 'heading' && !frontmatter.title) {
        const titleText = toString(node).trim()
        if (titleText) {
          frontmatter.title = titleText
          firstHeadingFound = true
        }
      }

      if (!firstParagraphFound && node.type === 'paragraph' && !frontmatter.description) {
        const descriptionText = toString(node).trim()
        if (descriptionText) {
          frontmatter.description = descriptionText
          firstParagraphFound = true
        }
      }

      if (firstHeadingFound && firstParagraphFound) {
        return false
      }
    })
  }
}

export default remarkFrontmatterMeta

