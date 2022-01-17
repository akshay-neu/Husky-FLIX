/*importing react components*/
import React, { useEffect, useState, useRef, useCallback } from 'react'
/*importing ant design components for styles*/
import { Typography, Row, Button } from 'antd';
/*importing API details to fetch data through API*/
import { API_URL, API_KEY, IMAGE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config/Config.js'
import MainImage from './MainImage/MainImage.js'
import GridCard from '../GridCard/GridCard.js'
/*importing image slider react feature*/
import SimpleImageSlider from "react-simple-image-slider";
import './LandingPage.scss';

const { Title } = Typography;
function LandingPage() {
  /*defining user states for each component*/
    const buttonRef = useRef(null);

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [Loading, setLoading] = useState(true)
    const [CurrentPage, setCurrentPage] = useState(0);
    const [ImageArr, setImageArr] = useState([]);
    const [backupImg, setBackupImgArr] = useState([])
    const [LandingPage, setLandingPage] = useState(true)
    const [CurrentImageIndex, setCurrentImageIndex] = useState(0);
    let CurrIndex = 0;

    useEffect(() => {
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetchMovies(endpoint);
      let tagLatestMovies = document.getElementsByClassName("movie-by-latest");
      for (var i = 0; i < tagLatestMovies.length; i++) {
        tagLatestMovies[i].className += " on-tab-select";
      }
    }, []);

    /*adding event listener on scroll*/
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])


    /*fetching all the movies function*/
    const fetchMovies = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                // console.log('Movies',...Movies)
                // console.log('result',...result.results)
                setMovies([...Movies, ...result.results]);
                setBackupImgArr([...backupImg, ...result.results])
                setMainMovieImage(MainMovieImage || result.results[0])
                let tempRes = JSON.parse(JSON.stringify(result.results));
                tempRes.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
                ImageArr.splice(0);
                let imagArr = [];
                for(let i=0;i<5;i++) {
                  let obj = {
                    url: IMAGE_URL + IMAGE_SIZE + tempRes[i].backdrop_path,
                    original_title: tempRes[i].original_title,
                    overview: tempRes[i].overview,
                    movieId: tempRes[i].id,
                  };
                  imagArr.push(obj)
                }
                setImageArr([...ImageArr, ...imagArr]);
                console.log(ImageArr)
                setCurrentPage(result.page)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }
    /*load more images on scroll*/
    const loadMoreItems = () => {
        let endpoint = '';
        setLoading(true)
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }

    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 1) {

            // loadMoreItems()
            console.log('clicked', buttonRef)
            if(buttonRef.current != null){
                buttonRef.current.click();
            }
        }
    }

    const onClick = (idx, event) => {
      console.log(`[App onClick] ${idx} ${event.currentTarget}`,ImageArr);
      window.location.href = `/movie/${ImageArr[idx].movieId}`;
      return null;
    };

    const onClickNav = useCallback((toRight) => {
      if (toRight) {
        CurrIndex = CurrIndex + 1;
        setCurrentImageIndex(CurrIndex);
      } else {
        CurrIndex = CurrIndex - 1
        setCurrentImageIndex(CurrIndex);
      }
    }, []);
  
    const onClickBullets = useCallback((idx) => {
      CurrIndex = idx;
      setCurrentImageIndex(idx);
    }, []);

    const getMovies = (movieType) => {
      setMovies([]);
      setBackupImgArr([]);
      setCurrentImageIndex(0);
      ImageArr.splice(0);
      setLoading(true);
      let url = "";
      
      /**
       * categorising movies by tab switching
       */
      let tagTabSelect = document.getElementsByClassName("on-tab-select");
      while (tagTabSelect.length)
        tagTabSelect[0].classList.remove("on-tab-select");
      let tagLatestMovies = document.getElementsByClassName("movie-by-latest");
      let tagEnglishMovies = document.getElementsByClassName("movie-by-eng");
      let tagHindiMovies = document.getElementsByClassName("movie-by-hin");
      let tagKidsMovies = document.getElementsByClassName("movie-by-kid");
      if (movieType === "Latest") {
        url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        setTabStyle(tagLatestMovies);
      } else if (movieType === "Eng") {
        url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=2`;
        setTabStyle(tagEnglishMovies);
      } else if (movieType === "Hin") {
        url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=4`;
        setTabStyle(tagHindiMovies);
      } else {
        url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=5`;
        setTabStyle(tagKidsMovies);
      }
      fetchMovies(url);
    };

    const setTabStyle = (tabName) => {
      for (var i = 0; i < tabName.length; i++) {
        tabName[i].className += " on-tab-select";
      }
    }


    return (
      <div className="main-image">
        {MainMovieImage && !LandingPage && (
          <MainImage
            image={`${IMAGE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            text={MainMovieImage.overview}
          />
        )}
        {/**
         * Adding image slider functionality to display the poster of first five popular movies
         */}
        {ImageArr.length !== 0 && LandingPage && (
          <div>
            <SimpleImageSlider
              width={"100%"}
              height={504}
              loop={true}
              images={ImageArr}
              showBullets={true}
              showNavs={true}
              autoPlay={true}
              onClick={onClick}
              onClickNav={onClickNav}
              onClickBullets={onClickBullets}
              autoPlayDelay={1}
            />
            <div className="image-position">
              <div className="image-overview"
                className="image-style"
              >
                <Title className="white" level={2}>
                  {" "}
                  {ImageArr[CurrentImageIndex].original_title}{" "}
                </Title>
                <p className="white1">
                  {ImageArr[CurrentImageIndex].overview}{" "}
                </p>
              </div>
            </div>
          </div>
        )}
        {/*Classifying movies based on language, popularaity and release date */}
        <div className="landing">
          <div className="land-style">
            <Title id="latest" className="movie-by-latest tabs" onClick={() =>getMovies('Latest')} level={3}> Movies by latest </Title>
            <Title id="english" className="movie-by-eng tabs" onClick={() =>getMovies('Eng')}  level={3}> English </Title>
            <Title id="hindi" className="movie-by-hin tabs" onClick={() =>getMovies('Hin')}  level={3}> Hindi </Title>
            <Title id="kids" className="movie-by-kid tabs" onClick={() =>getMovies('Kid')}  level={3}> Kids </Title>
          </div>
          <hr />
          <Row gutter={[16, 16]}>
            {Movies &&
              Movies.map((movie, index) => (
                <React.Fragment key={index}>
                  <GridCard
                    image={
                      movie.poster_path
                        ? `${IMAGE_URL}${POSTER_SIZE}${movie.poster_path}`
                        : null
                    }
                    movieId={movie.id}
                    movieName={movie.original_title}
                    overview={movie.overview}
                    rating={movie.vote_average}
                  />
                </React.Fragment>
              ))}
          </Row>

          {Loading && <div>Loading...</div>}

          <br />
          <div className="land-button">
            <button
              ref={buttonRef}
              className="loadMore"
              onClick={loadMoreItems}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    );
}

export default LandingPage