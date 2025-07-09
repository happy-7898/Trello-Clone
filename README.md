# Trello Clone - React App

A Trello-like task management application built using **React**, **React Router**, **axios**, and **Material UI**/**Ant Design**, integrated with the **official Trello REST API**.

>  **Goal**: Replicate core Trello functionalities (Boards, Lists, Cards, Checklists, Checkitems) using Trello's API and client-side routing.

---


## Features & User Stories

###  Boards

-  View all boards: `/boards`
- Create a new board
- Navigate to a single board view: `/boards/:board_id`

###  Lists

- View all lists for a board
- Create a new list in a board
- Archive and UnArchive a list

###  Cards

-  View all cards in a list
-  Create a new card in a list
-  Delete a card

###  Checklists

-  View all checklists in a card
-  Create a checklist in a card
-  Delete a checklist

### Checkitems

-  View all checkitems
-  Create a checkitem in a checklist
-  Delete a checkitem
-  Check/Uncheck a checkitem

---

##  Tech Stack

| Tech         | Purpose                                    |
|--------------|--------------------------------------------|
| React        | UI library                                 |
| React Router | Client-side routing                        |
| Axios        | API requests to Trello REST API            |
| Material UI | UI components and styling      |
| Trello API   | External data source                       |

---

##  Resources

-  [Trello REST API Docs](https://developer.atlassian.com/cloud/trello/rest/)
- [Getting Started Guide](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/)

---

##  Setup & Installation

1. **Clone the repo**
   ```bash
   git clone git@gitlab.com:Harpreet7/trello-clone.git
   cd trello-clone
2. **Install dependencies**
    ```bash
    npm install
3. **Configure Trello API credentials**
    ```bash
    cp .env.example .env
4. **.env.example**
    ```
    VITE_TOKEN=your_auth_token
    VITE_API_KEY=your_api_key
5. **Start the development server**
    ```bash
    npm run dev
## Notes
- All navigation is handled via client-side routing using react-router-dom.

- All API interactions are managed through axios using Trello's REST endpoints.

- The project uses modern React practices: hooks, functional components, modular structure.

## License
This project is for educational and non-commercial use only. Built as part of a learning assignment.