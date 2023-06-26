import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
const AirdropContent = () => {
  return (
    <>
      <section class="bg-black mt-10">
        <div class="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white">
            the content nebula
          </h1>
          <p class="mb-8 text-2xl font-extrabold text-yellow-300 lg:text-3xl sm:px-16 lg:px-48">
            where free creations drift into your hands
          </p>
         
        </div>
      </section>

      <section class="text-gray-600 body-font mx-5 py-2">
        <div class="container px-20 py-5 mx-auto ">
          <div class="flex flex-wrap -m-5 px-24 py-1 sm:px-2 ">
            <>
              {/* <div class="xl:w-1/3 md:w-1/2 p-4">
                <div class={`border border-gray-200 p-6 rounded-lg bg-white`}>
                  <h2 class={`text-3xl text-white font-medium title-font mb-2`}>
                    from
                  </h2>

                  <p class="leading-relaxed text-xl mt-2">msg</p>
                  <div className="flex justify-between">
                    <p class="leading-relaxed text-base mt-2">from</p>
                    <p class="leading-relaxed text-base mt-2">from</p>
                  </div>
                </div>
              </div> */}
              <div>
                <Card className="mt-6 w-96 mr-2">
                  <CardHeader color="blue-gray" className="relative h-56">
                    <img
                      src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                      alt="img-blur-shadow"
                      layout="fill"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      UI/UX Review Check
                    </Typography>
                    <Typography>
                      The place is close to Barceloneta Beach and bus stop just
                      2 min by walk and near to &quot;Naviglio&quot; where you
                      can enjoy the main night life in Barcelona.
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button>Read More</Button>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card className="mt-6 w-96 mr-2">
                  <CardHeader color="blue-gray" className="relative h-56">
                    <img
                      src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                      alt="img-blur-shadow"
                      layout="fill"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      UI/UX Review Check
                    </Typography>
                    <Typography>
                      The place is close to Barceloneta Beach and bus stop just
                      2 min by walk and near to &quot;Naviglio&quot; where you
                      can enjoy the main night life in Barcelona.
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button>Read More</Button>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card className="mt-6 w-96 mr-2">
                  <CardHeader color="blue-gray" className="relative h-56">
                    <img
                      src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                      alt="img-blur-shadow"
                      layout="fill"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      UI/UX Review Check
                    </Typography>
                    <Typography>
                      The place is close to Barceloneta Beach and bus stop just
                      2 min by walk and near to &quot;Naviglio&quot; where you
                      can enjoy the main night life in Barcelona.
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button>Read More</Button>
                  </CardFooter>
                </Card>
              </div>
            </>
          </div>
        </div>
      </section>
      <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 mt-10">
            <a
              href="#"
              class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              discover all
              <svg
                aria-hidden="true"
                class="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
           
          </div>
    </>
  );
};

export default AirdropContent;
