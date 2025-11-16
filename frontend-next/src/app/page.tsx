import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold">
            Welcome to My Next.js App
          </h1>
          <p className="text-lg lg:text-xl mt-4">
            Build amazing things with Next.js & Tailwind
          </p>
          <Link
            href="/auth"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg mt-6 hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto text-center my-20 px-4">
        <h2 className="text-3xl font-bold">Awesome Features</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <Image src="/file.svg" alt="Feature 1" width={60} height={60}/>
            <h4 className="mt-4 text-xl font-semibold">Fast Performance</h4>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Optimized for speed and efficiency.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <Image src="/window.svg" alt="Feature 2" width={60} height={60} />
            <h4 className="mt-4 text-xl font-semibold">User Friendly</h4>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Intuitive and easy-to-use design.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <Image src="/globe.svg" alt="Feature 3" width={60} height={60} />
            <h4 className="mt-4 text-xl font-semibold">SEO Ready</h4>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Boost your search rankings with SEO.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 text-center py-6">
        <p className="mb-0">© 2025 MyBrand. All rights reserved.</p>
      </footer>
    </div>
    
  );
}
