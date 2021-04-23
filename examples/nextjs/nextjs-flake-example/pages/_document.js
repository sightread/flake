import Document, { Html, Head, Main, NextScript } from 'next/document'
import { css, extractCss, FLAKE_STYLE_ID } from "@sightread/flake"

const classes = css({
  root: {
    padding: "0px",
    margin: "0px",
    fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, 
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
    '& a': {
      color: "inherit",
      textDecoration: "none",
    },
  }
})

/**  basic document from: 
 * https://nextjs.org/docs/advanced-features/custom-document
 * */
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html className={classes.root}>
        <Head>
        <style id={FLAKE_STYLE_ID} dangerouslySetInnerHTML={{ __html: extractCss() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument