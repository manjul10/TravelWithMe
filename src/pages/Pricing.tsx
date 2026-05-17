import img2 from '../assets/img-2.jpg';

const Pricing = () => {
  return (
    <section className="min-h-screen px-8 py-12 lg:py-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
             <h2 className="text-sm font-bold tracking-[0.4em] text-gray-400 uppercase">
                / Simple & Transparent /
              </h2>
            <h1 className="text-6xl font-serif text-gray-900 leading-tight">
              Simple pricing. <br />
              <span className="italic text-gray-400 text-5xl">Just $9/month.</span>
            </h1>
          </div>

          <p className="text-lg text-gray-500 max-w-md leading-relaxed">
            Flexible pricing plans built for travelers. 
            Access all features, unlimited city tracking, and cross-device sync.
          </p>
          
          <button className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold text-xs tracking-widest hover:bg-gray-800 transition-all shadow-xl">
            CHOOSE PLAN
          </button>
        </div>

        <div className="relative">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/3] transform lg:-rotate-2">
            <img
              src={img2}
              alt="pricing"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;


