import React, { useEffect, useState } from "react";
import axios from "axios";
import Cardcomponent from "../components/Cardcomponent";
import Searchcomponent from "../components/Searchcomponent";
import useDebounce from "../hooks/use-debounce";

const Dashboard = () => {
  let [catBreeds, setCatBreed] = useState([0]);
  let [filter, setFilter] = useState();
  let [sortBy, setSortBy] = useState();
  let imageBaseUrl = "https://cdn2.thecatapi.com/images/";

  const debouncedSearchTerm = useDebounce(filter, 1000);
  const imageSrc = async (imageId) => {
    try {
      axios.defaults.headers.common["x-api-key"] =
        "245063af-3793-4674-a6cb-17a3e2460861";
      var response = await axios.get(
        "https://cdn2.thecatapi.com/images" + imageId
      );
      console.log(response.data.url);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    var url = "https://api.thecatapi.com/v1/breeds";
    if (filter) {
      url = url + "/search?q=" + filter;
    }
    axios.defaults.headers.common["x-api-key"] =
      "4d98e75d-8552-41c2-b284-6adf433e3c6d";
    axios
      .get(url)
      .then((response) => {
        setCatBreed(
          response.data.map((catBreed) => {
            var [minWeight, maxWeight] = catBreed.weight.imperial.split("-");
            var avgWeight = (maxWeight + minWeight) / 2;
            var [minSpan, maxSpan] = catBreed.life_span.split("-");
            var avgLifeSpan = parseInt(maxSpan, 10)
              ? (parseInt(maxSpan, 10) + parseInt(minSpan, 10)) / 2
              : parseInt(minSpan, 10);
            catBreed.weight = avgWeight;
            catBreed.averageLifeSpan = avgLifeSpan;
            catBreed.imageUrl = catBreed.image
              ? catBreed.image.url
              : imageBaseUrl + catBreed.reference_image_id + ".jpg";
            return catBreed;
          })
        );
        console.log(catBreeds);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [debouncedSearchTerm]);

  useEffect(() => {
    let breedsList = [...catBreeds];

    breedsList.sort((a, b) => b[sortBy] - a[sortBy]);

    setCatBreed(breedsList);
  }, [sortBy]);

  return (
    <div className="container">
      <Searchcomponent setFilter={setFilter} setSortBy={setSortBy} />
      {/* <code>{JSON.stringify(catBreeds)}</code> */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {catBreeds.map((breedsList) => {
          return (
            <div>
              {/* <p>{imagesArray[breedsList.reference_image_id]}</p> */}
              <Cardcomponent catBreeds={breedsList} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
