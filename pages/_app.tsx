import Layout from "@/app/Layout";

export default function App({
  Component,
  pageProps
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
