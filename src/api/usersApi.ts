import type {User} from '../types';

export const fetchUsers= (): Promise<User[]>=>{
 return fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=>{
         if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    return response.json()
    })
    .then((data) => {
      return data.slice(0, 6); 
    });
}