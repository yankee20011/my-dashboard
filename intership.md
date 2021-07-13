# Welcome to the Internship Program

## Sarcina

De creat un dashboard cu urmatoarele module:

1. Login Page - o forma cu login si password
2. Register Page - o forma cu nume, prenume, email, password, confirm password
3. Dashboard home page - 2 charts(re-charts librarie), 1 cu users si 1 cu posts
4. Users - un table cu lista de users inregistrati + un button de adaugare a unui user nou
   forma va fi ca la user register.
   4.1 Aduagare user - adaugare de user va fi in pagina aparte /users/add
   4.2 Editare user - la fel ca pagina /users/5/edit(5 - user id). Pentru editare va fi aceeasi componenta ca si la adaugare
   4.3 Delete user - stergere user dupa id
5. Posts - un grid de carduri cu detalii despre post
   5.1 Adaugare post - adaugarea se va face printr-un modal cu forma(title, description, date, tags, category)
   5.2 Editare post - la fel va fi in acelasi modal
   5.3 Delete post - stergere de post dupa id

## Librarii

1. json-server - va fi folosit pentru creare de api si baza de date, este o librarie care se utilizeaza local
2. react-router-dom - pentru routes
3. typescript - pentru tipizare
4. react-query - pentru lucru cu API

## Structura foldere

- `/api` - lista de api separate pe module
  - `users.ts` - va detine API pentru user, GET, POST etc..
- `/components` - aici sunt toate componentele reutilizabile
  - `Button.tsx` - Button reutilizabil
- `/types` - fisierele cu tipizari globale(care se folosesc in mai multe module)
  - `users.ts` - ex. interface UserEntity { name: string; age: integer }
- `/features` - aici sunt modulele separte pe foldere
  - `/users/` - modulul de users
    - `UserComponent.tsx` - componente necesare pentru modulul de Users(ex. UsersFilters.tsx)
    - `UsersFilters.tsx` - acest component este utilizat in pages/Users.tsx
    - `/pages/`
      - `Users.tsx` - pagina de users construita din componente reutilizabile, sau care apartin doar users
  - `/posts/` - la fel ca la users, aceasi structura
- `/hooks` - hooks folosit in mai multe module
- `/utils` - utilitati globale
- `/styles` - stilurile

In general structura e impartita in `local` si `global`, ce este local se afla cat mai aproape de unde se foloseste, ce este global, se adaugata in folder de prim nivel(`/utils`, `/types`)
ex. De local

- `/Button/`
  - `Button.tsx` - component
  - `useButton.ts` - daca e necesar, e ca exemplu
  - `utils.ts` - daca se folosesc mai multe functii in Button, se separa in fisier aparte
  - `types.ts` - daca sunt mai multe interface, types, tot se separa in fisier aparte
