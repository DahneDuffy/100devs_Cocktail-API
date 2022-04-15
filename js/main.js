//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener("click",getDrink)



function getDrink(){
    let drink = document.querySelector('input').value;
    let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
    fetch(url+drink)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data.drinks);
            document.querySelector('h1').innerText = data.drinks[0].strDrink;
            document.querySelector('img').src = data.drinks[0].strDrinkThumb;
            document.querySelector('.instructions').innerText = data.drinks[0].strInstructions;
            
            let j=1;
        
            while (data.drinks[0]["strIngredient"+j]){
                document.querySelector(".ingredients").innerText += " "+data.drinks[0]["strIngredient"+j];
                j++;
            }

            if(data.drinks.length>1){
                let i=1;
                document.querySelector('.nextDrink').style.display="block";

                document.querySelector('.nextDrink').addEventListener('click',function(){
                    let j=1;
                    document.querySelector('h1').innerText = data.drinks[i].strDrink;
                    document.querySelector('img').src = data.drinks[i].strDrinkThumb;
                    document.querySelector('.instructions').innerText = data.drinks[i].strInstructions;
                    document.querySelector(".ingredients").innerText="";

                    while (data.drinks[i]["strIngredient"+j]){
                         document.querySelector(".ingredients").innerText += " "+data.drinks[i]["strIngredient"+j];
                        j++;
                    }

                    i++;
    } )
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        });

}

// function getMultipleDrinks(){
//     document.querySelector('.nextDrink').style.display="block";
//     let i=1;
//     document.querySelector('.nextDrink').addEventListener('click',function(){
//         document.querySelector('h1').innerText = data.drinks[i].strDrink;
//             document.querySelector('img').src = data.drinks[i].strDrinkThumb;
//             document.querySelector('h3').innerText = data.drinks[i].strInstructions;
//     } )
    
// }

