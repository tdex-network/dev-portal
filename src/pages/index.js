import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.scss'
import HomepageFeatures from '../components/HomepageFeatures'
import Tdex3d from '../../static/img/tdex_3d.png'
import TdexLogo from '../../static/img/tdex-logo.png'

function HomepageHeader() {
  return (
    <header className={clsx('text--center', styles.heroBanner)}>
      <div className="row row--no-gutters">
        <div className="col col--4 col--offset-4">
          <img src={Tdex3d} alt="Tdex3d"/>
          <div className={styles.titles}>
            <img src={TdexLogo} alt="TdexLogo"/>
            <h2><span>TDEX</span> DEV PORTAL</h2>
            <div className={styles.heroBtnContainer}>
              <Link className="button button--outline" to="/docs">
                <Translate>DOCS</Translate>
              </Link>
              <Link
                className="button button--outline"
                to="/blog">
                <Translate>BLOG</Translate>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function HomepageCallToAction() {
  return (
    <section className={clsx(styles.call2action)}>
      <div className="container">
        <div className="row">
          <div className="col col--8 padding-horiz--lg">
            <h3>HOW IT WORKS</h3>
            <p>
              Anyone can become a <b>market maker</b> in the TDEX network, putting reserves in various asset pairs forming
              a <b>Market</b> and gaining swap fees. It exposes a public reachable endpoint for traders to get the current <b>market
              price</b> and to accept atomic swap requests.
            </p>
          </div>
          <div className="col col--4">
            <div className={`row ${styles.btnContainer}`}>
              <Link className="button button--outline" to="/docs/provider/intro">
                <Translate>DOCS FOR LIQUIDITY PROVIDERS</Translate>
              </Link>
              <Link
                className="button button--outline"
                to="/docs/trader/intro">
                <Translate>DOCS FOR TRADERS</Translate>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title} - Developer Portal`}
      description="Global P2P network for Liquid market makers and traders"
      image="img/tdex-og-image.png"
    >
      <HomepageHeader/>
      <main>
        <HomepageFeatures/>
        <HomepageCallToAction/>
      </main>
    </Layout>
  )
}
