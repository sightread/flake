import Head from 'next/head'
import { css, mediaQuery } from "@sightread/flake";

const classes = css({
  container: {
    minHeight: "100vh",
    padding: "0 0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  main: {
    padding: "5rem 0",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    margin: "0px",
    lineHeight: 1.15,
    fontSize: "4rem",
    textAlign: "center",
    "& a": {
      color: "#0070f3",
      textDecoration: "none"
    },
    "& a:hover": {
      textDecoration: "underline"
    },
    "& a:focus": {
      textDecoration: "underline"
    },
    "& a:active": {
      textDecoration: "underline"
    }
  },
  footer: {
    width: "100%",
    height: 100,
    borderTop: "1px solid #eaeaea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      marginLeft: "0.5rem"
    },
    "& a": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  description: {
    lineHeight: 1.5,
    fontSize: "1.5rem",
    textAlign: "center"
  },
  code: {
    background: "#fafafa",
    borderRadius: 5,
    padding: "0.75rem",
    fontSize: "1.1rem",
    fontFamily: `Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
      Bitstream Vera Sans Mono, Courier New, monospace`
  },
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: 800,
    marginTop: "3rem",
    [mediaQuery.down(600)]: {
      width: "100%",
      flexDirection: "column"
    }
  },
  card: {
    margin: "1rem",
    flexBasis: "45%",
    padding: "1.5rem",
    textAlign: "left",
    color: "inherit",
    textDecoration: "none",
    border: "1px solid #eaeaea",
    borderRadius: 10,
    transition: "color 0.15s ease, border-color 0.15s ease",
    "&:hover": {
      color: "#0070f3",
      borderColor: "#0070f3",
    },
    "&:focus": {
      color: "#0070f3",
      borderColor: "#0070f3",
    },
    "&:active": {
      color: "#0070f3",
      borderColor: "#0070f3",
    },
    "& h3": {
      margin: "0 0 1rem 0",
      fontSize: "1.5rem"
    },
    "& p": {
      margin: 0,
      fontSize: "1.25rem",
      lineHeight: 1.5   
    }
  },
  logo: {
    height: "1em"
  }
})

export default function Home() {
  return (
    <div className={classes.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.main}>
        <h1 className={classes.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={classes.description}>
          Get started by editing{' '}
          <code className={classes.code}>pages/index.js</code>
        </p>

        <div className={classes.grid}>
          <a href="https://nextjs.org/docs" className={classes.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={classes.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={classes.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={classes.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={classes.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={classes.logo} />
        </a>
      </footer>
    </div>
  )
}
