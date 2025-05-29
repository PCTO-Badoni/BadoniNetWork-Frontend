# BadoniNetWork Access GUI

## Project Overview
BadoniNetWork Access GUI is a modern React-based web application designed for managing network access and facilitating student-company interactions. The platform serves as a bridge between educational institutions and businesses, offering a comprehensive suite of tools for managing student profiles, company announcements, and professional communications.

Built with Vite.js, the application provides a fast and efficient development environment while ensuring optimal production performance.

## Key Technologies

### Core Framework and Libraries
- **React 18.x** - Modern UI development with hooks and functional components
- **Vite.js** - Next generation frontend tooling
- **React Router v6** - Dynamic routing and navigation management

### UI Components and Styling
- **PrimeReact** - Comprehensive UI component library
- **PrimeFlex** - Flexible CSS utility library
- **Material-UI (@mui/material)** - Additional React UI components
- **FontAwesome** - Extensive icon library
- **Styled-components** - Component-level styling with CSS-in-JS

### Data Management and Communication
- **Axios** - Promise-based HTTP client
- **React Context API** - State management

### Specialized Features
- **react-pdf** - PDF document handling and viewing
- **react-dropzone** - Drag-and-drop file upload functionality
- **react-toastify** - Toast notifications system
- **react-password-checklist** - Password validation and strength checking
- **react-circular-progressbar** - Visual progress indicators
- **react-multi-carousel** - Responsive carousel/slider component

## Features

### Authentication System
- Secure login and registration
- Multi-step registration process
- OTP (One-Time Password) verification
- Password recovery system
- Email verification flow

### Core Functionality
- **Student Management**
  - Comprehensive student listings
  - Detailed student profiles
  - CV management and viewing
  
- **Company Features**
  - Announcement creation and management
  - Student search and filtering
  - Company profile management

- **Communication**
  - Integrated chat system
  - Real-time notifications
  - Message management

### Additional Features
- Responsive design supporting multiple device sizes
- Dynamic theme support with light/dark mode
- Real-time notification system
- File upload and management
- Advanced search and filtering capabilities

## Project Structure

```
src/
├── auth/                   # Authentication related components
│   ├── login/             # Login functionality
│   ├── register/          # Registration process
│   └── security/          # Security features (password reset, etc.)
├── main/                  # Core application components
│   ├── Components/        # Reusable UI components
│   ├── Pages/            # Main application pages
│   └── viste/            # View components
├── OTP/                   # One-Time Password verification
├── constants/             # Application constants and themes
└── styles.css             # Global styles and CSS
```

## Setup and Installation

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn package manager

### Installation Steps

1. Clone the repository:
```bash
git clone [repository-url]
cd BadoniNetWorkAccessGUI
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```env
VITE_DEFAULT_HOST_DOMAIN=your_api_domain
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3001`

### Building for Production

To create a production build:
```bash
npm run build
# or
yarn build
```

## Available Scripts

- `npm run dev` - Starts the development server on port 3001
- `npm run build` - Creates a production build
- `npm run preview` - Previews the production build locally

## License

[License Information]

## Contributors

[Contributor Information]

