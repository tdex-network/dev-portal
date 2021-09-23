import React from 'react'
import styles from './HomepageFeatures.module.scss'

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--4 text--center">
            <h3>NON CUSTODIAL</h3>
            <p>TDEX allows Liquid wallets to integrate atomic swap capabilities
              against liquidity providers and trading pools, all
              transactions are signed client side. No need to hand out your
              private keys.</p>
          </div>
          <div className="col col--4 text--center padding-horiz--lg">
            <h3>FOR PROFESSIONAL MARKET MAKERS</h3>
            <p>TDEX lets you focus on providing liquidity and connect
              professional market making tools, such as pluggable price feed,
              rebalancing bot or design your own automated market making
              formulas.</p>
          </div>
          <div className="col col--4 text--center">
            <h3>OPEN STANDARD INITIATIVE</h3>
            <p>Tap into global inter-connected network of liquidity providers
              exposing the same open API specification. Traders can switch
              seamlessly between single providers or trading pools.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
