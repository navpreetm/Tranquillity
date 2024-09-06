// landing page - similar to framer app
// Root page
import { MdOutlineArrowOutward } from "react-icons/md";
import { AiFillTikTok } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from 'next/link';

export default function Home() {

  return (
    <>
      <div className="pt-16 px-24">
        <div className="flex items-center justify-center">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-black">Welcome to</h1>
            <h1 className="text-6xl font-bold text-app-purple-700 pt-2">TranQuillity</h1>
            <h1 className="text-4xl font-bold text-black pt-2">A place to</h1>
            <h1 className="text-6xl font-bold text-app-purple-700 pt-4">Ref</h1>
            <Link href="/register" className="mt-4 px-6 py-2 bg-gradient-to-r from-app-purple-700 to-app-purple-500 text-white rounded-lg flex items-center">
              Sign Up Now (If signed in, change to go to dashboard) <MdOutlineArrowOutward />
            </Link>
          </div>

          <div className="ml-16 p-8 bg-white rounded-lg shadow-lg h-72">
            <p className="text-lg text-purple-900">
              Welcome to TranQuillity, a platform dedicated to helping individuals explore self-discovery through journaling. Our aim is to empower you to improve your emotional well-being, promote personal growth, and cultivate healthy habits. Join our waitlist today!
            </p>
          </div>
        </div>

        <div class="m-auto mt-32 bg-white rounded-lg shadow-lg p-10 max-w-2xl text-center">
          <h1 class="text-4xl font-bold mb-6 text-app-black">We've launched!</h1>
          <p class="text-lg mb-4 text-app-black">Ready to begin your journey of self-discovery and personal growth? TranQuillity is here to empower you to enhance your emotional well-being, foster personal growth, and build healthy habits—all through the art of journaling.</p>
          <p class="text-lg mb-6">Be the first to experience TranQuillity—a new way to connect with yourself. Sign up for our exclusive waitlist now and take your journaling to the next level!</p>
          <Link href="/register" className="m-auto mt-4 px-6 py-2 bg-gradient-to-r from-app-purple-700 to-app-purple-500 text-white rounded-lg flex items-center">
            Sign Up Now <MdOutlineArrowOutward />
          </Link>
        </div>
      </div>

      <div className="mt-32 h-40 flex flex-col items-center justify-center h-screen bg-white">
        <div className="flex space-x-2 w-screen px-16">
          <img src="https://placehold.co/50x50" alt="Feather logo" className="w-12 h-12" />
          <h1 className="text-4xl font-bold text-indigo-800">TranQuillity</h1>
        </div>
        
        <div className="flex justify-between items-center w-full px-8 mt-4">
          
          <div className="flex items-center space-x-2">
            <img src="https://placehold.co/50x50" alt="Feather logo" className="w-12 h-12 invisible" />
            <p className="text-gray-600">Copyright TranQuillity. All right reserved.</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="flex items-center text-gray-600 hover:text-gray-800">
              <AiFillTikTok />
              <span className="ml-2 text-indigo-800">TikTok</span>
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-gray-800">
              <FaInstagram />
              <span className="ml-2 text-indigo-800">Instagram</span>
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-gray-800">
              <FaYoutube />
              <span className="ml-2 text-app-purple-800">Youtube</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
