import Head from 'next/head'
import ArticleList from '../components/ArticleList';
import { server } from '../config';

export default function Home({ articles }) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="web, development, programming" />
      </Head>
      <h1>Welcome to NextJS</h1>
      <ArticleList articles={articles} />
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/articles`);

  const articles = await res.json();

  return {
    props: {
      articles
    }
  };
};


// export const getStaticProps = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts?limit=6');

//   const articles = await res.json();

//   return {
//     props: {
//       articles
//     }
//   };
// };
