import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';
// import ScrollIndicator from './components/general/ScrollIndicator';
import { createClient } from '@/prismicio';
import { components } from '@/slices';
import Cursor from './components/general/Cursor';
import styles from './Home.module.css';
import ScrollSmoother from 'gsap/dist/ScrollSmoother';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import HomeSections from './components/home/HomeSections';
import { FirstSection } from './components/general/firstSection/FirstSection';
import ScrollIndicator from './components/general/ScrollIndicator';
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

const Scene = dynamic(() => import('./components/three/Scene'), {
  ssr: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? '' }],
    },
  };
}

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  return (
    <main className={styles.Main}>
      <ScrollIndicator />
      <Cursor />
      <div className={styles.Sticky}>
        <Scene />
      </div>
      {/* <FirstSection /> */}
      <HomeSections />
      {/* <SliceZone slices={home.data.slices} components={components} /> */}
    </main>
  );
}
