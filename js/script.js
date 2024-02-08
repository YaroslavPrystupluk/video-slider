const video = document.querySelector("#vimeo-player");
const TOKEN = "9338e757510aad82573d9bd596e6931e";
const videoId = "824804225";

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  slidesPerView: 4,
  spaceBetween: 1,

  pagination: {
    el: ".swiper-pagination",
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
    const avatarUrl = urlVideoMiniature.pictures.sizes[2].link;

    const imgs = document.querySelectorAll(".thumbnai");
    imgs.forEach((img) => (img.src = avatarUrl));

    return urlVideoMiniature;

  } catch (error) {
    console.error("Error fetching video thumbnail:", error);
    return null;
  }
};

const getUrlVideo = async () => {
  const urlVideo = await getPathVideoMiniature();
  const player = iniVideoPlayer(urlVideo.link);

  iniVideoPlayer(urlVideo.link);
  setAtrVimeoUrl(urlVideo.link, video);
  btnClose(player, video);
};
getUrlVideo();

const iniVideoPlayer = (url) => {
  const player = new Vimeo.Player("vimeo-player", {
    url,
    width: 640,
    autoplay: true,
    loop: false,
  });
  return player;
};

const btnClose = (player, video) => {
  document.querySelector(".btn-close").addEventListener("click", () => {
    video.removeAttribute("data-vimeo-url");
    player.pause();
  });
};

const setAtrVimeoUrl = (url, video) => {
document.querySelectorAll(".swiper-slide").forEach(function (element) {
  element.addEventListener("click", function () {
    video.setAttribute("data-vimeo-url", url);
  });
});
};
