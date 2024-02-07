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


// const getPathVideoMiniature = async () => {
// 	try {
//     const response = await fetch(
//       "https://api.vimeo.com/videos/824804225?fields=metadata.connections.pictures.uri",
//       {
//         headers: {
//           Authorization: "Bearer 9338e757510aad82573d9bd596e6931e",
//           Accept: "application/vnd.vimeo.*+json;version=3.4",
//         },
//       }
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch video details");
//     }

//     const urlVideoMiniature = await response.json();
//     const thumbnailUrl = urlVideoMiniature.metadata.connections.pictures.uri;

//     return thumbnailUrl;

//   } catch (error) {
//     console.error("Error fetching video thumbnail:", error);
//     return null;
//   }
// };

// const getVideoMiniature = async () => {
// 	const url = await getPathVideoMiniature();
// 	console.log(url);
//   const data = await fetch(`https://api.vimeo.com/videos/824804225/pictures`, {
//     method: "POST",
//     headers: {
//       Authorization: "Bearer 9338e757510aad82573d9bd596e6931e",
//       Accept: "application/vnd.vimeo.*+json;version=3.4",
//       "Content-Type": "application/json",
//     },
//   });
//   let res = await data.json();
//   console.log(res);
//   return res;
// };

// getVideoMiniature();

// const videoPlayer = new Vimeo.Player("myVideo");
// videoPlayer.on("play", function () {
//   console.log("Played the video");
// });


const getUrlVideo = async () => {
  try {
    const response = await fetch("https://api.vimeo.com/videos/824804225", {
      headers: {
        Authorization: "Bearer 9338e757510aad82573d9bd596e6931e",
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch video details");
    }

    const urlVideo = await response.json();

    const video = document.querySelector("#vimeo-player");
    video.setAttribute("data-vimeo-url", urlVideo.link);
	 new Vimeo.Player("vimeo-player", {
     url: urlVideo.link,
     width: 640,
     autoplay: false,
   });

  } catch (error) {
    console.error("Error fetching video thumbnail:", error);
    return null;
  }
};

getUrlVideo();


function contentSlide() {
  document.querySelectorAll(".swiper-slide").forEach(function (element) {
    const content = element.textContent;
	 
    element.addEventListener("click", function () {
      document.querySelector("#par").textContent = content
    });
  });
}

contentSlide();
