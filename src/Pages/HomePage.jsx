import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const features = [
  {
    name: "Save Money: ",
    description:
      " Buy quality used items at a fraction of the cost of new ones, helping you stretch your college budget further.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Sustainability: ",
    description:
      "Reduce waste and environmental impact by giving pre-loved items a second life.",
    icon: LockClosedIcon,
  },
  {
    name: "Community: ",
    description:
      "Join a vibrant community of college students buying and selling goods, supporting each other along the way.",
    icon: ServerIcon,
  },
];
export default function HomePage() {
  const navigate=useNavigate()
  return (
    <>
      <div className=" bg-black">
        <div className=" isolate px-6 pt-10 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Welcome to BitOlx - Your Campus Marketplace!

              </h1>
              <p className="mt-6 text-lg leading-8 text-warning-100">
              Are you a college student looking to save money on essential items for your academic journey? Look no further! BitOlx is your go-to destination for finding affordable, high-quality used products tailored to your college needs.

              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                    to={localStorage.getItem("Token")?"https://bit-olx-frontend.vercel.app/AllProducts":"https://bit-olx-frontend.vercel.app/SignUp"}
                  className="rounded-md bg-red-700 px-3.5 py-3.5 text-sm font-semibold text-white shadow-sm hover:text-black"
                >
                  Get started
                </Link>
                <Link
                  to={localStorage.getItem("Token")?"https://bit-olx-frontend.vercel.app/AllProducts":"https://bit-olx-frontend.vercel.app/LogIn"}
                  className="text-sm font-bold leading-6 text-white border-white border-2 rounded-md p-2"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-black  py-24 sm:py-32 mx-auto">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 nest-hub:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg mx-auto">
                <h2 className="text-base font-semibold leading-7 text-white">
                  Sell faster
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Discover Affordable College Essentials

                </p>
                <p className="mt-6 text-lg leading-8 text-warning-100">
                Browse through our diverse selection of college essentials, including textbooks, electronics, furniture,and clothing. Whether you're gearing up for a new semester or looking to upgrade your study space, we've got you covered with budget-friendly options that won't break the bank.

                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-white lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-white">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-warning-100"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline text-warning-100">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="relative isolate overflow-hidden bg-black py-16 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none">
                    <div className="max-w-xl lg:max-w-lg">
                      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      Join the BitOlx Community Today!
                      </h2>
                      <p className="mt-4 text-lg leading-8 text-warning-100">
                      Ready to start saving money and finding great deals on college essentials? Sign up now to unlock exclusive benefits, connect with fellow students, and take advantage of our student-friendly marketplace!
                      </p>
                      <div className="mt-6 flex max-w-md gap-x-4">
                        <label htmlFor="email-address" className="sr-only">
                          Email address
                        </label>
                        <input
                          id="email-address"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                          placeholder="Enter your email"
                        />
                        <button
                          type="submit"
                          onClick={()=>{navigate("/SignUp")}}
                          className="flex-none rounded-md bg-red-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
                  aria-hidden="true"
                >
                  <div
                    className="aspect-[1155/678] w-[72.1875rem] bg-black"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                  />
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className="bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 nest-hub:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-white">
            Trusted by the world’s most innovative teams
          </h2>
          <div className="flex flex-wrap justify-evenly mt-10">
            <img
              className="col-span-2 max-h-12  object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
              alt="Transistor"
              width={158}
              height={48}
              color="white"
            />
            <img
              className="col-span-2 max-h-12  object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg"
              alt="Reform"
              width={158}
              height={48}
              color="white"
            />
            <img
              className="col-span-2 max-h-12  object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg"
              alt="Tuple"
              width={158}
              height={48}
              color="white"
            />
            <img
              className="col-span-2 max-h-12  object-contain sm:col-start-2 lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg"
              alt="SavvyCal"
              width={158}
              height={48}
              color="white"
            />
            <img
              className="col-span-2 col-start-2 max-h-12  object-contain sm:col-start-auto lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg"
              alt="Statamic"
              width={158}
              height={48}
            />
          </div>
        </div>
      </div>
    </>
  );
}
