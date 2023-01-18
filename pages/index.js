import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

/**
 * NOTE: https://nextjs.org/learn/basics/data-fetching/request-time
 * SSR
 * If you need to fetch data at request time instead of at build time, you can try Server-side Rendering
 * Because getServerSideProps is called at request time, its parameter (context) contains request specific parameters.
 * You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time
 *
 * CSR
 * If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering)
 * Statically generate (pre-render) parts of the page that do not require external data.
 * When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.
 */

// getStaticProps only runs on the server-side. It will never run on the client-side. It won’t even be included in the JS
// bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.
// In development (npm run dev or yarn dev), getStaticProps runs on every request.
// In production, getStaticProps runs at build time. However, this behavior can be enhanced using the fallback key returned by getStaticPaths
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello! I'm Divya. I'm a sophomore student learning web dev. I want to
          explore fields like AI-ML, cybersecurity and DevOps. I love to talk
          about tech, you can connect with me on me on{" "}
          <a href="https://twitter.com/divya_raichura">Twitter</a>
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
