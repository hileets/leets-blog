import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { CopyAlt } from "styled-icons/boxicons-solid/CopyAlt"
import SyntaxHighlighter from "react-syntax-highlighter"
import { foundation } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs"

const CheatCardContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 400px;
  justify-content: flex-start;
  padding: 0px;
`
const HeadingWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 0 1 auto;
`
const CodeBlockHeading = styled.p`
  flex: 1 1 auto;
  font-weight: 400;
  font-family: "Work Sans", sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 3px 7px;
  width: max-content;
  background-color: ${({ theme }) => theme.codeBlockBackgroundColor};
`
const CodeWrapper = styled.pre`
  position: relative;
  flex: 0 1 auto;
  padding-bottom: 0px;
  box-shadow: 0px 0px 4px rgba(105, 105, 105, 0.5),
    0px 0px 1px rgba(105, 255, 255, 0.5);
  /* border-radius: 5px; */

  background-color: ${({ theme }) => theme.codeBlockBackgroundColor};
  &:hover {
    background-color: ${({ theme }) => theme.codeBlockBackgroundHoverColor};
    transition: 1s;
    cursor: pointer;
  }

  & .icon {
    display: block;
    position: absolute;
    margin-top: 0px;
    margin-right: 0px;
    top: 0;
    right: 0;
    transition: 0.5s;
    border-radius: 0px 0px 0px 5px;
    padding: 5px;
  }
`

const DescriptionFooter = styled.div`
  border: 1px solid white;
`

const StyleSyntaxHighlighter = styled(SyntaxHighlighter)`
  background: ${({ theme }) =>
    theme.codeBlockBackgroundColor
      ? theme.codeBlockBackgroundColor
      : "inherit"} !important;

  code {
    font-size: 16px;
  }

  :hover {
    background-color: ${({ theme }) =>
      theme.codeBlockBackgroundHoverColor} !important;
    cursor: copy;
  }
`

const CodeBlock = ({ children, heading }) => {
  // const styles = useContext(ThemeContext)
  return (
    <CheatCardContainer>
      <CodeBlockHeading>{heading}</CodeBlockHeading>
      <CopyToClipboard text={children}>
        <StyleSyntaxHighlighter
          language="javascript"
          style={nord}
          // customStyle={{ background: styles.layoutContainerColor }}
        >
          {children}
        </StyleSyntaxHighlighter>
      </CopyToClipboard>
    </CheatCardContainer>
  )
}

export default CodeBlock
