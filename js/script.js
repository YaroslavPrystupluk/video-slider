const video = document.querySelector("#vimeo-player");
const container = document.querySelector(".pagination-video");
const images = document.querySelectorAll(".thumbnail");
const modal = document.querySelector(".modal");
const TOKEN = "9338e757510aad82573d9bd596e6931e";
const videoId = "824804225";

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  slidesPerView: 4,
  spaceBetween: 1,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const getPathVideoMiniature = async () => {
  try {
    const response = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.vimeo.*+json;version=3.4",
        "Content-Type": "image/jpeg, image/png, image/gif",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch video details");
    }

    const urlVideoMiniature = await response.json();
    const avatarUrl = urlVideoMiniature.pictures.base_link;
    images.forEach((img) => {
      img.src = avatarUrl;
      img.setAttribute("data-url", urlVideoMiniature.link);
    });
    createPaginations(urlVideoMiniature.link);
    return urlVideoMiniature;
  } catch (error) {
    console.error("Error fetching video thumbnail:", error);
    return null;
  }
};

const getUrlVideo = async () => {
  await getPathVideoMiniature();
  paginations(video);
};
getUrlVideo();

const createPaginations = (url) => {
  const totalSlides = swiper.slides.length;
  const pagination = document.createElement("ul");
  pagination.classList.add("pagination-wrapper");
  container.append(pagination);
  for (let i = 0; i < totalSlides; i++) {
    const paginationItem = document.createElement("li");
    paginationItem.classList.add("pagination-item");
    paginationItem.setAttribute("data-path", url);
    pagination.append(paginationItem);
  }
};

const iniVideoPlayer = async () => {
  const player = await new Vimeo.Player("vimeo-player", {
    width: 550,
    autoplay: true,
  });
  return player;
};

const btnClose = (video) => {
  document.querySelector(".btn-close").addEventListener("click", async () => {
    const player = await iniVideoPlayer();
    video.removeAttribute("data-vimeo-url");
    await player.destroy();
  });
};
btnClose(video);

const startVideoPlayer = (video) => {
  images.forEach((image) => {
    image.addEventListener("click", async () => {
      const currentUrl = image.getAttribute("data-url");
      video.setAttribute("data-vimeo-url", currentUrl);
      iniVideoPlayer();
    });
  });
};
startVideoPlayer(video);

const paginations = (video) => {
  const buttonsPag = document.querySelectorAll(".pagination-item");
  buttonsPag.forEach((buttonPag) => {
    buttonPag.addEventListener("click", async () => {
      video.removeAttribute("data-vimeo-url");
      const newUrl = buttonPag.getAttribute("data-path");
      const player = await iniVideoPlayer();
      await player.destroy().then(() => {
        video.setAttribute("data-vimeo-url", newUrl);
        startVideoPlayer(video);
        iniVideoPlayer();
      });
    });
  });
};
paginations(video);
