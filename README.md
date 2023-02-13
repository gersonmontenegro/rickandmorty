  

Rick and Morty interface

  

This project is about to create an interface based on [Rick And Morty API](https://rickandmortyapi.com/), using the next design

![Home](https://i.ibb.co/3fwSqJW/home.png)

Despite this is a web design, we need to make some changes to turn it into a mobile version.

Last design has to do with details of the pressed card:

![Card details](https://i.ibb.co/PhNhbbt/profile.png)

  

Our requirements are:

  

1.  **Header**

Header with two links:

1.1. All episodes

1.2. All locations

Above links should works.

2.  **Hero Banner**

Hero image with Title, subtitle, and button. No functionality required.

3.  **Search Bar**

Search bar with dropdown filter, and input text as described above:

3.1. Dropdown filter with options: Episodes, Characters, and Locations.

3.2. Text input to search by text.

4.  **Search results**

Search results should responds to next behaviours:

4.1. Search result container to show results with cards.

4.2. Pagination and dropdown to choose items per page.

4.3. Pressing on a card, will go to the card details.

4.4. Cards should have a feedback behaviour when pressed.

5.  **Footer**

Footer with data about:

5.1. Total characters.

5.2. Total locations.

5.3. Total episodes.

5.4. Social buttons.

  

So, with that in mind, a plan is needed, but, let's try it as simple as possible due to there is only one person behind the whole process, and time gap is short to finish the project.

  

There are several stages required to completed this project:

  

1. Solve basic functionality.

This part includes connection to the API, and solve problems such as (without priority):

1.1. Search items categorized by Characters, Locations, and Episodes, using a keyword to search. **(Search results)**

1.2. Pagination. **(Search results)**

1.3. Query to extract all episodes. **(Header)**

1.4. Query to extract all locations. **(Header)**

1.5. Totals quantities for characters, locations, and episodes. **(Footer)**

2. Once functionality is done, is the time to create the layout as a wireframe.

3. Then, is time to integrate layout and functionality.

4. And finally, is time to add styles to the project.

  

Seems easy, but is not. There are a ton of details that weren't take into account, such as libraries, tools, and project setup, which are completely necessary to make our life easier.

  

Tools like linters, and alias resolver could help a lot. Also to define codification styles, folder structure, git flow, etc, but this time some of them could be avoided.

  

**Changelog**

  

- v0.0.1. Initial setup was made (including ESLint, Prettier, and, of course, Git). Also basic connection was made and first pagination is working as expected. However, I realized the API doesn't support page size, or at least I haven't seen that so far. That means we need to continue with other features meanwhile a solution is found if possible.

![First pagination](https://i.ibb.co/wcLL5yT/firstloadandpagination.gif)

- v0.0.2. Grid layout was added, and footer data is on the screen now.

  

![First layout](https://i.ibb.co/Y8kN9bP/footer-data.png)

- v0.1.0. First layout version was added. At this point this project started to looks like the final version, but there is still a lot of details to add.

  

![Testing pagination](https://i.ibb.co/LP4G0V8/basiclayout.png)

  

- v0.1.1. Search is now working by categories as expected. Pagination works pretty fine, and we are about to finish functionalities to start working on UI styles.

  

![Search by categories](https://i.ibb.co/x7H4fZW/search-by-categories.gif)

  

- v0.1.2. Top searches are available now. Now is time for add some styles.

  

![enter image description here](https://i.ibb.co/WHy8JR1/top-searches.gif)

 - v0.1.3. Character card style is done.

![Character card](https://i.ibb.co/0DmQwC5/character-card.png)

 - v0.1.4. Modal details is added, but at this moment is just a template. Next version should use real data.
![Modal details template](https://i.ibb.co/TgDKY4p/modal-template.gif)

 - v0.1.5. Modal details is working with real data

![Modal details with real data](https://i.ibb.co/dMP3Xpf/open-card-details.gif)

 - v0.1.6. Episodes, and Locations details are now available

![Categories details](https://i.ibb.co/Fqr3S7G/categories-details.gif)

 - v0.1.7. Due to Episodes, and Locations hasn't image to show, I decided to add a default image instead, just to not to be boring

![Default images](https://i.ibb.co/dBms0tw/default-episodes-locations-img.gif)

 - v0.1.8. Create isolated components for every section in home screen, that way we improve component composition.
 
 - v0.1.9. Finally, this could be one of the last versions. Now it's necessary to improve our code. Firstly, by reviewing manually the code, and solving most obvious anti-patterns. The, it could be useful to scan the code with SonarQube.

![First final prototype](https://i.postimg.cc/kM6xDGkF/final.png)

 - v0.1.10. Meanwhile some magic numbers are solved, it's been obvious there is no time to finish some features, suchs as unit testing, handle language, and add CI/CD process.

 - v0.1.11. After checked the code, solve some issues, and use SonarQube to find flawless code and get 0 issues, this is the final version. Maybe is not perfect, and definitely I need more time to write more features (mentioned in the previous vervios), and solve the issue with pagination, but we're running out of time, so, is what it is.

![Final version](https://i.ibb.co/f47TJKt/final.gif)


 - v0.1.12. Module resolver is added. No changes on app.

 - v0.1.13. Add import order, solve init load, toast component.

 - v0.1.14. Add useConnection hook to handle server connections.

 - v0.1.15. Remove unused dependencies.

 - v0.2.0. Axios removed (hence useConnection removed), and replaced with React Query. Loaders added for search results, and getting first episode name.
