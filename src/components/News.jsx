import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import NewsItem from './NewsItem';
import css from './News.module.css';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";




const News = ({ category }) => {

    const [nextPageObj] = useState({
        arr: [],
        index: -1
    });

    const [loader, setloader] = useState(false);
    const [nullNextPage, setNullNextPage] = useState(false);

    const APIkey = "pub_51856ae3b4ae4e1e827dba07c5028a3973b34";
    const [articles, setArticles] = useState([]);
    const fetchURL = async () => {
        const url = `https://newsdata.io/api/1/latest?apikey=${APIkey}${category !== "" ? '&category=' + category : ""}&country=in&language=en,hi${nextPageObj.index > -1 ? "&page=" + nextPageObj.arr[nextPageObj.index] : ""}`;
        setloader(true);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.results, category);
        setArticles(data.results);
        if (data.nextPage != null) {
            nextPageObj.arr = nextPageObj.arr.concat(data.nextPage);
            nextPageObj.index = nextPageObj.index + 1;
            // console.log("index is " + nextPageObj.index);
            // console.log("array last element is " + nextPageObj.arr[nextPageObj.index]);
            // console.log(data.nextPage);
        }
        else {
            setNullNextPage(true);
            // console.log("no more news to show");
        }
        setloader(false);

    }
    useEffect(() => {
        fetchURL();
    }, [category])

    const removeLastOfArr = (arr, index) => {
        const newArr = arr.filter((item) => item != arr[index - 1] && item != arr[index]);
        return newArr;

    }

    const handleNextButton = async () => {
        if (nullNextPage) {
            alert("No More News To Show");
        }
        else {
            fetchURL();
        }

    }

    const handlePrevButton = async () => {
        if (nextPageObj.index === 0 || nextPageObj.index === -1) {
            alert("Its start page of the news");
            return;
        }

        const newArr = removeLastOfArr(nextPageObj.arr, nextPageObj.index);
        nextPageObj.arr = newArr;
        nextPageObj.index = nextPageObj.index - 2;
        fetchURL();
    }


    return (
        <>
            <center>
                {loader && <button className={`btn btn-primary ${css.loaderButton}`} type="button" disabled>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">Loading...</span>
                </button>}



                <div className={css.newsContainer} >
                    {articles.map((element) => (
                        <NewsItem
                            key={element.article_id}
                            title={element.title}
                            description={element.description}
                            source_name={element.source_name}
                            pubDate={element.pubDate}
                            image_url={element.image_url}
                            link={element.link}
                        />
                    ))}
                </div>

                {nullNextPage && <h3 className={css.noNews}>No more news to show!</h3>}

                {!loader && <div className="buttonContainer">
                    <FaArrowLeft
                        className={css.button}
                        onClick={handlePrevButton} />
                    <FaArrowRight
                        className={css.button}
                        onClick={handleNextButton} />
                </div>}

            </center>
        </>
    )
}

export default News


