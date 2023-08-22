1.  Create a Next.js App
    Next.js: The React Framework
    Next.js has the best-in-class "Developer Experience" and many built-in features; a sample of them are:

    An intuitive page-based routing system (with support for dynamic routes)
    Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are supported on a per-page basis
    Automatic code splitting for faster page loads
    Client-side routing with optimized prefetching
    Built-in CSS and Sass support, and support for any CSS-in-JS library
    Development environment with Fast Refresh support
    API routes to build API endpoints with Serverless Functions
    Fully extendable

    npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"

2.  Navigate Between Pages:
    In Next.js, a page is a React Component exported from a file in the pages directory.

    Pages are associated with a route based on their file name. For example, in development:
    pages/index.js is associated with the / route.
    pages/posts/first-post.js is associated with the /posts/first-post route.

    We already have the pages/index.js file, so let’s create pages/posts/first-post.js to see how it works.

    Create a New Page:
    Create the posts directory under pages.
    Create a file called first-post.js inside the posts directory with the following content:
    export default function FirstPost() {
    return <h1>First Post</h1>
    }

        This is how you can create different pages in Next.js.
        Simply create a JS file under the pages directory, and the path to the file becomes the URL path.
        In a way, this is similar to building websites using HTML or PHP files. Instead of writing HTML you write JSX and use React Components.

    Link Component:
    import Link from 'next/link';

        <h2>
          Read {' '}
          <Link href="/posts/first-post">
            <a>this page!</a>
          </Link>
        </h2>

3.  Assets, Metadata, and CSS
    Assets:
    Unoptimized Image
    With regular HTML, you would add your profile picture as follows:
    <img src="/images/profile.jpg" alt="Your Name" />

             However, this means you have to manually handle:
                 Ensuring your image is responsive on different screen sizes
                 Optimizing your images with a third-party tool or library
                 Only loading images when they enter the viewport
                 And more. Instead, Next.js provides an Image component out of the box to handle this for you.

         Image Component and Image Optimization
             import Image from 'next/image'

             const YourComponent = () => (
                 <Image
                     src="/images/profile.jpg" // Route of the image file
                     height={144} // Desired size with correct aspect ratio
                     width={144} // Desired size with correct aspect ratio
                     alt="Your Name"
                 />
             );

    Metadata:
    What if we wanted to modify the metadata of the page, such as the <title> HTML tag?
     <title> is part of the <head> HTML tag, so let's dive into how we can modify the <head> tag in a Next.js page.
     Open pages/index.js in your editor and find the following lines:
     <Head>
     <title>Create Next App</title>
     <link rel="icon" href="/favicon.ico" />
     </Head>
     Notice that <Head> is used instead of the lowercase <head>. <Head> is a React Component that is built into Next.js.
     It allows you to modify the <head> of a page.
     You can import the Head component from the next/head module.

    CSS Stylings:
     <style jsx>{`    .container {
       min-height: 100vh;
       padding: 0 0.5rem;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
    `}</style>

    Layout Component:
    components => layout.js
    export default function Layout({ children }) {
    eturn <div>{children}</div>
    }

         first-post.js
         import Layout from '../../components/layout'

         return (
             <Layout>
                 ... put your code here
             </Layout>
         );

    Adding CSS:
    Create components/layout.module.css
    .container {
    max-width: 36rem;
    padding: 0 1rem;
    margin: 3rem auto 6rem;
    }

         components/layout.js
             import styles from './layout.module.css'

             export default function Layout({ children }) {
                 return <div className={styles.container}>{children}</div>
             }

         Automatically Generates Unique Class Names:
             Now, if you take a look at the HTML in your browser’s devtools, you’ll notice that the div rendered by the Layout component has a class name
             that looks like class="layout_container__2t4v2"

             This is what CSS Modules does: It automatically generates unique class names. As long as you use CSS Modules, you don’t have to worry about
             class name collisions.

             Furthermore, Next.js’s code splitting feature works on CSS Modules as well. It ensures the minimal amount of CSS is loaded for each page.
             This results in smaller bundle sizes.

             Modules are extracted from the JavaScript bundles at build time and generate .css files that are loaded automatically by Next.js.

    Global Styles:
    CSS Modules are useful for component-level styles. But if you want some CSS to be loaded by every page, Next.js has support for that as well.

         To load global CSS files, create a file called pages/_app.js with the following content:

         export default function App({ Component, pageProps }) {
             return <Component {...pageProps} />
         }

    Restart the Development Server:
    npm run dev

    Adding Global CSS:
    In Next.js, you can add global CSS files by importing them from pages/\_app.js. You cannot import global CSS anywhere else.

         The reason that global CSS can't be imported outside of pages/_app.js is that global CSS affects all elements on the page.

         If you were to navigate from the homepage to the /posts/first-post page, global styles from the homepage would affect /posts/first-post unintentionally.

         You can place the global CSS file anywhere and use any name. So let’s do the following:
             1. Create a top-level styles directory and create global.css inside.
             2. Add the following content to styles/global.css. It resets some styles and changes the color of the a tag:

         Place the following code into global.css
             html,
             body {
                 padding: 0;
                 margin: 0;
                 font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
                     Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                 line-height: 1.6;
                 font-size: 18px;
             }

             * {
                 box-sizing: border-box;
             }

             a {
                 color: #0070f3;
                 text-decoration: none;
             }

             a:hover {
                 text-decoration: underline;
             }

             img {
                 max-width: 100%;
                 display: block;
             }

    Polishing Layout:
    Here’s what’s new:
    meta tags (like og:image), which are used to describe a page's content
    Boolean home prop which will adjust the size of the title and the image
    “Back to home” link at the bottom if home is false
    Added images with next/image, which are preloaded with the priority attribute

    Styling Tips:
    npm install classnames

         styles => alert.module.css

         import styles from './alert.module.css'
         import cn from 'classnames'

         export default function Alert({ children, type }) {
         return (
             <div
                 className={cn({
                     [styles.success]: type === 'success',
                     [styles.error]: type === 'error'
                 })}
                 >
                 {children}
                 </div>
             )
         }

    Customizing PostCSS Config:

    Using Sass
    npm install sass

