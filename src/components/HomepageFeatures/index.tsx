import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.scss';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const LinksOut = () => <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" className="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module">
  <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path>
</svg>

const MCULink = () => <a href="https://marvelcinematicuniverse.fandom.com/wiki/Gamma_Radiation" rel="noopener noreferrer" target="_blacnk">gamma radiation<LinksOut /></a>

const FeatureList: FeatureItem[] = [
  {
    title: "Testing so simple it's fun",
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Mädūl eliminates the need for tools like <code>jest</code>; testing is so frictionless it's actually fun!
      </>
    ),
  },
  {
    title: "Everything's opt-in",
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        You can adopt Mädūl's features at your own pace -
        and you can take what you want & leave what you don't;
        you're never locked-in to anything
      </>
    ),
  },
  {
    title: 'Mädūls give you super-powers',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Tests, decorators, dependencies, and batteries work together to make
        you so effective it feels like you've been blasted with <MCULink />
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
