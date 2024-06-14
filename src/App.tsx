import {
  About,
  Blog,
  CTA,
  Contact,
  Footer,
  Header,
  Projects,
  Service,
} from "./sections";

const App = () => {
  return (
    <div className="overflow-hidden">
      <div className="container mx-auto py-5 px-5">
        <Header />
        <About />
        <Service />
        <CTA />
        <Projects />
        <Blog />
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default App;