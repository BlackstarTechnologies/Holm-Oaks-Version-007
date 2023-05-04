console.log("Hello World");
const root = $("#root");
const imgs_existing = root
  .html()
  .split('"')
  .filter((v) => v.includes("Fotor"));

// console.log(imgs_existing);
fetch("/api/images/images-list")
  .then((res) => res.json())
  .then(({ images_list }) => {
    // console.log(images_list);
    // console.log($);

    if (root) {
      images_list
        .filter((v) => !imgs_existing.includes(v))
        .forEach(async (src) => {
          var img = new Image();
          img.src = src;
          await fetch(src);
          img.classList.add("gallery-image");

          document.getElementById("root").appendChild(img);
          //   appendToRoot(element);
        });
    }
  });
