# Promptly

this application allows users to interact with an AI model to generate responses, manage their chat history, and perform additional actions like saving, deleting, and searching through past chats.

Demo: https://promptly-mu.vercel.app/

## Features

  - User Authentication: Secure user authentication using Clerk.
  - View recent chats in a sidebar.
  - Save user chat history to MockAPI.
  - Search through saved chats.
  - Delete individual chats.
  - Responsive UI: Built with Next.js and styled using Tailwind CSS and ShadCN.
 
## Technologies Used

  - Frontend: Next.js, Tailwind CSS, ShadCN
  - AI Integration: Gemini AI model
  - State Management: Redux Toolkit
  - API Handling: Axios
  - Authentication: Clerk
  - Mock Backend: MockAPI

## Challenges Faced: 

  -  I faced difficulties in configuring the Gemini AI model with the frontend application due to unfamiliarity with its API and the specific configurations required, such as generation parameters (e.g., temperature, topP, and max tokens). Debugging API requests and ensuring the AI model returned responses in the expected format was challenging.
     
  - Solution: I referred to the official Gemini AI documentation, experimented with different configurations, and added logging to ensure accurate requests and responses.  

## Future Improvements

  - Implement advanced analytics for chat history.
  - Add support for more AI models.
  - Enhance UI/UX with additional themes.
  - Introduce multi-language support.
 
## Installation

  - Node.js (v16.0 or later)
  - npm or yarn

1. **Clone the Repository:**
   
   ```bash
   git clone <repository-url>
   cd <repository-directory>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Contributing

If you’d like to contribute to this project, please follow these steps:

  - Fork the repository.
  - Create a new branch (git checkout -b feature-branch).
  - Commit your changes (git commit -am 'Add new feature').
  - Push to the branch (git push origin feature-branch).
  - Create a new Pull Request.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contact
For any questions or support, please contact shravanrawas8@gmail.com.
