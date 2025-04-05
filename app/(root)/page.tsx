"use client";

import About from "@/components/About";
import Services from "@/components/Services";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import Image from "next/image";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  }
];
export default function Home() {

  return <>
    <div className="flex justify-center items-center w-full h-screen">
      {/* 1st half */}
      <div className="flex items-center justify-center w-1/2 h-full">
        <div className="flex flex-col w-2/3 gap-4">
          <h1 className="text-6xl">
            Manage your portfolio with ease.
          </h1>
          <p className="text-sm mt-16">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            doloribus deserunt, quod quae fugit officiis ipsam, dolores
          </p>
          <div className="flex items-center gap-5">
            <div className="flex">
              <AnimatedTooltip items={people} />
            </div>
            <h3 className="text-3xl">
              10m+ users
            </h3>
          </div>

        </div>
      </div>

      {/* 2nd half */}
      <div className="flex items-end justify-center w-1/2 h-full">
        <Image src="/stat.png" alt="stat" width={700} height={700} />
      </div>
    </div>

    <About />
    <Services />
  </>
}
