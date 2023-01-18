import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

/**
 * You want to dynamically create product pages with the path pages/products/[id].js, where [id] refers to a specific product ID. What is the correct way to implement this?
 *
 * Use `getStaticPaths` to fetch an array of product IDs and use `getStaticProps` to fetch data for each product.
 */

export async function getStaticProps(props) {
  //   console.log("props", props);
  //    {
  //     params: { id: 'ssg-ssr' },
  //     locales: undefined,
  //     locale: undefined,
  //     defaultLocale: undefined
  //     }

  const { params } = props;
  const postData = await getPostData(params.id);
  // Q: How does params.id from getStaticProps({ params }) know the key is named id?
  // A: The value from the file name
  return {
    props: {
      postData,
    },
  };
}

// In development (npm run dev or yarn dev), getStaticPaths runs on every request.
// In production, getStaticPaths runs at build time.
export async function getStaticPaths() {
  // Like getStaticProps, getStaticPaths can fetch data from any data source. In our example, getAllPostIds (which is used by getStaticPaths) may fetch from an external API endpoint:

  const paths = getAllPostIds();
  //   console.log("paths", paths); // [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]
  return {
    paths,
    fallback: false, // If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
    // read docs for more
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
