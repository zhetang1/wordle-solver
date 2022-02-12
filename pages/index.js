import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import DynamicTable from '../components/dynamicTable'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <p className={utilStyles.p}>Click on the square to filter. Click on # for next line <a href="https://www.linkedin.com/in/zhetang/">(contact me)</a></p>
      <DynamicTable />
    </Layout>
  )
}