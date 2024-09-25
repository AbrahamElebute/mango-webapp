import React from "react";
import SectionContainer from "../Layout/SectionContainer";
import Button from "../ui/form/Button";
import VidCard from "../pages/home/VidCard";

const Hero = () => {
  const videos = [
    {
      src: "/assets/videos/pikuniku_knight_small.mp4",
      title: "Video 1",
      description: "Description for video 1",
      posterSrc: "",
    },
    {
      src: "/assets/videos/Download.mp4",
      title: "Video 2",
      description: "Description for video 2",
      posterSrc: "",
    },
    {
      src: "/assets/videos/pikuniku_knight_small.mp4",
      title: "Video 3",
      description: "Description for video 3",
      posterSrc: "",
    },
    {
      src: "/assets/videos/Download.mp4",
      title: "Video 4",
      description: "Description for video 4",
      posterSrc: "",
    },
  ];

  return (
    <SectionContainer className="min-h-screen flex items-center  justify-center">
      <div className="flex flex-col w-full items-center gap-12 mt-20">
        <h1
          className="text-center font-black capitalize"
          style={{ fontSize: "clamp(3rem, 5vw, 6rem)" }}
        >
          Lets reach the <br />
          Unreachables
        </h1>
        <Button variant="primary" isSpecial>
          Watch Live
        </Button>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <VidCard
              key={index}
              videoSrc={video.src}
              title={video.title}
              description={video.description}
              className={index % 2 !== 0 ? "md:!mt-10 mt-0" : "mt-0"}
              posterSrc={video.posterSrc}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default Hero;
