import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styled, { ThemeProvider } from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import CodeBlock from "../components/CodeBlock"

// import CheatCard from "../components/CheatCard"
// import Tag from "../components/Tag"
// import { lightTheme, darkTheme } from "../Themes/theme"
// import { GlobalStyles } from "../Themes/global"
// import { Sun } from "styled-icons/boxicons-regular/Sun"
// import { Moon } from "styled-icons/boxicons-regular/Moon"

const LayoutContainerWrapper = styled.div`
  position: relative;
`

const LayoutContainer = styled.div`
  padding: 100px;
  margin-top: -30px;
  display: flex;
  flex-flow: column;
  /* background-color: ${({ theme }) => theme.layoutContainerColor}; */

`
const Heading = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  background-color: #2e3440;
`
const MainHeading = styled.h1`
  flex: 1 1 auto;
  font-family: "Work Sans", sans-serif;
  font-style: italic;
  font-weight: 900;
  font-size: 16vw;
  margin-bottom: -20px;

  /* color: ${({ theme }) => theme.mainHeadingColor};
  background-color: ${({ theme }) => theme.mainHeadingBackgroundColor}; */
`
const SubHeading = styled.h3`
  flex: 1 1 auto;
  margin-top: -30px;
  margin-right: 60px;
  margin-bottom: -50px;
  align-self: flex-end;
  font-family: "Work Sans", sans-serif;
  font-style: italic;
  font-weight: 600;
  font-size: 5vw;
  color: ${({ theme }) => theme.subHeadingColor};
`

// const CodeBlock = ({ title, heading, children }) => (
//   <>
//     <Tag tagTitle={piece.title} />
//     <div className="grid">
//       {piece.cheats.map(cheat => (
//         <CheatCard
//           cardTitle={heading}
//           cardText={children}
//           className="grid-item"
//         />
//       ))}
//     </div>
//   </>
// )

const components = {
  // CodeBlock: CodeBlock,
  code: CodeBlock,
}

const CheatSheetTemplate = ({ data }) => {
  const { body, frontmatter: details } = data.mdx
  // const { title, content } = pageContext
  // const { title } = data.mdx.formatter
  // useEffect(() => {
  //   const grids = document.querySelector(".grid")
  //   const Masonry = require("masonry-layout")
  //   new Masonry(grids, {
  //     itemSelector: ".grid-item",
  //     columnWidth: 50,
  //     gutter: 20,
  //   })
  // }, [])

  return (
    <LayoutContainerWrapper>
      <Heading>
        <MainHeading>{details.title}</MainHeading>
        <SubHeading>Cheat Sheet</SubHeading>
      </Heading>
      <LayoutContainer className="layoutContainer">
        <MDXProvider components={components}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
        {/* {content.map(piece => (
          <>
            <Tag tagTitle={piece.title} />
            <div className="grid">
              {piece.cheats.map(cheat => (
                <CheatCard
                  cardTitle={cheat.heading}
                  cardText={cheat.text}
                  className="grid-item"
                />
              ))}
            </div>
          </>
        ))} */}
      </LayoutContainer>
    </LayoutContainerWrapper>
  )
}

CheatSheetTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}
export default CheatSheetTemplate

export const pageQuery = graphql`
  query CheatSheetBySlug($slug: String!, $collection: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug }, collection: { eq: $collection } }) {
      id
      body
      frontmatter {
        title
        description
      }
    }
  }
`
