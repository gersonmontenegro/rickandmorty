  

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
