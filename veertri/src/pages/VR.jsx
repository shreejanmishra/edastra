import vrIcon2 from "../assets/vrIcon2.png";
import SEO from "../components/SEO";
import { ShoppingCart, UserPlus } from "lucide-react";

const VR = () => {
  return (
    <div className="relative min-h-screen dark:bg-black bg-gray-50 dark:text-white text-gray-900 flex flex-col items-center justify-center transition-colors duration-300 overflow-hidden pt-20 pb-10">
      <SEO
        title="VR Experience - Veertri | Immersive Learning"
        description="Experience the future of education with Veertri VR. Immersive virtual reality learning coming soon. Subscribe for early access."
        keywords="VR education, virtual reality learning, immersive education, VR headset, educational VR"
        canonicalUrl="https://veertri.com/vr"
      />
      <div className="relative z-10 flex flex-col items-center justify-center group mb-12">
        <div className="relative">
          <img
            src={vrIcon2}
            alt="VR Experience"
            className="relative w-64 h-64 md:w-96 md:h-96 object-contain transition-all duration-500 transform group-hover:scale-110 group-hover filter drop-shadow-2xl"
          />
        </div>
        <h1 className="dark:text-white mt-8 text-4xl md:text-5xl font-bold text-gray-900 group-hover:text-[#FAD502] transition-colors duration-300 tracking-widest uppercase text-center">
          VR Experience
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 text-center max-w-2xl px-4">
          Step into the future of education. Immersive learning coming soon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 w-full max-w-4xl z-10">
        {/* Join VR Plan Card */}
        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-8 rounded-2xl shadow-xl hover:border-[#FAD502] transition-all duration-300 group/card flex flex-col items-center text-center">
          <div className="bg-[#FAD502]/10 p-4 rounded-full mb-6 group-hover/card:bg-[#FAD502] transition-colors duration-300">
            <UserPlus
              size={40}
              className="text-[#FAD502] group-hover/card:text-black transition-colors duration-300"
            />
          </div>
          <h2 className="text-2xl font-bold mb-3">Join VR Plan</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get early access to our immersive VR curriculum and exclusive
            content.
          </p>
          <button className="px-8 py-3 bg-[#FAD502] text-black font-bold rounded-full hover:bg-[#FAD502]/80 transition-transform hover:scale-105 active:scale-95">
            Subscribe Now
          </button>
        </div>

        {/* Buy Headset Card */}
        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-8 rounded-2xl shadow-xl hover:border-[#FAD502] transition-all duration-300 group/card flex flex-col items-center text-center">
          <div className="bg-[#FAD502]/10 p-4 rounded-full mb-6 group-hover/card:bg-[#FAD502] transition-colors duration-300">
            <ShoppingCart
              size={40}
              className="text-[#FAD502] group-hover/card:text-black transition-colors duration-300"
            />
          </div>
          <h2 className="text-2xl font-bold mb-3">Buy VR Headset</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Purchase the recommended VR headset for the best learning
            experience.
          </p>
          <button className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:opacity-90 transition-transform hover:scale-105 active:scale-95">
            Buy Headset
          </button>
        </div>
      </div>
    </div>
  );
};

export default VR;
