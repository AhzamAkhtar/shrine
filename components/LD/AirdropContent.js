import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
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

      <div className="flex justify-center">
        <section class="text-gray-600 body-font mx-20 py-2">
          <div class=" px-20 py-5 mx-auto ">
            <div class="flex flex-wrap -m-5 px-20 py-1 sm:px-2">
              <>
                <Card
                  shadow={false}
                  className="relative mx-5  grid h-[40rem] w-1/4 max-w-[28rem] items-end justify-center overflow-hidden text-center"
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://picsum.photos/200/300')] bg-cover bg-center"
                  >
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                  </CardHeader>
                  <CardBody className="relative py-14 px-6 md:px-12">
                    <Typography
                      variant="h2"
                      color="white"
                      className="mb-6 font-medium leading-[1.5]"
                    >
                      How we design and code open-source projects?
                    </Typography>
                    <Typography variant="h5" className="mb-4 text-gray-400">
                      Candice Wu
                    </Typography>
                    <Avatar
                      size="xl"
                      variant="circular"
                      alt="candice wu"
                      className="border-2 border-white"
                      src="https://picsum.photos/200/300"
                    />
                  </CardBody>
                </Card>
                <Card
                  shadow={false}
                  className="relative mx-5  grid h-[40rem] w-1/4 max-w-[28rem] items-end justify-center overflow-hidden text-center"
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://picsum.photos/200/301')] bg-cover bg-center"
                  >
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                  </CardHeader>
                  <CardBody className="relative py-14 px-6 md:px-12">
                    <Typography
                      variant="h2"
                      color="white"
                      className="mb-6 font-medium leading-[1.5]"
                    >
                      How we design and code open-source projects?
                    </Typography>
                    <Typography variant="h5" className="mb-4 text-gray-400">
                      Candice Wu
                    </Typography>
                    <Avatar
                      size="xl"
                      variant="circular"
                      alt="candice wu"
                      className="border-2 border-white"
                      src="https://picsum.photos/200/301"
                    />
                  </CardBody>
                </Card>

                <Card
                  shadow={false}
                  className="relative mx-5  grid h-[40rem] w-1/4 max-w-[28rem] items-end justify-center overflow-hidden text-center"
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://picsum.photos/200/302')] bg-cover bg-center"
                  >
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                  </CardHeader>
                  <CardBody className="relative py-14 px-6 md:px-12">
                    <Typography
                      variant="h2"
                      color="white"
                      className="mb-6 font-medium leading-[1.5]"
                    >
                      How we design and code open-source projects?
                    </Typography>
                    <Typography variant="h5" className="mb-4 text-gray-400">
                      Candice Wu
                    </Typography>
                    <Avatar
                      size="xl"
                      variant="circular"
                      alt="candice wu"
                      className="border-2 border-white"
                      src="https://picsum.photos/200/302"
                    />
                  </CardBody>
                </Card>
                
              </>
            </div>
          </div>
        </section>
      </div>
      <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 mt-10">
        <a
          href="#"
          class="inline-flex justify-center items-center py-4 px-5 text-lg font-medium text-center text-black rounded-full bg-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
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