4.  Pre-rendering and Data Fetching:
    Setup:
    Already covered in prevoius chapters.

    Pre-rendering:
    By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance,
    instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

        Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser,
        its JavaScript code runs and makes the page fully interactive. (This process is called hydration.)

        Check That Pre-rendering Is Happening:
            You can check that pre-rendering is happening by taking the following steps:
            Disable JavaScript in your browser (here’s how in Chrome) and…
            Try accessing this page (the final result of this tutorial).

    Two forms of pre-rendering:
    Static rendering: is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
    Server side rendering: is the pre-rendering method that generates the HTML on each request.

        When to Use Static Generation v.s. Server-side Rendering:
            We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN,
            which makes it much faster than having a server render the page on every request.

            You can use Static Generation for many types of pages, including:
                Marketing pages
                Blog posts
                E-commerce product listings
                Help and documentation

            You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation.

    Static Generation with and without Data:
    Static Generation can be done with and without data.

        So far, all the pages we’ve created do not require fetching external data. Those pages will automatically be statically generated when the app is built for production.

        Static Generation without Data:
            For pages that can be genrated without fetching external data at build time.

        Static Generation with Data:
            The HTML can only be generated after fetching data

        Static Generation with Data using getStaticProps:

         Blog Data

        Implement getStaticProps

        getStaticProps Details


        Fetch External API:

            export default function FirstPost({ data }) {
                console.log(data);

                return (
                    <div>
                        Content need to display here
                    </div>
                );
            };

            export async function getStaticProps () {
                // Get external data from the file system, API, DB, etc.
                const response = await getWebService('https://jsonplaceholder.typicode.com/users/1');
                const data = response.data;

                // The value of the `props` key will be
                //  passed to the `FirstPost` component
                return {
                    props: {
                        data
                    }
                };
            };

        Fetch External Query Database:
            You can also query the database directly:

            import someDatabaseSDK from 'someDatabaseSDK';
            const databaseClient = someDatabaseSDK.createClient(...);

            export async function getSortedPostData () {
                // Instead api call fetch post data from a database
                return databaseClient.query('SELECT * FROM <table_name>');
            }

            This is possible because getStaticProps only runs on the server-side. It will never run on the client-side. It won’t even be included in
            the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.

            Development vs. Production
                In development (npm run dev or yarn dev), getStaticProps runs on every request.
                In production, getStaticProps runs at build time. However, this behavior can be enhanced using the fallback key returned by getStaticPaths

            Only Allowed in a Page
                getStaticProps can only be exported from a page. You can’t export it from non-page files.

                One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

    Fetching Data at Request Time

    Pre-rendering and Data Fetching
    To use Server-side Rendering, you need to export getServerSideProps instead of getStaticProps from your page.

        Using getServerSideProps:
            Here’s the starter code for getServerSideProps. It’s not necessary for our blog example, so we won’t be implementing it.

            export async function getServerSideProps(context) {
                return {
                    props: {
                    // props for your component
                    }
                }
            }

            Because getServerSideProps is called at request time, its parameter (context) contains request specific parameters.

            You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time.
            Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request,
            and the result cannot be cached by a CDN without extra configuration.

    SWR:
    The team behind Next.js has created a React hook for data fetching called SWR. We highly recommend it if you’re fetching data on the client side.
    It handles caching, revalidation, focus tracking, refetching on interval, and more. We won’t cover the details here, but here’s an example usage:

        Example:
            import useSWR from 'swr'
            function Profile() {
                const { data, error } = useSWR('/api/user', fetch)

                if (error) return <div>failed to load</div>
                if (!data) return <div>loading...</div>
                return <div>hello {data.name}!</div>
            }

5.  Dynamic Routes
    pages => api => hello.js

        export default function handler (req, res) {
            res.status(200).json({ text: 'Hello' });
        };

6.  Deploying Your Next.js App
