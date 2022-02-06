import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3",
});

export default instance;


// axios is usting to creating instance.
// when we call axios somewhare else, it will return the instance as the base output
// which is https://api.themoviedb.ogr/3