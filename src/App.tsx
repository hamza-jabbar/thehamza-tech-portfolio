import { useEffect } from 'react';
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';

import { Navbar, Welcome, Dock, Text, Image, Home } from '#components';
import { Terminal, Safari, Resume, Finder, Contact, Photos } from '#windows';
import { useSanityData } from '#hooks/useSanityData';
import { desktopBg, mobileBg } from '#lib/imageUrl';

gsap.registerPlugin(Draggable);

const App = () => {
  const { data } = useSanityData();

  useEffect(() => {
    if (data.background?.desktopImage?.asset) {
      const desktopUrl = desktopBg(data.background.desktopImage);
      document.documentElement.style.setProperty('--bg-desktop', `url("${desktopUrl}")`);
    } else {
      document.documentElement.style.removeProperty('--bg-desktop');
    }

    if (data.background?.mobileImage?.asset) {
      const mobileUrl = mobileBg(data.background.mobileImage);
      document.documentElement.style.setProperty('--bg-mobile', `url("${mobileUrl}")`);
    } else if (data.background?.desktopImage?.asset) {
      const desktopUrl = desktopBg(data.background.desktopImage);
      document.documentElement.style.setProperty('--bg-mobile', `url("${desktopUrl}")`);
    } else {
      document.documentElement.style.removeProperty('--bg-mobile');
    }
  }, [data.background]);

  return (
    <main className="w-dvw h-dvh overflow-hidden select-none">
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />
      <Home />
    </main>
  );
};

export default App;
