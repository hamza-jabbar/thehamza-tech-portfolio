import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';

import { Navbar, Welcome, Dock, Text, Image } from '#components';
import { Terminal, Safari, Resume, Finder, Contact } from '#windows'

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
    </main>
  )
}

export default App;