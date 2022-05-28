import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureL2ist = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({ groupTitle, groupList }) {
  return (
    <section className='markdown'>
      <h2>{groupTitle}</h2>
      <div>
        {
          groupList.map(item => {
            return (
              <h4 className={styles.listItem}>
                <Link to={item.link}>{item.title}</Link>
              </h4>
            )
          })
        }
      </div>
    </section>
  )
  // return (<div>22</div>)
  return (
    Object.entries(catalog).map(item => {
      const [groupTitle, groupList] = item
      return 
      /* return (
        <dl className={clsx('col col--4')}>
          <dt className="text--center">
            {groupTitle}
          </dt>
          {
            groupList.map(item => {
              // <dd className="text--center padding-horiz--md">
              //   <h3>{title}</h3>
              //   <p>{description}</p>
              // </dd>
              return (
                <Link>{item.title}</Link>
              )
            })
          }
        </dl>
      ) */
    })
  );
}

function FeatureList({ catalog }) {

  // return (<div>22</div>)
  return (
    Object.entries(catalog).map(item => {
      const [groupTitle, groupList] = item
      return (<Feature groupTitle={groupTitle} groupList={groupList}></Feature>)
      return (<section className='markdown'>
        <h2>{groupTitle}</h2>
        {
          groupList.map(item => {
            // <dd className="text--center padding-horiz--md">
            //   <h3>{title}</h3>
            //   <p>{description}</p>
            // </dd>
            return (
              <h4 className={styles.listItem}>
                <Link to={item.link}>{item.title}</Link>
              </h4>
            )
          })
        }
      </section>)
      /* return (
        <dl className={clsx('col col--4')}>
          <dt className="text--center">
            {groupTitle}
          </dt>
          {
            groupList.map(item => {
              // <dd className="text--center padding-horiz--md">
              //   <h3>{title}</h3>
              //   <p>{description}</p>
              // </dd>
              return (
                <Link>{item.title}</Link>
              )
            })
          }
        </dl>
      ) */
    })
  );
}

// function Feature({Svg, title, description}) {
//   return (
//     <div className={clsx('col col--4')}>
//       <div className="text--center">
//         <Svg className={styles.featureSvg} role="img" />
//       </div>
//       <div className="text--center padding-horiz--md">
//         <h3>{title}</h3>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// }

export default function HomepageFeatures(props) {
  // console.log()
  return (
    <section className={styles.features}>
      <div className="container">
        <FeatureList catalog={props.catalog}></FeatureList>
        {/* <Feature catalog={props.catalog}></Feature> */}
        {/* <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div> */}
      </div>
    </section>
  );
}
