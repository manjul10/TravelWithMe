const Product = () => {
  return (
    <section className="min-h-screen px-8 py-12 lg:py-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="order-2 lg:order-1 relative">
           <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/3] transform lg:rotate-2">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475"
              alt="product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-8">
          <div className="space-y-4">
             <h2 className="text-sm font-bold tracking-[0.4em] text-gray-400 uppercase">
                / About WorldWise /
              </h2>
            <h1 className="text-6xl font-serif text-gray-900 leading-tight">
              About <br />
              <span className="italic text-gray-400">WorldWise.</span>
            </h1>
          </div>

          <p className="text-lg text-gray-500 max-w-md leading-relaxed">
            We build modern digital products focused on travel experiences.
            Our platform helps explorers manage their journeys efficiently 
            and keep memories alive forever.
          </p>
          
          <div className="pt-4">
             <button className="px-10 py-4 border-2 border-gray-900 text-gray-900 rounded-full font-bold text-xs tracking-widest hover:bg-gray-900 hover:text-white transition-all">
                LEARN MORE
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;