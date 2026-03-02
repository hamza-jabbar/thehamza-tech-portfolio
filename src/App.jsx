import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';

import { Navbar, Welcome, Dock, Text, Image, Home } from '#components';
import { Terminal, Safari, Resume, Finder, Contact, Photos } from '#windows'

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
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
  )
}

export default App;