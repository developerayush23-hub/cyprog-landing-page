particlesJS("particles-js", {

  particles: {

    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },

    color: {
      value: "#00f5ff"
    },

    shape: {
      type: "circle"
    },

    opacity: {
      value: 0.5
    },

    size: {
      value: 3
    },

    line_linked: {
      enable: true,
      distance: 150,
      color: "#00f5ff",
      opacity: 0.4,
      width: 1
    },

    move: {
      enable: true,
      speed: 2
    }

  },

  interactivity: {

    detect_on: "canvas",

    events: {

      onhover: {
        enable: true,
        mode: "repulse"
      },

      onclick: {
        enable: true,
        mode: "push"
      }

    }

  },

  retina_detect: true

});

AOS.init({
    duration: 1000,
    once: true
});