import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'mobile friendly',
    description: (
      <>
        You can open it on the web from your mobile, tablet or desktop.
      </>
    ),
  },
  {
    title: 'fast and intuitive',
    description: (
      <>
        Best in class UX, easily navigate through the interface and get your things done in no time.
      </>
    ),
  },
  {
    title: 'real-time support',
    description: (
      <>
        Be aware of how much time has passed by since the last course.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
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
