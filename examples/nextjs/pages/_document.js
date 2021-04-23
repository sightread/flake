import Document, { Html, Head, Main, NextScript } from 'next/document'
import { extractCss, FLAKE_STYLE_ID } from "@sightread/flake"

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
      <Html>
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