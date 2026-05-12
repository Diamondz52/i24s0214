interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        city: string;
    };
    phone: string;
    website: string;
    company: {

    };
}

async function fetchUser(userId: number): Promise<User | null> {
    try{
        const response: Response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        if(!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const userData: User = await response.json();

        return userData;
    } catch (error) {
        console.error('Не удалось загрузить пользователя:', error);
        return null;
    }
}

async function fetchUsers(city?: string): Promise<User[]>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const users: User[] = await response.json();

        if (city){
            return users.filter(user => user.address.city === city)
        }
        return users;
    } catch (error) {
        console.error('Не удалось загрузить пользователей:', error);
        return [];
    }
}
export async function displayUser(){
    const user = await fetchUser(1);
    if (user) {
        console.log(`Имя пользователя: ${user.address.city}`);
    } else{
        console.log('Пользователь не найден');
    }
}

export async function displayUsers(city?: string){
    const users = await fetchUsers(city);
    console.log(`Найдено пользователей: ${users.length}`)
    users.forEach(user => {
        console.log(`Имя пользователя: ${user.name}`);
    });
}