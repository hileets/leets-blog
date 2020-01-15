const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const cheatSheet = path.resolve(`./src/templates/cheat-sheet.js`)

  return graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                collection
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const edges = result.data.allMdx.edges

    edges.forEach((edge, index) => {
      const { slug, collection } = edge.node.fields

      if (collection === "blog") {
        const previous =
          index === edges.length - 1 ? null : edges[index + 1].node
        const next = index === 0 ? null : edges[index - 1].node
        createPage({
          path: `/blog${slug}`,
          component: blogPost,
          context: {
            slug,
            collection,
            previous,
            next,
          },
        })
      } else if (collection === "cheats") {
        createPage({
          path: `/hints${slug}`,
          component: cheatSheet,
          context: {
            slug,
            collection,
          },
        })
      }
    })
    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  const parent = getNode(node.parent)

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    createNodeField({
      name: `collection`,
      node,
      value: parent.sourceInstanceName,
    })
  }
}
