import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Non Custodial',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        TDEX allows Liquid wallets to integrate atomic swap capabilities against a liquidity providers and trading pools, all transactions are signed client side. No need to hand out yur private key.
      </>
    ),
  },
  {
    title: 'For professional Market Makers',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        TDEX lets you focus on providing liquidity and connect professional market making tools, such as pluggable price feed, rebalancing bot or design your own automated market making formulas.
      </>
    ),
  },
  {
    title: 'Open standard initiative',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Tap into global inter-connected network of liquidity providers exposing the same open API sepcification. Traders can switch seamlessy between single providers or trading pools.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
