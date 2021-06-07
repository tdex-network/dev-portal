import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate  from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.scss';
import HomepageFeatures from '../components/HomepageFeatures';
import TdexLogo3d from '../../static/img/tdex_3d_logo.svg';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container text--center">
        <TdexLogo3d className={styles.tdexLogo} />
        <div className={styles.titles}>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <h2 className="hero__subtitle">{siteConfig.tagline}</h2>
        </div>
      </div>
    </header>
  );
}


function HomepageCallToAction() {
  return (
    <header className={clsx(styles.section, styles.sectionDark)}>
      <div className="container text--center">
        <h2 className="hero__title">How it works</h2>
        <p>
          Anyone can become a <b>market makers</b> in the TDEX network, putting reserves in various asset pairs forming a <b>Market</b> and gaining swap fees. It exposes a public reachable endpoint for traders to get the current <b>market price</b> and to accept atomic swap requests.
        </p>
        <h3 className="hero__title">Get started</h3>
        <div className={styles.indexCtas}>
          <Link className="button button--info" to="/docs">
            <Translate>For Traders</Translate>
          </Link>
          <Link
            className="button button--info"
            to="https://new.docusaurus.io">
            <Translate>For Liquidity Providers</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Developer Portal`}
      description="Global P2P network for Liquid market makers and traders">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageCallToAction />
      </main>
    </Layout>
  );
}
