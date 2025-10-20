  
  import { motion } from "framer-motion"
  
  export default function GetStarted({ toVanish }) {
  return (
    <div className="h-screen w-screen bg-white flex items-start px-16 pt-24">
      <div className="max-w-xl">
     
  <h1 className="text-5xl font-extrabold text-neutral-700 leading-tight">
  The only app you need <br />for <span className="relative inline-block text-violet-600 ml-2">
    Revision
  </span>
</h1>


      

<p className="text-gray-600 text-lg mt-2 -mb-1 relative">
  Organize, revise, and remember better with smart{" "}
  <span className="relative inline-block text-violet-500">
    flashcards
    <motion.span
      className="absolute bottom-0 h-0.5 bg-violet-600 w-full left-0 origin-center"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: [0, 1, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </span>{" "}
  and simple workflows — built to boost your learning effortlessly.
</p>


        <button
          className="  shadow-sm hover:shadow-md cursor-pointer border-2 border-violet-600 text-violet-600 font-medium px-6 py-2 rounded-2xl mt-16 transition hover:bg-violet-600 hover:text-white"
          onClick={toVanish}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

