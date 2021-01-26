// Get Quote from API
const quoteContainer= document.getElementById("quote-container");
const quoteContent=document.getElementById("quote");
const authorContent= document.getElementById("author");
const twitterBtn=document.getElementById("twitter");
const newQuoteBtn= document.getElementById("new-quote");
const loader= document.getElementById("loader");
//CORS - Cross origin resource sharing

//Loader
const loading= ()=>
{
    loader.hidden=false;
    quoteContainer.hidden=true;
}

//Hide loading
const complete= ()=>
{
    if(!loader.hidden)
    {
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

const quoteCollect = async ()=>
{
    loading();

    const proxyUrl= "https://cors-anywhere.herokuapp.com/";
    const apiUrl=
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
    try
    {
        const response= await fetch(proxyUrl+apiUrl);
        const data= await response.json();
        quoteContent.innerText= data.quoteText;
        if(data.quoteAuthor==='')
        {
            authorContent.innerText= "Unknown"; 
        }
        else
        {
            authorContent.innerText= data.quoteAuthor;
        }
        //Reduce Font-Size for long Quotes
        if(data.quoteText.length>120)
        {
            quoteContent.classList.add('long-quote');
        }
        else{
            quoteContent.classList.remove('long-quote');
        }
        
        
        // show quote stop loader
        complete();
    }
    catch(err)
    {
        quoteCollect();
        console.log('Whoops, no Quote', err);
    }
}

    //Getting Tweet Btn Working
const tweetQuote=()=>
{       const quote= quoteContent.innerText;
        const author= authorContent.innerText;
        const twitterUrl= `https://twitter.com/intent/tweet?text=${quote} -${author}`;
        window.open(twitterUrl, '_blank');
}


//Adding Event Listener
newQuoteBtn.addEventListener('click',quoteCollect);

twitterBtn.addEventListener('click', tweetQuote);

//On Load
quoteCollect(); 