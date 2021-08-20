import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.scss';

const FeatureList = [
    {
        title: 'Non Custodial',
        Svg: require('../../static/img/home_non_custodial.svg').default,
        description: (
            <>
                TDEX allows Liquid wallets to integrate atomic swap capabilities
                against liquidity providers and trading pools, all
                transactions are signed client side. No need to hand out your
                private keys.
            </>
        ),
    },
    {
        title: 'For professional Market Makers',
        Svg: require('../../static/img/home_pro_mm.svg').default,
        description: (
            <>
                TDEX lets you focus on providing liquidity and connect
                professional market making tools, such as pluggable price feed,
                rebalancing bot or design your own automated market making
                formulas.
            </>
        ),
    },
    {
        title: 'Open standard initiative',
        Svg: require('../../static/img/home_open_standard.svg').default,
        description: (
            <>
                Tap into global inter-connected network of liquidity providers
                exposing the same open API specification. Traders can switch
                seamlessly between single providers or trading pools.
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
