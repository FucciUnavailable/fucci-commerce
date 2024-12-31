// src/components/ParticlesBackground.js
import React from 'react';
import { Particles } from 'react-tsparticles'; // Import Particles from react-tsparticles

const ParticlesBackground = () => {
  return (
    <Particles
      options={{
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 5,
              size_min: 0.3,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#fff',
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
          },
        },
      }}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default ParticlesBackground;
