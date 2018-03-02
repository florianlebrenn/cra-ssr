export const fetchImage = async imageUrl => {
  return new Promise((resolve, reject) => {
    try {
      fetch(imageUrl)
        .then(response => {
          if (response.ok) {
            response
              .blob()
              .then(myBlob => {
                resolve(URL.createObjectURL(myBlob));
              })
              .catch(error => {
                reject({
                  error,
                  errorMessage: "blob"
                });
              });
          } else {
            reject("Mauvaise réponse du réseau");
          }
        })
        .catch(error => {
          reject({
            error,
            errorMessage: "Il y a eu un problème avec l'opération fetch"
          });
        });
    } catch (error) {
      reject({
        error,
        errorMessage: "Other error"
      });
    }
  });
};

export const getImagePlaceholder = ({
  width = "350",
  height = "200",
  text = "Placeholder",
  font = "lobster"
} = {}) => {
  return `https://fakeimg.pl/${width}x${height}/?text=${text}&font=${font}`;
};
