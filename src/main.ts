import './style.css'
import type { Recipe, User } from './types'

async function getChefBirthday(id: number): Promise<string | undefined> {


  try {
    // Fetch the recipe data
    const response = await fetch(`https://dummyjson.com/recipes/${id}`)
    console.log(response.status, response.statusText);
    if (!response.ok) {
      throw new Error(`Errore ${response.status} ${response.statusText}`)
    }

    const recipe: Recipe = await response.json()
    console.log(recipe);

    // Fetch the user data using the userId from the recipe
    if (!recipe.userId) {
      throw new Error(`La ricetta ${id} non ha un userId associato`)
    }
    const userResponse = await fetch(`https://dummyjson.com/users/${recipe.userId}`)
    if (!userResponse.ok) {
      throw new Error(`Errore ${userResponse.status} ${userResponse.statusText}`)
    }
    const user: User = await userResponse.json()
    console.log(user);

    // Return the birthDate of the user
    if (!user.birthDate) {
      throw new Error(`L'utente con ID ${recipe.userId} non ha una data di nascita`)
    }
    return user.birthDate;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
}

(async () => {
  try {
    const result = await getChefBirthday(1)
    console.log(`Data di nascita dello chef: ${result}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Errore durante il recupero della data di nascita dello chef: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
  }
})();