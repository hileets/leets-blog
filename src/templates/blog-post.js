import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import styled from "styled-components"
import CodeBlock from "../components/CodeBlock"
import SyntaxHighlighter from "react-syntax-highlighter"


const BlogContainer = styled.div`
${({ theme }) => theme.media.largest`
  max-width: 1360px;
   `}

${({ theme }) => theme.media.extraLarge`
  max-width: 1140px;
   `}

${({ theme }) => theme.media.large`
   max-width: 960px;
   `}

${({ theme }) => theme.media.medium`
  max-width: 720px;
   `}

${({ theme }) => theme.media.small`
  max-width: 540px;
   `}
`

const BlogTitle = styled.h1`
display:flex;
justify-content:center;
`
const Spacer = styled.div`
margin-top: 88px;
`

const Divider = styled.hr`
  border-top: 5px dotted;
  height: 0px;
  background-color: transparent;
  color: ${({ theme }) => theme.dividerColor};
`

const Image = styled.img`
  margin: auto;
`;

const components = {
  // CodeBlock: CodeBlock,
  code: CodeBlock,
  img: Image
}

const BlogPostTemplate = ({ data, pageContext, location }) => {
  console.log(data, pageContext)
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>

      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <BlogContainer>
        <BlogTitle>{post.frontmatter.title}</BlogTitle>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <Spacer />
        <Divider />
        <Spacer />
        <MDXProvider components={components}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MDXProvider>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        {/* <Bio /> */}
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`blog${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`blog${next.fields.slug}`} rel="next">
                {next.frontmatter.title} →
            </Link>
            )}
          </li>
        </ul>
      </BlogContainer>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
