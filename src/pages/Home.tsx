import bgImage from "../assets/bg.jpg";
const Home = () => {
  return (
    <div className="min-h-screen px-6 py-16 bg-white grid grid-cols-2 gap-16">
      <div>
        <img src={bgImage}  />
      </div>
      <div className="flex flex-col mb-8">
        <h1>About WorldWide.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
          dicta illum vero culpa cum quaerat architecto sapiente eius non
          soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
          perspiciatis?
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
          doloribus libero sunt expedita ratione iusto, magni, id sapiente sequi
          officiis{" "}
        </p>
      </div>
    </div>
  );
};

export default Home;
