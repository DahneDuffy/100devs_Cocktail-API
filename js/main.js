//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener("click",getDrink)



function getDrink(){
    if(document.querySelector('input').value ==''){
        return
    }
    if(document.querySelector('.ingredients').childNodes.length>0){
        document.querySelector('.ingredients').childNodes.forEach(element=>{
            console.log(element)
            document.querySelector('.ingredients').removeChild(element)
        })
    }
    let drink = document.querySelector('input').value;
    document.querySelector('input').value ='';

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
                const li = document.createElement('li')
                li.textContent = " "+data.drinks[0]["strIngredient"+j];
                document.querySelector('.ingredients').appendChild(li)
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
                        const li = document.createElement('li')
                        li.textContent = " "+data.drinks[0]["strIngredient"+j];
                        document.querySelector('.ingredients').appendChild(li)
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

//still some kinks to work out here

